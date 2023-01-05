<template>
  <div
    class="p-select-options"
    role="listbox"
    @mouseleave="indexValue = 0"
  >
    <slot name="pre-options" />
    <template v-if="options.length">
      <PVirtualScroller :items="options" item-key="label" class="p-select-options__options">
        <template #default="{ item: option, index }">
          <div
            ref="optionElements"
            @mouseenter="indexValue = index"
            @click.stop="handleOptionClick(option)"
          >
            <PSelectOption
              :label="option.label"
              :multiple="multiple"
              :disabled="option.disabled"
              :selected="isSelected(option)"
              :highlighted="indexValue === index"
            >
              <slot
                name="option"
                :option="option"
                :selected="isSelected(option)"
                :highlighted="indexValue === index"
              />
            </PSelectOption>
          </div>
        </template>
      </PVirtualScroller>
    </template>
    <template v-else>
      <slot name="options-empty">
        <div class="p-select-options__options--empty">
          No options
        </div>
      </slot>
    </template>
    <slot name="post-options" />
    <template v-if="multiple && options.length">
      <div class="p-select-options__select-all">
        <p-button size="sm" inset @click="selectAllOptions">
          Select all
        </p-button>
        <p-button size="sm" inset @click="unselectAllOptions">
          Select none
        </p-button>
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
  import { computed, ref, toRefs, watch } from 'vue'
  import PSelectOption from '@/components/SelectOption/PSelectOption.vue'
  import PVirtualScroller from '@/components/VirtualScroller/PVirtualScroller.vue'
  import { SelectModelValue, SelectOption } from '@/types/selectOption'

  const props = defineProps<{
    modelValue: string | number | boolean | null | SelectModelValue[] | undefined,
    options: SelectOption[],
    highlightedIndex: number | undefined,
  }>()

  const emit = defineEmits<{
    (event: 'update:modelValue', value: string | number | boolean | null | SelectModelValue[]): void,
    (event: 'update:highlightedIndex', value: number | undefined): void,
  }>()

  const { options } = toRefs(props)

  const internalValue = computed({
    get() {
      return props.modelValue ?? null
    },
    set(value) {
      emit('update:modelValue', value)
    },
  })

  const multiple = computed(() => Array.isArray(internalValue.value))

  const optionElements = ref<HTMLLIElement[]>([])

  const indexValue = computed({
    get() {
      return props.highlightedIndex
    },
    set(value) {
      emit('update:highlightedIndex', value)
    },
  })

  function isSelected(option: SelectOption): boolean {
    if (Array.isArray(internalValue.value)) {
      return internalValue.value.includes(option.value)
    }

    return option.value === internalValue.value
  }

  function handleOptionClick(option: SelectOption): void {
    if (option.disabled) {
      return
    }

    if (Array.isArray(internalValue.value)) {
      const index = internalValue.value.indexOf(option.value)

      if (index > -1) {
        internalValue.value = [...internalValue.value.slice(0, index), ...internalValue.value.slice(index + 1)]
      } else {
        internalValue.value = [...internalValue.value, option.value]
      }
    } else {
      internalValue.value = option.value
    }
  }

  function selectAllOptions(): void {
    if (!Array.isArray(internalValue.value)) {
      return
    }

    internalValue.value = options.value
      .filter(({ disabled }) => !disabled)
      .map(({ value }) => value)
  }

  function unselectAllOptions(): void {
    if (!Array.isArray(internalValue.value)) {
      return
    }

    internalValue.value = []
  }

  function getOptionElement(index: number): HTMLLIElement | undefined {
    return optionElements.value[index]
  }

  function scrollToOption(index: number): void {
    const element = getOptionElement(index)

    element?.scrollIntoView({ block: 'nearest' })
  }

  watch(() => props.highlightedIndex, (value, previous) => {
    if (value === undefined) {
      return
    }

    if (options.value[value]?.disabled) {
      const difference = value - (previous ?? -1)
      const newIndex = value + difference

      if (newIndex >= 0 && newIndex < props.options.length) {
        indexValue.value = newIndex
      }
    } else {
      scrollToOption(value)
    }
  })
</script>

<style>
.p-select-options { @apply
  my-1
  bg-background
  shadow-lg
  overflow-hidden
  rounded-md
  ring-1
  ring-black
  ring-opacity-5
  focus:outline-none
}

.p-select-options__options { @apply
  max-h-64
  overflow-y-auto
}

.p-select-options__options--empty { @apply
  px-4
  py-2
  italic
  text-sm
}

@media (hover: hover) {
  .p-select-options__options { @apply
    block
  }
}

.p-select-options__select-all { @apply
  flex
  gap-1
  p-1
}
</style>