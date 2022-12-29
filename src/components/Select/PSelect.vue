<template>
  <PPopOver
    ref="popOver"
    :placement="[bottomLeft, topLeft, bottomRight, topRight]"
    class="p-select"
    :class="attrClasses"
    :styles="attrStyles"
    auto-close
    @open="handleOpenChange"
    @keydown="handleKeydown"
  >
    <template #target>
      <template v-if="media.hover">
        <PSelectButton
          ref="buttonElement"
          v-model="internalValue"
          class="p-select__custom"
          :class="classes.control"
          :disabled="disabled"
          v-bind="attrs"
          :options="selectOptions"
          @click="toggleSelect"
        >
          <template #default>
            <template v-if="showShowEmptyMessage">
              <slot name="empty-message">
                {{ emptyMessage }}
              </slot>
            </template>

            <template v-else-if="isArray(internalValue)">
              <PTagWrapper class="p-select-button__value" :tags="tags">
                <template #tag="{ tag }">
                  <slot name="tag" :label="getLabel(tag)" :value="tag" :dismiss="() => unselectOptionValue(tag)">
                    <PTag dismissible @dismiss="unselectOptionValue(tag)">
                      <slot :label="getLabel(tag)" :value="tag">
                        {{ getLabel(tag) }}
                      </slot>
                    </PTag>
                  </slot>
                </template>

                <template #overflow-tags="{ overflowedChildren }">
                  <span>+{{ overflowedChildren }}</span>
                </template>
              </PTagWrapper>
            </template>

            <template v-else>
              <slot :label="getLabel(internalValue)" :value="internalValue">
                {{ getLabel(internalValue) }}
              </slot>
            </template>
          </template>
        </PSelectButton>
      </template>

      <template v-else>
        <PNativeSelect
          v-model="internalValue"
          size="1"
          class="p-select__native"
          :class="classes.control"
          :disabled="disabled"
          v-bind="attrs"
          :options="selectOptions"
        />
      </template>
    </template>

    <PSelectOptions
      v-model:highlightedIndex="highlightedIndex"
      :model-value="internalValue"
      :options="selectOptions"
      :style="styles.option"
      @keydown="handleKeydown"
      @update:model-value="setValue"
    >
      <template v-for="(index, name) in $slots" #[name]="data">
        <slot :name="name" v-bind="{ ...data, close: closeSelect }" />
      </template>
    </PSelectOptions>
  </PPopOver>
</template>

<script lang="ts">
  export default {
    name: 'PSelect',
    expose: [],
    inheritAttrs: false,
  }
</script>

