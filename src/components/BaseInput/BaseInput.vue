<template>
  <div class="base-input" :class="classes" :style="styles">
    <div v-if="prepend" class="base-input__prepend">
      {{ prepend }}
    </div>
    <slot name="prepend" />
    <slot name="control" :attrs="attrs" />
    <div v-if="append" class="base-input__append">
      {{ append }}
    </div>
    <slot name="append" />
  </div>
</template>

<script lang="ts">
  import { defineComponent, computed } from 'vue'

  export default defineComponent({
    name: 'BaseInput',
    expose: [],
    inheritAttrs: false,
  })
</script>

<script lang="ts" setup>
  import { useAttrsStylesAndClasses } from '@/compositions/attributes'
  import { State } from '@/types/state'

  const props = defineProps<{
    state?: State,
    prepend?: string,
    append?: string,
    disabled?: boolean,
  }>()

  const { classes:attrClasses, styles, attrs } = useAttrsStylesAndClasses()

  const classes = computed(() => ({
    ...attrClasses.value,
    'base-input--disabled': props.disabled,
    'base-input--failed': props.state?.valid === false && props.state.validated,
  }))
</script>

<style>
.base-input { @apply
  w-full
  border
  flex
  items-center
  focus-within:ring-1
  focus-within:border-prefect-600
  focus-within:ring-prefect-600
  border-gray-300
  shadow-sm
  rounded-md
}

.base-input--disabled,
:disabled .base-input { @apply
  cursor-not-allowed
  opacity-50
}

.base-input__prepend,
.base-input__append { @apply
  px-2
  flex
  flex-col
  whitespace-nowrap
  justify-center
  self-stretch
  text-sm
  border-gray-300
}

.base-input__prepend { @apply
  border-r
}

.base-input__append { @apply
  border-l
}

.base-input--failed { @apply
  border-red-600
  focus-within:border-red-600
  focus-within:ring-red-600
}
</style>