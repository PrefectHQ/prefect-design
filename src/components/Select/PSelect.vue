<template>
  <p-pop-over
    ref="popOver"
    :placement="[bottomLeft, topLeft]"
    class="p-select"
    :class="classes"
    auto-close
    @open="handleOpenChange"
    @keydown="handleKeydown"
  >
    <template #target>
      <p-native-select
        v-model="internalValue"
        size="1"
        class="p-select__native"
        :multiple="multiple"
        :options="filteredSelectOptions"
      />

      <div class="p-select__custom">
        <button
          type="button"
          class="p-select__custom-button"
          aria-hidden="true"
          tabindex="-1"
          @click="openSelect"
        >
          <slot
            :selected-option="selectedOption"
            :selected-options="selectedOptions"
            :is-open="popOver?.visible"
            :open="openSelect"
            :close="closeSelect"
          >
            <template v-if="multiple">
              <template v-if="selectedOptions.length">
                <PTagWrapper class="p-select__tag-wrapper" :tags="valueAsArray">
                  <template #tag="{ tag }">
                    <PTag dismissible @dismiss="dismissTag(tag)">
                      {{ tag }}
                    </PTag>
                  </template>

                  <template #overflow-tags="{ overflowedChildren }">
                    <span class="p-select__tag-wrapper--overflow">
                      +{{ overflowedChildren }}
                    </span>
                  </template>
                </PTagWrapper>
              </template>
              <template v-else>
                {{ emptyMessage }}
              </template>
            </template>
            <template v-else>
              <span class="p-select__selected-value">
                {{ selectedOption?.label ?? emptyMessage }}
              </span>
            </template>
          </slot>
        </button>
      </div>
    </template>

    <ul class="p-select__options" role="listbox" @mouseleave="highlightedIndex = -1" @keydown="handleKeydown">
      <slot name="pre-options" />
      <template v-if="selectOptions.length">
        <template v-for="(option, index) in filteredSelectOptions" :key="index">
          <li
            ref="optionElements"
            @mouseenter="highlightedIndex = index"
            @click.stop="handleOptionClick(option)"
          >
            <p-select-option
              :label="option.label"
              :multiple="multiple"
              :disabled="option.disabled"
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
      <slot name="post-options" />
    </ul>
  </p-pop-over>
</template>

<script lang="ts">
  import { defineComponent, computed, ref } from 'vue'

  export default defineComponent({
    name: 'PSelect',
    expose: [],
    inheritAttrs: false,
  })
</script>

<script lang="ts" setup>
  import PNativeSelect from '@/components/NativeSelect'
  import PPopOver from '@/components/PopOver/PPopOver.vue'
  import PSelectOption from '@/components/SelectOption'
  import PTagWrapper from '@/components/TagWrapper/PTagWrapper.vue'
  import { isAlphaNumeric, keys } from '@/types/keyEvent'
  import { SelectOption, isSelectOption, SelectModelValue } from '@/types/selectOption'
  import { topLeft, bottomLeft } from '@/utilities/position'

  const props = defineProps<{
    modelValue: string | number | null | SelectModelValue[] | undefined,
    options: (string | number | SelectOption)[],
    emptyMessage?: string,
    filterOptions?: (option: SelectOption) => boolean,
  }>()

  const emits = defineEmits<{
    (event: 'update:modelValue', value: SelectModelValue | SelectModelValue[]): void,
    (event: 'open' | 'close'): void,
  }>()


  const optionElements = ref<HTMLLIElement[]>([])
  const popOver = ref<typeof PPopOver>()
  const highlightedIndex = ref<number>(-1)

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

  const multiple = computed(() => Array.isArray(props.modelValue))

  const selectedOption = computed(() => {
    if (multiple.value) {
      return null
    }

    return selectOptions.value.find(x => x.value === internalValue.value)
  })

  const selectedOptions = computed(() => {
    if (multiple.value) {
      return selectOptions.value.filter(isSelected)
    }

    return []
  })

  const selectOptions = computed<SelectOption[]>(() => {
    return props.options.map(option => {
      if (isSelectOption(option)) {
        return option
      }

      return { label: option.toLocaleString(), value: option }
    })
  })

  const filteredSelectOptions = computed(() => {
    return selectOptions.value.filter(option => !props.filterOptions || props.filterOptions(option))
  })

  const classes = computed(() => ({
    'p-select--open': isOpen.value,
  }))

  const isOpen = computed(() => popOver.value?.visible ?? false)

  function isSelected(option: SelectOption): boolean {
    if (Array.isArray(internalValue.value)) {
      return internalValue.value.includes(option.value)
    }

    return option.value === internalValue.value
  }

  function openSelect(): void {
    if (!isOpen.value) {
      popOver.value!.open()
    }
  }

  function closeSelect(): void {
    if (isOpen.value) {
      popOver.value!.close()
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
    return filteredSelectOptions.value[highlightedIndex.value]
  }

  function trySettingValueToHighlighted(): boolean {
    const highlighted = getHighlighted()

    if (!highlighted || highlighted.disabled) {
      return false
    }

    setValue(highlighted.value)

    return true
  }

  function getFirstNonDisabledIndex(): number {
    return filteredSelectOptions.value.findIndex(x => !x.disabled)
  }

  function getLastNonDisabledIndex(): number {
    for (let i = filteredSelectOptions.value.length - 1; i >= 0; i--) {
      if (!filteredSelectOptions.value[i].disabled) {
        return i
      }
    }

    return -1
  }

  function tryMovingHighlightedIndex(change: number): boolean {
    const maxIndex = filteredSelectOptions.value.length
    const newIndex = highlightedIndex.value + change

    if (!maxIndex || !isOpen.value) {
      return false
    }

    if (newIndex < 0) {
      const firstNonDisabled = getFirstNonDisabledIndex()

      if (firstNonDisabled === -1) {
        return false
      }

      highlightedIndex.value = firstNonDisabled
    } else if (newIndex >= maxIndex) {
      const lastNonDisabled = getLastNonDisabledIndex()

      if (lastNonDisabled === -1) {
        return false
      }

      highlightedIndex.value = lastNonDisabled
    } else {
      highlightedIndex.value = newIndex

      if (filteredSelectOptions.value[newIndex].disabled) {
        return tryMovingHighlightedIndex(change)
      }
    }

    scrollToOption(highlightedIndex.value)

    return true
  }

  function getOptionElement(index: number): HTMLLIElement | undefined {
    return optionElements.value[index]
  }

  function scrollToOption(index: number): void {
    const element = getOptionElement(index)

    element?.scrollIntoView({ block: 'nearest' })
  }

  function handleOpenChange(open: boolean): void {
    if (open) {
      emits('open')
    } else {
      highlightedIndex.value = -1
      emits('close')
    }
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
        if (isOpen.value) {
          tryMovingHighlightedIndex(-1)
        }
        event.preventDefault()
        break
      case keys.downArrow:
        if (isOpen.value) {
          tryMovingHighlightedIndex(1)
        } else {
          openSelect()
        }
        event.preventDefault()
        break
      case keys.space:
        if (!isOpen.value) {
          openSelect()
        } else {
          trySettingValueToHighlighted()
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

  function dismissTag(tag: SelectModelValue): void {
    const value = valueAsArray.value.filter(x => x !== tag)

    internalValue.value = value
  }

  function handleOptionClick(option: SelectOption): void {
    if (option.disabled) {
      return
    }

    setValue(option.value)

    if (!multiple.value) {
      closeSelect()
    }
  }
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
  my-1
  bg-white
  shadow-lg
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