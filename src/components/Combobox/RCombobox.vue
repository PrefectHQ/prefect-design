<template>
  <ComboboxRoot v-model="modelValue" :multiple>
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

          <template v-for="(option, index) in options" :key="index">
            <ComboboxItem
              v-if="!isComboboxGroupedOption(option)"
              :value="isComboboxOptionObject(option) ? option.value : option"
              :disabled="isComboboxOptionObject(option) ? option.disabled : false"
              class="p-select-option !pl-[25px]"
            >
              <ComboboxItemIndicator
                class="absolute left-0 w-[25px] inline-flex items-center justify-center"
              >
                <p-icon icon="Check" />
              </ComboboxItemIndicator>

              <span>
                {{ isComboboxOptionObject(option) ? option.label : option }}
              </span>
            </ComboboxItem>

            <ComboboxGroup
              v-else
            >
              <ComboboxLabel>{{ option.label }}</ComboboxLabel>
              <template v-for="(groupOption, groupIndex) in option.options" :key="groupIndex">
                <ComboboxItem
                  :value="isComboboxOptionObject(groupOption) ? groupOption.value : groupOption"
                  :disabled="isComboboxOptionObject(groupOption) ? groupOption.disabled : false"
                  class="p-select-option !pl-[25px]"
                >
                  <ComboboxItemIndicator
                    class="absolute left-0 w-[25px] inline-flex items-center justify-center"
                  >
                    <p-icon icon="Check" />
                  </ComboboxItemIndicator>

                  <span>
                    {{ isComboboxOptionObject(groupOption) ? groupOption.label : groupOption }}
                  </span>
                </ComboboxItem>
              </template>

              <ComboboxSeparator class="h-[1px] bg-grass6 m-[5px]" />
            </ComboboxGroup>
          </template>
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
  import { computed } from 'vue'

  export type ComboboxOption<T> = T | { label: string, value: T, disabled?: boolean }
  export type ComboboxGroupedOption<T> = { label: string, options: ComboboxOption<T>[] }
  function isComboboxOptionObject<T>(option: ComboboxOption<T>): option is { label: string, value: T, disabled?: boolean } {
    return typeof option === 'object' && option != null && 'label' in option && 'value' in option
  }
  function isComboboxGroupedOption<T>(option: ComboboxOption<T> | ComboboxGroupedOption<T>): option is { label: string, options: ComboboxOption<T>[] } {
    return typeof option === 'object' && option != null && 'label' in option && 'options' in option && Array.isArray(option.options)
  }

  const modelValue = defineModel<T | T[]>()

  const multiple = computed(() => Array.isArray(modelValue.value))

  const search = defineModel<string>('search')

  const props = withDefaults(defineProps<{
    options: ComboboxOption<T>[] | ComboboxGroupedOption<T>[],
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