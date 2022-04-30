<template>
  <div class="p-select" @keydown="handleKeydown">
    <span class="p-select__icon">
      <SelectorIcon />
    </span>

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
  import { defineComponent, computed, onUnmounted, ref } from 'vue'

  export default defineComponent({
    name: 'PSelect',
    expose: [],
    inheritAttrs: false,
  })
</script>

<script lang="ts" setup>
  // eslint-disable-next-line import/order
  import SelectorIcon from '@heroicons/vue/solid/SelectorIcon'
  import PNativeSelect from '@/components/NativeSelect/PNativeSelect.vue'
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
      emits('close')
      removeListeners()
    }
  }

  function setValue(newValue: SelectOption['value']): void {
    internalValue.value = newValue
  }

  function setValueAndClose(newValue: SelectOption['value']): void {
    setValue(newValue)
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
        if (open.value) {
          tryMovingHighlightedIndex(-1)
          event.preventDefault()
        }
        break
      case 'ArrowDown':
        if (open.value) {
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