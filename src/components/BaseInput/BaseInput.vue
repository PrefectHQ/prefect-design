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
  import { defineComponent, computed, useAttrs } from 'vue'

  export default defineComponent({
    name: 'BaseInput',
    expose: [],
    inheritAttrs: false,
  })
</script>

<script lang="ts" setup>
  import { State } from '@/types/state'

  const props = defineProps<{
    state?: State,
    prepend?: string,
    append?: string,
  }>()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const attrClasses = computed(() => useAttrs().class as any)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const attrStyles = computed(() => useAttrs().style as any)

  const attrs = computed(() => {
    const { class:_class, style:_style, ...attrs } = useAttrs()

    return attrs
  })

  const styles = computed(() => ({
    ...attrStyles.value,
  }))

  const classes = computed(() => ({
    ...attrClasses.value,
    'base-input--valid': props.state?.valid,
    'base-input--invalid': props.state?.invalid,
    'base-input--changed': props.state?.changed,
    'base-input--touched': props.state?.touched,
    'base-input--untouched': props.state?.untouched,
    'base-input--pristine': props.state?.pristine,
    'base-input--dirty': props.state?.dirty,
    'base-input--pending': props.state?.pending,
    'base-input--required': props.state?.required,
    'base-input--validated': props.state?.validated,
    'base-input--passed': props.state?.passed,
    'base-input--failed': props.state?.failed,
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

.base-input--disabled { @apply
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