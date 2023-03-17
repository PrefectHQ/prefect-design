<template>
  <PSelect
    v-model="modelValue"
    :options="filteredSelectOptions"
    :empty-message="emptyMessage"
    @update:model-value="resetTypedValue"
    @close="resetTypedValue"
    @open="focusOnTextInput"
    @keydown="handleComboboxKeydown"
  >
    <template #default="{ value, option }">
      <slot :value="value" :label="displayValue(value)" :option="option">
        {{ displayValue(value) }}
      </slot>
    </template>
    <template #pre-options>
      <div class="p-combobox__search-option">
        <input
          ref="textInput"
          v-model="searchValue"
          type="search"
          :placeholder="placeholder"
          class="p-combobox__text-input"
          :class="classes.input"
          role="combobox"
          tabindex="-1"
          aria-controls="options"
          aria-expanded="false"
          @keydown="handleTextInputKeydown"
          @focus="handleFocus"
        >
      </div>
    </template>
    <template #option="{ option, ...scope }">
      <slot name="option" :option="option" v-bind="scope">
        {{ optionLabel(option) }}
      </slot>
    </template>

    <template #options-empty="scope">
      <div class="p-combobox__options-empty">
        <slot name="combobox-options-empty" v-bind="scope">
          <template v-if="searchValue">
            <span>No matches for "{{ searchValue }}"</span>
            <PButton secondary size="sm" @click.stop="clearSearch">
              See All Options
            </PButton>
          </template>
        </slot>
      </div>
    </template>

    <template v-for="(index, name) in $slots" #[name]="data">
      <slot :name="name" v-bind="data" />
    </template>
  </PSelect>
</template>

<script lang="ts" setup>
  import { computed, ref, nextTick, withDefaults } from 'vue'
  import PButton from '@/components/Button/PButton.vue'
  import PSelect from '@/components/Select/PSelect.vue'
  import { keys } from '@/types/keyEvent'
  import { flattenSelectOptions, SelectModelValue, SelectOptionGroup, normalizeSelectOption, SelectOptionNormalized, SelectOptionGroupNormalized, filterOptionsOrOptionGroups, SelectOption } from '@/types/selectOption'

  const props = withDefaults(defineProps<{
    modelValue: string | number | boolean | null | SelectModelValue[] | undefined,
    options: (SelectOption | SelectOptionGroup)[],
    allowUnknownValue?: boolean,
    emptyMessage?: string,
    placeholder?: string,
    searchValue?: string,
  }>(), {
    emptyMessage: undefined,
    placeholder: 'Search',
    searchValue: undefined,
  })

  const emit = defineEmits<{
    (event: 'update:modelValue', value: SelectModelValue | SelectModelValue[]): void,
    (event: 'update:searchValue', value: string | null): void,
  }>()

  const modelValue = computed({
    get() {
      return props.modelValue ?? null
    },
    set(value) {
      emit('update:modelValue', value)
    },
  })

  const valueAsArray = computed(() => {
    if (!modelValue.value) {
      return []
    }

    if (Array.isArray(modelValue.value)) {
      return modelValue.value.map(option => option ? option.toString() : '')
    }

    return [modelValue.value.toString()]
  })

  const selectOptions = computed(() => {
    return props.options.map(normalizeSelectOption)
  })

  const flatSelectOptions = computed(() => flattenSelectOptions(selectOptions.value))

  const unknownValues = computed(() => {
    return valueAsArray.value
      .filter(value => !optionsIncludeValue(selectOptions.value, value))
  })

  const selectOptionsWithUnknown = computed(() => {
    const options = [...selectOptions.value]

    if (modelValue.value && props.allowUnknownValue) {
      const unknownSelectOptions = unknownValues.value
        .map(value => ({ label: `${value}`, value }))

      options.push(...unknownSelectOptions)
    }

    if (searchValue.value && props.allowUnknownValue && !optionsIncludeValue(options, searchValue.value)) {
      options.push({ label: `${searchValue.value}`, value: searchValue.value })
    }

    return options
  })

  const filteredSelectOptions = computed(() => {
    if (!searchValue.value) {
      return selectOptionsWithUnknown.value
    }

    return filterOptionsOrOptionGroups(selectOptionsWithUnknown.value, searchValue.value)
  })

  const classes = computed(() => ({
    input: {
      'p-combobox__text-input--unknown-value': !filteredSelectOptions.value.length,
    },
  }))

  const backupSearchValue = ref<string | null>(null)
  const searchValue = computed({
    get() {
      return props.searchValue ?? backupSearchValue.value
    },
    set(value) {
      backupSearchValue.value = value
      emit('update:searchValue', value)
    },
  })

  const textInput = ref<HTMLInputElement>()

  function displayValue(value: SelectModelValue): string {
    const option = getSelectOption(value)

    if (option) {
      return option.label
    }

    if (value === null) {
      return ''
    }

    if (unknownValues.value.includes(value.toString())) {
      return `"${value}"`
    }

    return value.toString()
  }

  function getSelectOption(value: SelectModelValue): SelectOptionNormalized | undefined {
    return flatSelectOptions.value.find(x => x.value === value)
  }

  function optionLabel(option: SelectOptionNormalized): string {
    return option.value && unknownValues.value.includes(option.value.toString()) ? `"${option.label}"` : option.label
  }

  function optionsIncludeValue(options: (SelectOptionNormalized | SelectOptionGroupNormalized)[], value: string | null): boolean {
    if (!value) {
      return true
    }

    const flat = flattenSelectOptions(options)

    return !!flat.find(option => option.value === value)
  }

  function resetTypedValue(): void {
    searchValue.value = null
  }

  function handleComboboxKeydown(event: KeyboardEvent): void {
    const keysToIgnore: string[] = [keys.shift, keys.capsLock, keys.ctrl, keys.windowKey, keys.tab]

    if (!keysToIgnore.includes(event.key)) {
      focusOnTextInput()
    }
  }

  function focusOnTextInput(): void {
    nextTick(() => textInput.value?.focus())
  }

  function handleTextInputKeydown(event: KeyboardEvent): void {
    if (event.key === keys.space) {
      allowSpaceToBeEnteredInTextBox(event)
    }
  }

  function allowSpaceToBeEnteredInTextBox(event: KeyboardEvent): void {
    event.stopPropagation()
  }

  function handleFocus(): void {
    textInput.value?.select()
  }

  function clearSearch(): void {
    searchValue.value = null
  }
</script>

<style>
.p-combobox__search-option { @apply
  p-1
}

.p-combobox__text-input { @apply
  h-full
  w-full
  rounded-md
  focus:ring-0
  bg-background
  border-background-400
  dark:border-foreground-200
  focus:border-background-300
  dark:focus:border-foreground-400
}

.p-combobox__text-input--unknown-value { @apply
  text-foreground-400
}

.p-combobox__options-empty { @apply
  flex
  justify-between
  items-center
  text-foreground-400
  text-sm
  italic
  p-2
}
</style>