<template>
  <div class="p-select" @keydown="handleKeydown">
    <p-native-select
      v-model="internalValue"
      class="p-select__native"
      :options="selectOptions"
      @focus="open = false"
    />

    <div class="p-select__custom">
      <slot :display-value="displayValue" :is-open="open" :open="openSelect" :close="closeSelect">
        <button
          type="button"
          class="p-select__custom-button"
          aria-hidden="true"
          tabindex="-1"
          @click="openSelect"
        >
          <span class="p-select__selected-value">{{ displayValue }}</span>
        </button>
      </slot>
    </div>

    <template v-if="open && selectOptions.length">
      <ul class="p-select__options" role="listbox" @mouseleave="highlightedIndex = -1">
        <template v-for="(option, index) in selectOptions" :key="index">
          <span
            ref="optionElements"
            @mouseenter="highlightedIndex = index"
            @click.prevent="setValueAndClose(option.value)"
          >
            <slot
              name="option"
              :option="option"
              :selected="option.value === internalValue"
              :highlighted="highlightedIndex === index"
            >
              <p-select-option
                :label="option.label"
                :selected="option.value === internalValue"
                :highlighted="highlightedIndex === index"
              />
            </slot>
          </span>
        </template>
      </ul>
    </template>
  </div>
</template>

<script lang="ts">
  import { defineComponent, computed, onUnmounted, ref, nextTick } from 'vue'

  export default defineComponent({
    name: 'PSelect',
    expose: [],
    inheritAttrs: false,
  })
</script>

<script lang="ts" setup>
  import PNativeSelect from '@/components/NativeSelect'
  import PSelectOption from '@/components/SelectOption'
  import { SelectOption, isSelectOption } from '@/types/selectOption'

  const props = defineProps<{
    modelValue: string | number | null | undefined,
    options: (string | number | SelectOption)[],
  }>()

  const emits = defineEmits<{
    (event: 'update:modelValue', value: string | number | null): void,
    (event: 'open' | 'close'): void,
  }>()

  const optionElements = ref<HTMLElement[]>([])
  const highlightedIndex = ref<number>(-1)
  const open = ref(false)

  const internalValue = computed({
    get() {
      return props.modelValue ?? null
    },
    set(value: string | number | null) {
      emits('update:modelValue', value)
    },
  })

  const displayValue = computed(() => selectOptions.value.find(x => x.value === internalValue.value)?.label)

  const selectOptions = computed<SelectOption[]>(() => props.options.map(option => {
    if (isSelectOption(option)) {
      return  option
    }

    return { label: option.toLocaleString(), value: option }
  }))

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

  function setValue(newValue: SelectOption['value']): void {
    internalValue.value = newValue
  }

  function setValueAndClose(newValue: SelectOption['value']): void {
    setValue(newValue)
    nextTick(() => closeSelect())
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
    const keysToIgnore = ['Shift', 'CapsLock', 'Control', 'Meta']

    if (keysToIgnore.includes(event.key)) {
      return
    }

    switch (event.code) {
      case 'Escape':
      case 'Tab':
        closeSelect()
        break
      case 'ArrowUp':
        if (open.value) {
          tryMovingHighlightedIndex(-1)
        }
        event.preventDefault()
        break
      case 'ArrowDown':
        if (open.value) {
          tryMovingHighlightedIndex(1)
        } else {
          openSelect()
        }
        event.preventDefault()
        break
      case 'Space':
        if (!open.value) {
          openSelect()
        }
        event.preventDefault()
        break
      case 'Enter':
        if (trySettingValueToHighlighted()) {
          closeSelect()
        }
        event.preventDefault()
        break
      default:
        openSelect()
    }
  }

  function addListeners(): void {
    document.addEventListener('click', closeSelect)
    window.addEventListener('resize', closeSelect)
  }

  function removeListeners(): void {
    document.removeEventListener('click', closeSelect)
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

@media (hover: hover) {
  .p-select__custom { @apply
    block
  }

  .p-select__options { @apply
    block
  }
}
</style>