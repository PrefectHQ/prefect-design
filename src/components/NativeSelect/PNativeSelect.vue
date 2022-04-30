<template>
  <select v-model="internalValue" class="p-select-native">
    <template v-for="(option, index) in options" :key="index">
      <option :value="option.value" :selected="option.value === internalValue">
        {{ option.label }}
      </option>
    </template>
  </select>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import { SelectOption } from '@/types/selectOption'

  const props = defineProps<{
    modelValue: string | number | null | undefined,
    options: SelectOption[],
  }>()

  const emits = defineEmits<{
    (event: 'update:modelValue', value: string | number | null): void,
  }>()

  const internalValue = computed({
    get() {
      return props.modelValue ?? null
    },
    set(value: string | number | null) {
      emits('update:modelValue', value)
    },
  })
</script>

<style>
.p-select-native { @apply
  block
  w-full
  pl-3
  pr-10
  py-2
  border-gray-300
  focus:outline-none
  focus:ring-prefect-500
  focus:border-prefect-500
  rounded-md
  appearance-none
  bg-none
}
</style>