<template>
  <div
    ref="selectElement"
    class="p-select"
    :class="classes"
    @keydown="handleKeydown"
  >
    <p-native-select
      v-model="internalValue"
      size="1"
      class="p-select__native"
      :multiple="multiple"
      :options="selectOptions"
    />

    <div class="p-select__custom">
      <slot
        :selected-option="selectedOption"
        :display-value="displayValue"
        :is-open="open"
        :open="openSelect"
        :close="closeSelect"
      >
        <button
          type="button"
          class="p-select__custom-button"
          aria-hidden="true"
          tabindex="-1"
          @click="openSelect"
        >
          <span class="p-select__selected-value">
            {{ displayValue }}
          </span>
        </button>
      </slot>
    </div>

    <template v-if="open">
      <ul class="p-select__options" role="listbox" @mouseleave="highlightedIndex = -1">
        <template v-if="selectOptions.length">
          <template v-for="(option, index) in selectOptions" :key="index">
            <li
              ref="optionElements"
              @mouseenter="highlightedIndex = index"
              @click="handleOptionClick(option)"
            >
              <p-select-option
                :label="option.label"
                :multiple="multiple"
                :selected="isSelected(option)"
                :highlighted="highlightedIndex === index"
              >
                <slot
                  name="option"
                  :option="option"
                  :selected="isSelected(option)"
                  :highlighted="highlightedIndex === index"
                />
              </p-select-option>
            </li>
          </template>
        </template>
        <template v-else>
          <div class="p-select__options--empty">
            <slot name="options-empty">
              No options
            </slot>
          </div>
        </template>
      </ul>
    </template>
  </div>
</template>

<script lang="ts">
  import { defineComponent, computed, onUnmounted, ref } from 'vue'

  export default defineComponent({
    name: 'PSelect',
    expose: [],
    inheritAttrs: false,
  })
</script>

