<template>
  <PPopOver
    ref="popOver"
    :placement="[bottomLeft, topLeft]"
    class="p-select"
    :class="classes"
    auto-close
    @open="handleOpenChange"
    @keydown="handleKeydown"
  >
    <template #target>
      <PNativeSelect
        v-model="internalValue"
        size="1"
        class="p-select__native"
        :multiple="multiple"
        :options="filteredSelectOptions"
      />

      <div ref="targetElement" class="p-select__custom">
        <button
          type="button"
          class="p-select__custom-button"
          aria-hidden="true"
          tabindex="-1"
          @click="openSelect"
        >
          <template v-if="multiple">
            <template v-if="valueAsArray.length">
              <PTagWrapper class="p-select__tag-wrapper" :tags="valueAsArray">
                <template #tag="{ tag }">
                  <slot
                    name="default"
                    :selected-option="getSelectOption(tag)"
                    :is-open="popOver?.visible"
                    :open="openSelect"
                    :close="closeSelect"
                    :unselect-option="() => unselectOptionValue(tag)"
                  >
                    <PTag dismissible @dismiss="unselectOptionValue(tag)">
                      {{ getSelectOption(tag)?.label }}
                    </PTag>
                  </slot>
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
              <template v-if="selectedOption">
                <slot
                  name="default"
                  :selected-option="selectedOption"
                  :is-open="popOver?.visible"
                  :open="openSelect"
                  :close="closeSelect"
                  :unselect-option="() => internalValue = null"
                >
                  {{ selectedOption.label }}
                </slot>
              </template>
              <template v-else>
                {{ emptyMessage }}
              </template>
            </span>
          </template>
        </button>
      </div>
    </template>

    <PSelectOptions
      v-model:highlightedIndex="highlightedIndex"
      :model-value="internalValue"
      :options="filteredSelectOptions"
      :style="styles"
      @keydown="handleKeydown"
      @update:model-value="setValue"
    >
      <template #pre-options>
        <slot name="pre-options" />
      </template>
      <template #option="{ option, selected, highlighted }">
        <slot
          name="option"
          :option="option"
          :selected="selected"
          :highlighted="highlighted"
        />
      </template>
      <template #options-empty>
        <slot name="options-empty" />
      </template>
      <template #post-options>
        <slot name="post-options" />
      </template>
    </PSelectOptions>
  </PPopOver>
</template>

<script lang="ts">
  import { useElementWidth } from '@prefecthq/vue-compositions'
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
  import PSelectOptions from '@/components/Select/PSelectOptions.vue'
  import PTag from '@/components/Tag/PTag.vue'
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

  const targetElement = ref<HTMLElement | undefined>()
  const popOver = ref<typeof PPopOver>()
  const highlightedIndex = ref(0)
  const targetElementWidth = useElementWidth(targetElement)

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

  const multiple = computed(() => Array.isArray(internalValue.value))

  const selectedOption = computed(() => {
    if (multiple.value) {
      return null
    }

    return selectOptions.value.find(x => x.value === internalValue.value)
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

  const styles = computed(() => ({
    minWidth: `${targetElementWidth.value}px`,
  }))

  const isOpen = computed(() => popOver.value?.visible ?? false)

  function getSelectOption(value: SelectModelValue): SelectOption | undefined {
    return selectOptions.value.find(x => x.value === value)
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

    if (!multiple.value) {
      closeSelect()
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

  function getButtonElement(): HTMLButtonElement | undefined {
    return targetElement.value?.children[0] as HTMLButtonElement | undefined
  }

  function handleOpenChange(open: boolean): void {
    if (open) {
      emits('open')
    } else {
      emits('close')
      const button = getButtonElement()
      if (button) {
        button.focus()
      }
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
        if (!isOpen.value) {
          openSelect()
        } else if (highlightedIndex.value > 0) {
          highlightedIndex.value -= 1
        }
        event.preventDefault()
        break
      case keys.downArrow:
        if (!isOpen.value) {
          openSelect()
        } else if (highlightedIndex.value < filteredSelectOptions.value.length - 1) {
          highlightedIndex.value += 1
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
        trySettingValueToHighlighted()
        event.preventDefault()
        break
      default:
        break
    }
  }

  function unselectOptionValue(tag: SelectModelValue): void {
    const value = valueAsArray.value.filter(x => x !== tag)

    internalValue.value = value
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
  truncate
  flex
  items-center
}

@media (hover: hover) {
  .p-select__custom { @apply
    block
  }
}
</style>