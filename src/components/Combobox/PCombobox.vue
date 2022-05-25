<template>
  <div class="p-combobox" @keydown="handleComboboxKeydown">
    <p-select
      v-model="internalValue"
      :options="selectOptions"
      :empty-message="emptyMessage"
      :filter-options="filterOptions"
      @update:model-value="resetTypedValue"
      @close="resetTypedValue"
      @open="focusOnTextInput"
    >
      <template #pre-options>
        <div class="p-combobox__search-option">
          <input
            ref="textInput"
            v-model="typedValue"
            type="search"
            placeholder="Search"
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
      <template #option="{ option }">
        {{ option.unknown ? `"${option.label}"` : option.label }}
      </template>
      <template #default="{ selectedOption, isOpen, open, close, unselectOption }">
        <slot
          :selected-option="selectedOption"
          :is-open="isOpen"
          :open="open"
          :close="close"
          :unselect-option="unselectOption"
        />
      </template>
      <template #options-empty>
        <slot name="options-empty">
          <template v-if="typedValue">
            <div class="p-combobox__options-empty">
              <span>No matches for "{{ typedValue }}"</span>
              <p-button secondary size="sm" @click.stop="typedValue = null">
                See All Options
              </p-button>
            </div>
          </template>
        </slot>
      </template>
      <template #post-options>
        <slot name="post-options" />
      </template>
    </p-select>
  </div>
</template>

<script lang="ts">
  import { defineComponent, computed, ref, nextTick } from 'vue'

  export default defineComponent({
    name: 'PCombobox',
    expose: [],
    inheritAttrs: false,
  })
</script>

<script lang="ts" setup>
  import PSelect from '@/components/Select'
  import { keys } from '@/types/keyEvent'
  import { isSelectOption, SelectModelValue, SelectOption } from '@/types/selectOption'

  type ComboboxSelectOption = SelectOption & { unknown?: boolean }

  const props = defineProps<{
    modelValue: string | number | null | SelectModelValue[] | undefined,
    options: (string | number | SelectOption)[],
    allowUnknownValue?: boolean,
    emptyMessage?: string,
  }>()

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
    const options: ComboboxSelectOption[] = props.options
      .map(option => {
        if (isSelectOption(option)) {
          return option
        }

        return { label: option.toLocaleString(), value: option }
      })

    if (internalValue.value && props.allowUnknownValue) {
      const unknownValues = valueAsArray.value
        .filter(value => !optionsIncludeValue(options, value))
        .map(value => ({ label:`${value}`, value, unknown: true }))

      options.push(...unknownValues)
    }

    if (typedValue.value && props.allowUnknownValue && !optionsIncludeValue(options, typedValue.value)) {
      options.push({ label:`${typedValue.value}`, value: typedValue.value, unknown: true })
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
  m-1
}

.p-combobox__text-input { @apply
  cursor-default
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
}
</style>