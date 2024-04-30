<template>
  <ComboboxRoot v-model="modelValue" v-model:search-term="search" :multiple>
    <ComboboxAnchor>
      <template v-if="!multiple">
        <ComboboxInput as-child>
          <p-text-input v-model="modelValue" v-model:search-term="search" :placeholder>
            <template #append>
              <ComboboxTrigger>
                <span class="flex items-center px-2 border-l">
                  <PIcon icon="ChevronUpDownIcon" />
                </span>
              </ComboboxTrigger>
            </template>
          </p-text-input>
        </ComboboxInput>
      </template>

      <template v-else>
        <RComboboxTagsInput v-model="modelValue" :placeholder />
      </template>
      <!-- <ComboboxCancel /> -->
    </ComboboxAnchor>

    <ComboboxPortal>
      <ComboboxContent
        position="popper"
        :side-offset="8"
        class="w-[var(--radix-combobox-trigger-width)] max-h-[var(--radix-combobox-content-available-height)]"
      >
        <ComboboxViewport class="p-select-options">
          <ComboboxEmpty>
            <template v-if="allowUnknownValue && search">
              <RComboboxOption :option="addUnknownValueOption" />
            </template>
          </ComboboxEmpty>

          <template v-for="(option, index) in options" :key="index">
            <RComboboxOption v-if="!isComboboxGroupedOption(option)" :option="option" />
            <ComboboxGroup
              v-else
            >
              <ComboboxSeparator class="h-[1px] bg-[var(--p-color-divider)] m-[5px]" />
              <ComboboxLabel class="text-subdued text-sm p-2">
                {{ option.label }}
              </ComboboxLabel>
              <template v-for="(groupOption, groupIndex) in option.options" :key="groupIndex">
                <RComboboxOption :option="groupOption" />
              </template>
            </ComboboxGroup>
          </template>

          <template v-if="allowUnknownValue && search && !options.find(option => isComboboxOptionObject(option) ? option.value : option === search)">
            <RComboboxOption :option="addUnknownValueOption" />
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
    ComboboxContent,
    ComboboxEmpty,
    ComboboxGroup,
    ComboboxInput,
    ComboboxLabel,
    ComboboxPortal,
    ComboboxRoot,
    ComboboxSeparator,
    ComboboxTrigger,
    ComboboxViewport
  } from 'radix-vue'
  import { type AcceptableValue } from 'radix-vue/dist/shared/types'
  import { computed } from 'vue'
  import RComboboxOption from '@/components/Combobox/RComboboxOption.vue'
  import RComboboxTagsInput from '@/components/Combobox/RComboboxTagsInput.vue'
  import { ComboboxOption, ComboboxGroupedOption, isComboboxGroupedOption, isComboboxOptionObject } from '@/components/Combobox/types'


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

  const addUnknownValueOption = computed(() => ({
    label: `Add "${search.value}"`,
    value: search.value,
  }))
</script>