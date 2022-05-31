<template>
  <div ref="el" class="base-input" :class="classes" :style="styles" v-bind="listeners">
    <div v-if="prepend" class="base-input__prepend">
      {{ prepend }}
    </div>
    <slot name="prepend" />
    <slot name="control" :attrs="attrs" />
    <div v-if="append" class="base-input__append">
      {{ append }}
    </div>
    <slot name="append" />
    <div v-if="failed" class="base-input__failed-icon">
      <PIcon icon="ExclamationCircleIcon" />
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, computed, ref } from 'vue'

  export default defineComponent({
    name: 'BaseInput',
    expose: [],
    inheritAttrs: false,
  })
</script>

<script lang="ts" setup>
  import PIcon from '@/components/Icon/PIcon.vue'
  import { useAttrsStylesClassesAndListeners } from '@/compositions/attributes'
  import { State } from '@/types/state'
  import { convertToClassValueObject } from '@/utilities/attributes'

  const props = defineProps<{
    state?: State,
    prepend?: string,
    append?: string,
    disabled?: boolean,
  }>()

  const { classes:attrClasses, listeners, styles, attrs } = useAttrsStylesClassesAndListeners()
  const failed = computed(() => props.state?.valid === false && props.state.validated)
  const el = ref<HTMLDivElement>()

  defineExpose({ el })

  const classes = computed(() => ({
    ...convertToClassValueObject(attrClasses.value),
    'base-input--disabled': props.disabled,
    'base-input--failed': failed.value,
  }))
</script>

<style>
.base-input { @apply
  w-full
  border
  flex
  items-center
  focus-within:ring-1
  bg-white
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

.base-input__failed-icon { @apply
  text-red-600
  w-5
  h-5
  mr-2
}
</style>