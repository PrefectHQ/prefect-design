<template>
  <div class="p-combobox" @keydown="handleComboboxKeydown">
    <p-select
      v-model="internalValue"
      :options="filteredSelectOptions"
      @close="resetTypedValue"
    >
      <template #default="{ isOpen, open, displayValue }">
        <input
          ref="textInput"
          :value="typedValue ?? displayValue ?? internalValue"
          type="text"
          class="p-combobox__text-input"
          :class="classes"
          role="combobox"
          tabindex="-1"
          aria-controls="options"
          aria-expanded="false"
          @click="open"
          @input="handleInput($event as InputEvent)"
          @keydown="handleTextInputKeydown($event, isOpen, open)"
        >
      </template>
    </p-select>
  </div>
</template>

<script lang="ts">
  import { defineComponent, computed, ref } from 'vue'

  export default defineComponent({
    name: 'PCombobox',
    expose: [],
    inheritAttrs: false,
  })
</script>

<script lang="ts" setup>
  import PSelect from '@/components/Select'
  import { isSelectOption, SelectModelValue, SelectOption } from '@/types/selectOption'

  const props = defineProps<{
    modelValue: string | number | null | SelectModelValue[] | undefined,
    options: (string | number | SelectOption)[],
    allowUnknownValue?: boolean,
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

  const multiple = computed(() => Array.isArray(props.modelValue))

  const selectOptions = computed<SelectOption[]>(() => props.options
    .map(option => {
      if (isSelectOption(option)) {
        return option
      }

      return { label: option.toLocaleString(), value: option }
    }))

  const filteredSelectOptions = computed<SelectOption[]>(() => {
    const options = selectOptions.value.filter(option => checkOptionLabelStartsWithValue(option.label, typedValue.value))

    if (typedValue.value && props.allowUnknownValue && !checkOptionExistsForLabel(typedValue.value)) {
      options.push({ label:`"${typedValue.value}"`, value: typedValue.value })
    }

    return options
  })

  const classes = computed(() => ({
    'p-combobox__text-input--unknown-value': !filteredSelectOptions.value.length,
  }))

  const typedValue = ref<string | null>(null)
  const textInput = ref<HTMLInputElement>()

  function checkOptionLabelStartsWithValue(label: string, value: string | null): boolean {
    if (!value) {
      return true
    }

    return label.toLowerCase().startsWith(value.toLowerCase())
  }

  function checkOptionExistsForLabel(label: string): boolean  {
    return selectOptions.value.find(option => option.label === label) !== undefined
  }

  function resetTypedValue(): void {
    typedValue.value = null
  }

  function allowSpaceToBeEnteredInTextBox(event: KeyboardEvent): void {
    event.stopPropagation()
  }

  function handleComboboxKeydown(event: KeyboardEvent): void {
    const keysToIgnore = ['Shift', 'CapsLock', 'Control', 'Meta', 'Tab']

    if (!keysToIgnore.includes(event.key)) {
      focusOnTextInput()
    }
  }

  function focusOnTextInput(): void {
    textInput.value?.focus()
  }

  function handleTextInputKeydown(event: KeyboardEvent, isOpen: boolean, open: () => void): void {
    if (event.code === 'Space') {
      if (!isOpen) {
        open()
      }
      allowSpaceToBeEnteredInTextBox(event)
    }
  }

  function handleInput(event: InputEvent): void {
    const target = event.target as HTMLInputElement

    typedValue.value = target.value
  }
</script>

<style>
.p-combobox { @apply
  relative
}

.p-combobox__selected-value { @apply
  block
  truncate
}

.p-combobox__icon { @apply
  w-4
  h-4
  mr-2
}

.p-combobox__text-input { @apply
  cursor-default
  border-none
  !ring-0
  h-full
  w-full
  p-0
  rounded-md
  focus:w-full
}

.p-combobox__text-input--unknown-value { @apply
  text-gray-400
}

.p-combobox__options { @apply
  absolute
  z-[3]
  mt-1
  left-0
  w-full
  bg-white
  shadow-lg
  max-h-60
  rounded-md
  py-1
  ring-1
  ring-black
  ring-opacity-5
  overflow-auto
  focus:outline-none
}
</style>