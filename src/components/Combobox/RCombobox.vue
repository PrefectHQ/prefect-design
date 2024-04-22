<template>
  <ComboboxRoot v-model="modelValue">
    <ComboboxAnchor>
      <ComboboxInput as-child>
        <p-text-input v-model="modelValue">
          <template #append>
            <ComboboxTrigger>
              <span class="flex items-center px-2 border-l">
                <PIcon icon="ChevronUpDownIcon" />
              </span>
            </ComboboxTrigger>
          </template>
        </p-text-input>
      </ComboboxInput>
      <!-- <ComboboxCancel /> -->
    </ComboboxAnchor>

    <ComboboxPortal>
      <ComboboxContent
        position="popper"
        :side-offset="8"
        class="w-[var(--radix-combobox-trigger-width)] max-h-[var(--radix-combobox-content-available-height)]"
      >
        <ComboboxViewport class="p-select-options">
          <ComboboxEmpty />

          <ComboboxItem
            v-for="(option, index) in options"
            :key="index"
            :value="isComboboxOptionObject(option) ? option.value : option"
            class="p-select-option"
          >
            <!--
              <ComboboxItemIndicator
              class="absolute left-0 w-[25px] inline-flex items-center justify-center"
              >
              <Icon icon="radix-icons:check" />
              ✅
              </ComboboxItemIndicator>
            -->
            <span>
              {{ isComboboxOptionObject(option) ? option.label : option }}
            </span>
          </ComboboxItem>
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

  export type ComboboxOption<T> = T | { label: string, value: T, disabled?: boolean }
  function isComboboxOptionObject<T>(option: ComboboxOption<T>): option is { label: string, value: T, disabled?: boolean } {
    return typeof option === 'object' && option != null && 'label' in option && 'value' in option
  }

  const modelValue = defineModel<T | T[]>()

  const search = defineModel<string>('search')

  const props = withDefaults(defineProps<{
    options: ComboboxOption<T>[],
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