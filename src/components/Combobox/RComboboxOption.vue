<template>
  <ComboboxItem
    :value="isComboboxOptionObject(option) ? option.value : option"
    :disabled="isComboboxOptionObject(option) ? option.disabled : false"
    class="p-select-option !pl-[25px]"
  >
    <ComboboxItemIndicator
      class="absolute left-0 w-[25px] inline-flex items-center justify-center"
    >
      <p-icon icon="Check" />
    </ComboboxItemIndicator>

    <slot name="default" :option>
      <span>
        {{ isComboboxOptionObject(option) ? option.label : option }}
      </span>
    </slot>
  </ComboboxItem>
</template>

<script setup lang="ts" generic="T extends AcceptableValue">
  import { ComboboxItem, ComboboxItemIndicator } from 'radix-vue'
  import { AcceptableValue } from 'radix-vue/dist/shared/types'
  import { ComboboxOption, isComboboxOptionObject } from '@/components/Combobox/types'

  defineProps<{
    option: ComboboxOption<T>,
  }>()

  defineSlots<{
    default: (props: { option: ComboboxOption<T> }) => unknown,
  }>()
</script>