<script lang="ts" setup>
  import { useElementRect } from '@prefecthq/vue-compositions'
  import { computed, ref, watch } from 'vue'
  import PNativeSelect from '@/components/NativeSelect/PNativeSelect.vue'
  import PPopOver from '@/components/PopOver/PPopOver.vue'
  import PSelectButton from '@/components/Select/PSelectButton.vue'
  import PSelectOptions from '@/components/Select/PSelectOptions.vue'
  import PTag from '@/components/Tag/PTag.vue'
  import PTagWrapper from '@/components/TagWrapper/PTagWrapper.vue'
  import { useAttrsStylesAndClasses } from '@/compositions/attributes'
  import { isAlphaNumeric, keys } from '@/types/keyEvent'
  import { SelectOption, isSelectOption, SelectModelValue } from '@/types/selectOption'
  import { asArray, isArray } from '@/utilities/arrays'
  import { media } from '@/utilities/media'
  import { topLeft, bottomLeft, bottomRight, topRight } from '@/utilities/position'

  const props = defineProps<{
    modelValue: string | number | boolean | null | SelectModelValue[] | undefined,
    disabled?: boolean,
    options: (string | number | boolean | SelectOption)[],
    emptyMessage?: string,
  }>()

  const emit = defineEmits<{
    (event: 'update:modelValue', value: SelectModelValue | SelectModelValue[]): void,
    (event: 'open' | 'close'): void,
  }>()

  const buttonElement = ref<typeof PSelectButton>()
  const targetElement = computed(() => buttonElement.value?.wrapper)
  const { width: targetElementWidth } = useElementRect(targetElement)
  const { classes: attrClasses, styles: attrStyles, attrs } = useAttrsStylesAndClasses()
  const popOver = ref<typeof PPopOver>()
  const highlightedIndex = ref<number>()

  const internalValue = computed({
    get() {
      return props.modelValue ?? null
    },
    set(value: SelectModelValue | SelectModelValue[]) {
      emit('update:modelValue', value)
    },
  })

  const tags = computed(() => {
    return asArray(internalValue.value).map(option => option?.toString() ?? '')
  })

  const multiple = computed(() => isArray(internalValue.value))
  const isOpen = computed(() => popOver.value?.visible ?? false)
  const showShowEmptyMessage = computed(() => {
    if (isArray(internalValue.value)) {
      return internalValue.value.length === 0
    }

    return getSelectOption(internalValue.value) === undefined
  })

  const selectOptions = computed<SelectOption[]>(() => {
    return props.options.map(option => {
      if (isSelectOption(option)) {
        return option
      }

      return { label: option.toLocaleString(), value: option }
    })
  })

  function getSelectOption(value: SelectModelValue): SelectOption | undefined {
    return selectOptions.value.find(x => x.value === value)
  }

  function getLabel(value: SelectModelValue): string {
    return getSelectOption(value)?.label ?? ''
  }

  function unselectOptionValue(value: SelectModelValue): void {
    if (isArray(internalValue.value)) {
      internalValue.value = internalValue.value.filter(x => x !== value)
    }
  }

  const classes = computed(() => ({
    control: {
      'p-select--open': isOpen.value,
    },
  }))

  const styles = computed(() => ({
    option: {
      minWidth: `${targetElementWidth.value}px`,
    },
  }))

  function openSelect(): void {
    if (!isOpen.value && !props.disabled) {
      popOver.value!.open()
    }
  }

  function closeSelect(): void {
    if (isOpen.value) {
      popOver.value!.close()
    }
  }

  function toggleSelect(): void {
    if (isOpen.value) {
      closeSelect()
    } else {
      openSelect()
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
    if (highlightedIndex.value === undefined) {
      return undefined
    }

    return selectOptions.value[highlightedIndex.value]
  }

  function trySettingValueToHighlighted(): boolean {
    const highlighted = getHighlighted()

    if (!highlighted || highlighted.disabled) {
      return false
    }

    setValue(highlighted.value)

    return true
  }

  function handleOpenChange(open: boolean): void {
    if (open) {
      emit('open')
    } else {
      emit('close')
      buttonElement.value?.el.focus()
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
        } else if (highlightedIndex.value === undefined) {
          highlightedIndex.value = selectOptions.value.length - 1
        } else if (highlightedIndex.value > 0) {
          highlightedIndex.value -= 1
        }
        event.preventDefault()
        break
      case keys.downArrow:
        if (!isOpen.value) {
          openSelect()
        } else if (highlightedIndex.value === undefined) {
          highlightedIndex.value = 0
        } else if (highlightedIndex.value < selectOptions.value.length - 1) {
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
        if (isOpen.value) {
          if (selectOptions.value.length === 1) {
            highlightedIndex.value = 0
          }

          trySettingValueToHighlighted()
          event.preventDefault()
        }
        break
      default:
        break
    }
  }

  watch([selectOptions, highlightedIndex], ([options, index]) => {
    if (index && !options[index]) {
      highlightedIndex.value = undefined
    }
  })
</script>

<style>
.p-select { @apply
  relative
  text-base
  rounded-md
}

.p-select--open { @apply
  outline-none
  ring-1
  ring-prefect-500
  border-prefect-500
}

.p-select__custom { @apply
  w-full
  rounded-md
}
</style>