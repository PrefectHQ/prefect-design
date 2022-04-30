<template>
  <div class="p-select" @keydown="handleKeydown">
    <slot>
      <span class="p-select__icon">
        <SelectorIcon />
      </span>

      <select v-model="internalValue" class="p-select__native" @focus="isOpen = false">
        <template v-for="(option, index) in selectOptions" :key="index">
          <option :value="option.value" :selected="option.value === internalValue">
            {{ option.label }}
          </option>
        </template>
      </select>

      <button
        class="p-select__custom"
        type="button"
        aria-hidden="true"
        tabindex="-1"
        @click="openSelect"
      >
        <span class="p-select__selected-value">{{ displayValue }}</span>
      </button>
    </slot>

    <template v-if="isOpen && selectOptions.length">
      <ul class="p-select__options" role="listbox" @mouseleave="highlightedIndex = -1">
        <template v-for="(option, index) in selectOptions" :key="index">
          <span ref="optionElements">
            <p-select-option
              :label="option.label"
              :selected="option.value === internalValue"
              :highlighted="highlightedIndex === index"
              @mouseenter="highlightedIndex = index"
              @click.prevent="setValue(option.value)"
            />
          </span>
        </template>
      </ul>
    </template>
  </div>
</template>

<script lang="ts">
  import { defineComponent, computed, onUnmounted, ref, withDefaults, watch } from 'vue'

  export default defineComponent({
    name: 'PSelect',
    expose: [],
    inheritAttrs: false,
  })
</script>

<script lang="ts" setup>
  // eslint-disable-next-line import/order
  import SelectorIcon from '@heroicons/vue/solid/SelectorIcon'
  import PSelectOption from '@/components/SelectOption'
  import { SelectOption, isSelectOption } from '@/types/selectOption'

  const props = withDefaults(defineProps<{
    modelValue: string | number | null | undefined,
    options: (string | number | SelectOption)[],
    open?: boolean | undefined,
  }>(), {
    open: undefined,
  })

  const emits = defineEmits<{
    (event: 'update:modelValue', value: string | number | null): void,
    (event: 'update:open', value: boolean): void,
  }>()

  const optionElements = ref<HTMLElement[]>([])
  const highlightedIndex = ref<number>(-1)
  const open = ref(false)
  const isOpen = computed({
    get() {
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      return props.open ?? open.value
    },
    set(value: boolean) {
      open.value = value
      emits('update:open', value)
    },
  })

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

  watch(isOpen, (newValue) => {
    if (newValue) {
      setTimeout(() => addListeners())
    } else {
      removeListeners()
    }
  })

  function openSelect(): void {
    if (!isOpen.value) {
      isOpen.value = true
    }
  }

  function closeSelect(): void {
    if (isOpen.value) {
      isOpen.value = false
    }
  }

  function setValue(newValue: SelectOption['value']): void {
    internalValue.value = newValue
    closeSelect()
  }

  function trySetHighlightedValue(): void {
    if (highlightedIndex.value > -1) {
      const highlightedOption = selectOptions.value[highlightedIndex.value]
      internalValue.value = highlightedOption.value
    }
  }

  function tryMovingHighlightedIndex(change: number): void {
    const newIndex = highlightedIndex.value + change

    if (newIndex < 0 || newIndex >= selectOptions.value.length) {
      return
    }

    highlightedIndex.value = newIndex
    const element = optionElements.value[newIndex]
    element.scrollIntoView({ block: 'nearest' })
  }

  function handleKeydown(event: KeyboardEvent): void {
    const keysToIgnore = ['Shift', 'Tab', 'CapsLock', 'Control', 'Meta']

    if (keysToIgnore.includes(event.key)) {
      return
    }

    switch (event.code) {
      case 'Escape':
      case 'Tab':
        closeSelect()
        break
      case 'ArrowUp':
        if (isOpen.value) {
          tryMovingHighlightedIndex(-1)
          event.preventDefault()
        }
        break
      case 'ArrowDown':
        if (isOpen.value) {
          tryMovingHighlightedIndex(1)
          event.preventDefault()
        }
        break
      case 'Space':
      case 'Enter':
        trySetHighlightedValue()
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
}

.p-select__native { @apply
  block
  w-full
  pl-3
  pr-10
  py-2
  border-gray-300
  focus:outline-none
  focus:ring-prefect-500
  focus:border-prefect-500
  rounded-md
  appearance-none
  bg-none
}

.p-select__custom { @apply
  bg-white
  absolute
  hidden
  top-0
  left-0
  w-full
  h-full
  border
  border-gray-300
  rounded-md
  shadow-sm
  pl-3
  pr-10
  py-2
  text-left
  cursor-default
  focus:outline-none
  focus:ring-1
  focus:ring-prefect-500
  focus:border-prefect-500
}

.p-select__selected-value { @apply
  block
  truncate
}

.p-select__icon { @apply
  absolute
  inset-y-0
  right-0
  pr-2
  z-[2]
  flex
  items-center
  pointer-events-none
}

.p-select__icon svg { @apply
  w-4
  h-4
}

.p-select__options { @apply
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

@media (hover: hover) {
  .p-select__custom { @apply
    block
  }
}
</style>