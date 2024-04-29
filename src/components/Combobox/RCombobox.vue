<template>
  <ComboboxRoot v-model="modelValue" :multiple>
    <ComboboxAnchor>
      <ComboboxInput as-child>
        <component :is="multiple ? RComboboxTagsInput : 'p-text-input'" v-model="modelValue" :placeholder>
          <template #append>
            <ComboboxTrigger>
              <span class="flex items-center px-2 border-l">
                <PIcon icon="ChevronUpDownIcon" />
              </span>
            </ComboboxTrigger>
          </template>
        </component>
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
  import RComboboxOption from '@/components/Combobox/RComboboxOption.vue'
  import RComboboxTagsInput from '@/components/Combobox/RComboboxTagsInput.vue'
  import { ComboboxOption, ComboboxGroupedOption, isComboboxGroupedOption } from '@/components/Combobox/types'


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