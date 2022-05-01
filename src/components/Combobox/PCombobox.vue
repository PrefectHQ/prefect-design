<template>
  <div class="p-combobox">
    <p-select v-model="internalValue" :options="filteredSelectOptions" @close="resetTypedValue">
      <template #default="{ isOpen, open, close }">
        <input
          v-model="typedValue"
          :placeholder="displayValue"
          type="text"
          class="p-combobox__text-input"
          :class="classes"
          role="combobox"
          tabindex="-1"
          aria-controls="options"
          aria-expanded="false"
          @click="open"
          @keydown="handleKeydown($event, { isOpen, open, close })"
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
  import { isSelectOption, SelectOption } from '@/types/selectOption'

  const props = defineProps<{
    modelValue: string | number | null | undefined,
    options: (string | number | SelectOption)[],
    allowUnknownValue?: boolean,
  }>()

  const emits = defineEmits<{
    (event: 'update:modelValue', value: string | number | null): void,
  }>()

  const internalValue = computed({
    get() {
      return props.modelValue ?? null
    },
    set(value: string | number | null) {
      emits('update:modelValue', value)
    },
  })

  const selectOptions = computed<SelectOption[]>(() => props.options
    .map(option => {
      if (isSelectOption(option)) {
        return option
      }

      return { label: option.toLocaleString(), value: option }
    }))

  const filteredSelectOptions = computed<SelectOption[]>(() => {
    const options = selectOptions.value.filter(option => option.label.startsWith(typedValue.value))

    if (typedValue.value && props.allowUnknownValue && lookupSelectOptionValueByLabel(typedValue.value) === undefined) {
      options.push({ label:`"${typedValue.value}"`, value: typedValue.value })
    }

    return options
  })

  const classes = computed(() => ({
    'p-combobox__text-input--unknown-value': !filteredSelectOptions.value.length,
  }))

  const displayValue = computed(() => {
    const matchingOptionValue = lookupSelectOptionLabelByValue(internalValue.value)

    if (matchingOptionValue) {
      return matchingOptionValue
    }

    return internalValue.value ? internalValue.value.toLocaleString() : ''
  })

  const typedValue = ref<string>('')

  function lookupSelectOptionValueByLabel(label: SelectOption['label']): SelectOption['value'] | undefined  {
    return selectOptions.value.find(option => option.label === label)?.value
  }

  function lookupSelectOptionLabelByValue(value: SelectOption['value']): SelectOption['label'] | undefined  {
    return selectOptions.value.find(option => option.value === value)?.label
  }

  function resetTypedValue(): void {
    typedValue.value = ''
  }

  function allowSpaceToBeEnteredInTextBox(event: KeyboardEvent): void {
    event.stopPropagation()
  }

  function handleKeydown(event: KeyboardEvent, context: { isOpen: boolean, open: () => void, close: () => void }): void {
    const keysToIgnore = ['Shift', 'CapsLock', 'Control', 'Meta']

    if (keysToIgnore.includes(event.key)) {
      return
    }

    if (event.code === 'Space') {
      if (!context.isOpen) {
        context.open()
      }
      allowSpaceToBeEnteredInTextBox(event)
    }
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
  ring-0
  w-full
  h-full
  pr-8
  rounded-md
}

.p-combobox__text-input::placeholder { @apply
  text-current
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