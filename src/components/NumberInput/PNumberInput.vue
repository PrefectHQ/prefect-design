<template>
  <BaseInput class="p-number-input">
    <slot v-for="(_, name) in $slots" :name="name" />
    <template #control="{ attrs }">
      <input v-model.number="value" type="number" class="p-number-input__control" v-bind="attrs" @keypress="preventNonNumericalInput">
    </template>
  </BaseInput>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import BaseInput from '@/components/BaseInput'

  const props = defineProps<{
    modelValue: number | null | undefined,
  }>()

  const emits = defineEmits<{
    (event: 'update:modelValue', value: number | null): void,
  }>()

  const value = computed({
    get() {
      return props.modelValue ?? ''
    },
    set(value: number | string) {
      if (typeof value === 'number') {
        emits('update:modelValue', value)
        return
      }

      const parsed = parseFloat(value)
      const nullOrValue = isNaN(parsed) ? null : parsed

      emits('update:modelValue', nullOrValue)
    },
  })

  function preventNonNumericalInput(event: KeyboardEvent): void {
    const acceptableKeys = /\d|\./
    if (!acceptableKeys.test(event.key)) {
      event.preventDefault()
    }
  }
</script>

<style>
.p-number-input__control {
  cursor: inherit;
}

.p-number-input__control { @apply
  block
  w-full
  rounded-md
}
</style>