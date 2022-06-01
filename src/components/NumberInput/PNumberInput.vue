<template>
  <BaseInput class="p-number-input">
    <template v-for="(index, name) in $slots" #[name]="scope">
      <slot :name="name" v-bind="scope" />
    </template>
    <template #control="{ attrs }">
      <input
        v-model="internalValue"
        type="number"
        class="p-number-input__control"
        v-bind="attrs"
        @keydown="preventNonNumericalInput"
        @paste="preventNonNumericalPaste"
      >
    </template>
  </BaseInput>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import BaseInput from '@/components/BaseInput'
  import { keys } from '@/types/keyEvent'

  const props = defineProps<{
    modelValue: number | null | undefined,
  }>()

  const emits = defineEmits<{
    (event: 'update:modelValue', value: number | null): void,
  }>()

  const internalValue = computed({
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
    if (event.key === keys.e || event.key === keys.E) {
      event.preventDefault()
    }
  }

  function preventNonNumericalPaste(event: ClipboardEvent): void {
    const invalidCharacters = /[^0-9.]/g
    const value = event.clipboardData?.getData('text')

    if (value && invalidCharacters.test(value)) {
      event.preventDefault()
    }
  }
</script>

<style>
.p-number-input__control {
  cursor: inherit;
}

.p-number-input__control { @apply
  bg-transparent
  block
  w-full
  rounded-md
  border-0
  focus:ring-0
}
</style>