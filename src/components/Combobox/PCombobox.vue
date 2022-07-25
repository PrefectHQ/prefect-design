<template>
  <PSelect
    v-model="internalValue"
    :options="selectOptionsWithUnknown"
    :empty-message="emptyMessage"
    :filter-options="filterOptions"
    @update:model-value="resetTypedValue"
    @close="resetTypedValue"
    @open="focusOnTextInput"
    @keydown="handleComboboxKeydown"
  >
    <template #pre-options>
      <div class="p-combobox__search-option">
        <input
          ref="textInput"
          v-model="typedValue"
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
        <slot name="options-empty" v-bind="scope">
          <template v-if="typedValue">
            <span>No matches for "{{ typedValue }}"</span>
            <p-button secondary size="sm" @click.stop="typedValue = null">
              See All Options
            </p-button>
          </template>
        </slot>
      </div>
    </template>

    <template #default="scope">
      <slot v-bind="scope" />
    </template>
    <template #post-options="scope">
      <slot name="post-options" v-bind="scope" />
    </template>
  </PSelect>
</template>

<script lang="ts" setup>
  import { computed, ref, nextTick, withDefaults } from 'vue'
  import PSelect from '@/components/Select/PSelect.vue'
  import { keys } from '@/types/keyEvent'
  import { isSelectOption, SelectModelValue, SelectOption } from '@/types/selectOption'

  const props = withDefaults(defineProps<{
    modelValue: string | number | null | SelectModelValue[] | undefined,
    options: (string | number | SelectOption)[],
    allowUnknownValue?: boolean,
    emptyMessage?: string,
    placeholder?: string,
  }>(), {
    emptyMessage: undefined,
    placeholder: 'Search',
  })

  const emits = defineEmits<{
    (event: 'update:modelValue', value: SelectModelValue | SelectModelValue[]): void,
  }>()

  const internalValue = computed({
    get() {
      return props.modelValue ?? null
    },
    set(value: SelectModelValue | SelectModelValue[]) {
      emits('update:modelValue', value)
    },
  })

  const valueAsArray = computed(() => {
    if (!internalValue.value) {
      return []
    }

    if (Array.isArray(internalValue.value)) {
      return internalValue.value.map(option => option? option.toString() : '')
    }

    return [internalValue.value.toString()]
  })

  const selectOptions = computed(() => {
    return props.options
      .map(option => {
        if (isSelectOption(option)) {
          return option
        }

        return { label: option.toLocaleString(), value: option }
      })
  })

  const unknownValues = computed(() => {
    return valueAsArray.value
      .filter(value => !optionsIncludeValue(selectOptions.value, value))
  })

  const selectOptionsWithUnknown = computed(() => {
    const options = [...selectOptions.value]
    if (internalValue.value && props.allowUnknownValue) {
      const unknownSelectOptions = unknownValues.value
        .map(value => ({ label:`${value}`, value }))

      options.push(...unknownSelectOptions)
    }

    if (typedValue.value && props.allowUnknownValue && !optionsIncludeValue(options, typedValue.value)) {
      options.push({ label:`${typedValue.value}`, value: typedValue.value })
    }

    return options
  })

  const filteredSelectOptions = computed(() => selectOptions.value.filter(option => optionStartsWith(option, typedValue.value)))
  function filterOptions(option: SelectOption): boolean {
    return filteredSelectOptions.value.includes(option)
  }

  const classes = computed(() => ({
    input: {
      'p-combobox__text-input--unknown-value': !filteredSelectOptions.value.length,
    },
  }))

  const typedValue = ref<string | null>(null)
  const textInput = ref<HTMLInputElement>()

  function optionLabel(option: SelectOption): string {
    return option.value && unknownValues.value.includes(option.value.toString()) ? `"${option.label}"` : option.label
  }

  function optionStartsWith(option: SelectOption, target: string | null): boolean {
    if (typeof target !== 'string') {
      return true
    }

    return option.label.toLowerCase().startsWith(target.toLowerCase())
  }

  function optionsIncludeValue(options: SelectOption[], value: string | null): boolean {
    if (!value) {
      return true
    }

    return !!options.find(option => option.value === value)
  }

  function resetTypedValue(): void {
    typedValue.value = null
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
</script>

<style>
.p-combobox__search-option { @apply
  p-1
}

.p-combobox__text-input { @apply
  h-full
  w-full
  rounded-md
  border-gray-300
  focus:border-gray-300
  focus:ring-0
}

.p-combobox__text-input--unknown-value { @apply
  text-gray-400
}

.p-combobox__options-empty { @apply
  flex
  justify-between
  items-center
  text-gray-700
  text-sm
  italic
  p-2
}
</style>