<script lang="ts" setup>
  import PNativeSelect from '@/components/NativeSelect'
  import PSelectOption from '@/components/SelectOption'
  import { isAlphaNumeric, keys } from '@/types/keyEvent'
  import { SelectOption, isSelectOption, SelectModelValue } from '@/types/selectOption'
  import { toPluralString } from '@/utilities/strings'

  const props = defineProps<{
    modelValue: string | number | null | SelectModelValue[] | undefined,
    options: (string | number | SelectOption)[],
    multiple?: boolean,
  }>()

  const emits = defineEmits<{
    (event: 'update:modelValue', value: SelectModelValue | SelectModelValue[]): void,
    (event: 'open' | 'close'): void,
  }>()

  const selectElement = ref<HTMLElement>()
  const optionElements = ref<HTMLElement[]>([])
  const highlightedIndex = ref<number>(-1)
  const open = ref(false)

  const internalValue = computed({
    get() {
      return props.modelValue ?? null
    },
    set(value: SelectModelValue | SelectModelValue[]) {
      emits('update:modelValue', value)
    },
  })

  const selectedOption = computed(() => {
    if (Array.isArray(internalValue.value)) {
      return selectOptions.value.filter(isSelected)
    }

    return selectOptions.value.find(x => x.value === internalValue.value)
  })

  const selectOptions = computed<SelectOption[]>(() => props.options.map(option => {
    if (isSelectOption(option)) {
      return option
    }

    return { label: option.toLocaleString(), value: option }
  }))

  const displayValue = computed(() => {
    if (Array.isArray(selectedOption.value)) {
      if (!selectedOption.value.length) {
        return null
      }

      return `${selectedOption.value.length} ${toPluralString('Item', selectedOption.value.length)}`
    }

    return selectedOption.value?.label ?? null
  })

  const classes = computed(() => ({
    'p-select--open': open.value,
  }))

  function isSelected(option: SelectOption): boolean {
    if (Array.isArray(internalValue.value)) {
      return internalValue.value.includes(option.value)
    }

    return option.value === internalValue.value
  }

  function openSelect(): void {
    if (!open.value) {
      open.value = true
      emits('open')
      setTimeout(() => addListeners())
    }
  }

  function closeSelect(): void {
    if (open.value) {
      open.value = false
      highlightedIndex.value = -1
      emits('close')
      removeListeners()
    }
  }

  function setValue(newValue: SelectModelValue): void {
    if (Array.isArray(internalValue.value)) {
      const index = internalValue.value.indexOf(newValue)

      if (index > -1) {
        internalValue.value = [...internalValue.value.slice(0, index), ...internalValue.value.slice(index + 1)]
      } else {
        internalValue.value = [...internalValue.value, newValue]
      }
    } else {
      internalValue.value = newValue
    }
  }

  function getHighlighted(): SelectOption | undefined {
    return selectOptions.value[highlightedIndex.value]
  }

  function trySettingValueToHighlighted(): boolean {
    const highlighted = getHighlighted()

    if (!highlighted) {
      return false
    }

    setValue(highlighted.value)

    return true
  }

  function tryMovingHighlightedIndex(change: number): boolean {
    const maxIndex = selectOptions.value.length
    const newIndex = highlightedIndex.value + change

    if (!maxIndex || !open.value) {
      return false
    }

    if (newIndex < 0) {
      highlightedIndex.value = 0
    } else if (newIndex >= maxIndex) {
      highlightedIndex.value = maxIndex -1
    } else {
      highlightedIndex.value = newIndex
    }

    const element = optionElements.value[highlightedIndex.value]
    element.scrollIntoView({ block: 'nearest' })

    return true
  }

  function handleKeydown(event: KeyboardEvent): void {
    if (isAlphaNumeric(event.key)) {
      openSelect()
      return
    }

    switch (event.key) {
      case keys.escape:
      case keys.tab:
        closeSelect()
        break
      case keys.upArrow:
        if (open.value) {
          tryMovingHighlightedIndex(-1)
        }
        event.preventDefault()
        break
      case keys.downArrow:
        if (open.value) {
          tryMovingHighlightedIndex(1)
        } else {
          openSelect()
        }
        event.preventDefault()
        break
      case keys.space:
        if (!open.value) {
          openSelect()
        }
        event.preventDefault()
        break
      case keys.enter:
        if (trySettingValueToHighlighted()) {
          closeSelect()
        }
        event.preventDefault()
        break
      default:
        break
    }
  }

  function handleOptionClick(option: SelectOption): void {
    setValue(option.value)

    if (!props.multiple) {
      closeSelect()
    }
  }

  function handleDocumentClick(event: MouseEvent): void {
    const focusIsWithinSelect = selectElement.value?.contains(event.target as Node)
    if (!focusIsWithinSelect && open.value) {
      closeSelect()
    }
  }

  function addListeners(): void {
    document.addEventListener('click', handleDocumentClick)
    window.addEventListener('resize', closeSelect)
  }

  function removeListeners(): void {
    document.removeEventListener('click', handleDocumentClick)
    window.removeEventListener('resize', closeSelect)
  }

  onUnmounted(() => {
    removeListeners()
  })
</script>

<style>
.p-select { @apply
  relative
  text-base
  rounded-md
  border
  border-gray-300
  focus-within:outline-none
  focus-within:ring-1
  focus-within:ring-prefect-500
  focus-within:border-prefect-500
}

.p-select--open { @apply
  outline-none
  ring-1
  ring-prefect-500
  border-prefect-500
}

.p-select__native { @apply
  rounded-md
  cursor-default
  border-none
  ring-0
}

.p-select__custom { @apply
  bg-white
  absolute
  hidden
  top-0
  left-0
  w-full
  h-full
  rounded-md
}

.p-select__custom-button { @apply
  w-full
  h-full
  shadow-sm
  pl-3
  pr-10
  py-2
  text-left
  cursor-default
  border-none
  ring-0
}

.p-select__selected-value { @apply
  block
  truncate
}

.p-select__options { @apply
  absolute
  hidden
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

.p-select__options--empty { @apply
  px-4
  py-2
  italic
  text-sm
}

@media (hover: hover) {
  .p-select__custom { @apply
    block
  }

  .p-select__options { @apply
    block
  }
}
</style>