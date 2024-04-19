<template>
  <ComboboxRoot v-model="modelValue">
    <ComboboxAnchor>
      <ComboboxInput />
      <ComboboxTrigger />
      <ComboboxCancel />
    </ComboboxAnchor>

    <ComboboxPortal>
      <ComboboxContent>
        <ComboboxViewport>
          <ComboboxEmpty />

          <ComboboxItem :value="5">
            <ComboboxItemIndicator />
          </ComboboxItem>

          <ComboboxGroup>
            <ComboboxLabel />
            <ComboboxItem :value="6">
              <ComboboxItemIndicator />
            </ComboboxItem>
          </ComboboxGroup>
          <ComboboxSeparator />
        </ComboboxViewport>

        <ComboboxArrow />
      </ComboboxContent>
    </ComboboxPortal>
  </ComboboxRoot>
</template>

<script setup lang="ts" generic="T extends AcceptableValue">
  import {
    ComboboxAnchor,
    ComboboxArrow,
    ComboboxCancel,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxGroup,
    ComboboxInput,
    ComboboxItem,
    ComboboxItemIndicator,
    ComboboxLabel,
    ComboboxPortal,
    ComboboxRoot,
    ComboboxSeparator,
    ComboboxTrigger,
    ComboboxViewport
  } from 'radix-vue'
  import { type AcceptableValue } from 'radix-vue/dist/shared/types'

  const modelValue = defineModel<T | T[]>()

  const search = defineModel<string>('search')

  const props = withDefaults(defineProps<{
    options: T[],
    allowUnknownValue?: boolean,
    emptyMessage?: string,
    placeholder?: string,
    manual?: boolean,
  }>(), {
    emptyMessage: undefined,
    placeholder: 'Search',
    search: undefined,
  })

  const emit = defineEmits<{
    (event: 'bottom'): void,
  }>()
</script>