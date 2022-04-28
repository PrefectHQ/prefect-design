<template>
  <input v-model="value" type="checkbox" class="p-checkbox-input" :class="classes" :disabled="disabled">
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import { State } from '@/types/state'

  type Booleanish = boolean | 'true' | 'false'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  type ModelValue = Booleanish | any[] | undefined

  const props = defineProps<{
    modelValue: ModelValue,
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
.p-checkbox-input { @apply
  focus:ring-prefect-600
  h-4
  w-4
  text-prefect-600
  border-gray-300
  rounded
}

.p-checkbox-input--disabled { @apply
  cursor-not-allowed
  opacity-50
}

.p-checkbox-input--failed { @apply
  border-red-600
  focus:ring-red-600
}
</style>