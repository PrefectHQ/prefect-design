<template>
  <div class="p-checkbox-input" :class="classes">
    <label class="p-checkbox-input__label">
      <slot name="label">
        <div class="p-checkbox-input__label-text">
          {{ label }}
        </div>
      </slot>
      <input
        v-model="value"
        type="checkbox"
        class="p-checkbox-input__control"
        :disabled="disabled"
        v-bind="$attrs"
      >
    </label>
  </div>
</template>

<script lang="ts">
  import { defineComponent, computed } from 'vue'

  export default defineComponent({
    name: 'PCheckbox',
    expose: [],
    inheritAttrs: false,
  })
</script>

<script lang="ts" setup>
  import { State } from '@/types/state'

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  type ModelValue = boolean | any[]

  const props = defineProps<{
    modelValue?: ModelValue,
    label?: string,
    state?: State,
    disabled?: boolean,
  }>()

  const emits = defineEmits<{
    (event: 'update:modelValue', value: ModelValue): void,
  }>()

  const value = computed({
    get() {
      return props.modelValue ?? false
    },
    set(value: ModelValue) {
      emits('update:modelValue', value)
    },
  })

  const classes = computed(() => ({
    'p-checkbox-input--disabled': props.disabled,
    'p-checkbox-input--valid': !!props.state?.valid,
    'p-checkbox-input--invalid': !!props.state?.invalid,
    'p-checkbox-input--changed': !!props.state?.changed,
    'p-checkbox-input--touched': !!props.state?.touched,
    'p-checkbox-input--untouched': !!props.state?.untouched,
    'p-checkbox-input--pristine': !!props.state?.pristine,
    'p-checkbox-input--dirty': !!props.state?.dirty,
    'p-checkbox-input--pending': !!props.state?.pending,
    'p-checkbox-input--required': !!props.state?.required,
    'p-checkbox-input--validated': !!props.state?.validated,
    'p-checkbox-input--passed': !!props.state?.passed,
    'p-checkbox-input--failed': !!props.state?.failed,
  }))
</script>

<style>
.p-checkbox-input--disabled { @apply
  cursor-not-allowed
  opacity-50
}

.p-checkbox-input--failed { @apply
  border-red-600
  focus:ring-red-600
}

.p-checkbox-input__control { @apply
  focus:ring-prefect-600
  h-4
  w-4
  text-prefect-600
  border-gray-300
  rounded
}

.p-checkbox-input__label { @apply
  text-sm
  font-medium
  text-gray-700
  flex
  gap-x-2
  items-center
}

.p-checkbox-input__label .p-checkbox-input__label-text { @apply
  order-last
}
</style>