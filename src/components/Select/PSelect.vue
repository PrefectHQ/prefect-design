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
          v-model="modelValue"
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

            <template v-else-if="multiple">
              <PTagWrapper class="p-select-button__value" :tags="tags">
                <template #tag="{ tag }">
                  <slot name="tag" :label="tag.label" :value="tag.value" :dismiss="() => dismissTag(tag)">
                    <PTag :dismissible="isDismissible(tag)" @dismiss="dismissTag(tag)">
                      <slot :label="tag.label" :value="tag.value" :option="getSelectOption(tag.value)">
                        {{ tag.label }}
                      </slot>
                    </PTag>
                  </slot>
                </template>

                <template #overflow-tags="{ overflowedChildren }">
                  <span>+{{ overflowedChildren }}</span>
                </template>
              </PTagWrapper>
            </template>

            <template v-else-if="!Array.isArray(modelValue)">
              <slot :label="getLabel(modelValue)" :value="modelValue" :option="getSelectOption(modelValue)">
                {{ getLabel(modelValue) }}
              </slot>
            </template>
          </template>
        </PSelectButton>
      </template>

      <template v-else>
        <PNativeSelect
          v-model="modelValue"
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
      v-model="modelValue"
      v-model:highlightedValue="highlightedValue"
      class="p-select__options"
      :options="selectOptions"
      :style="styles.option"
      :multiple="multiple"
      @update:model-value="closeIfNotMultiple"
      @keydown="handleKeydown"
      @mouseleave="setHighlightedValueUnselected"
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
  import { computed, ref } from 'vue'
  import PNativeSelect from '@/components/NativeSelect/PNativeSelect.vue'
  import PPopOver from '@/components/PopOver/PPopOver.vue'
  import PSelectButton from '@/components/Select/PSelectButton.vue'
  import PSelectOptions from '@/components/Select/PSelectOptions.vue'
  import PTag from '@/components/Tag/PTag.vue'
  import PTagWrapper from '@/components/TagWrapper/PTagWrapper.vue'
  import { useAttrsStylesAndClasses } from '@/compositions/attributes'
  import { useHighlightedValue } from '@/compositions/useHighlightedValue'
  import { MaybeReadonly } from '@/types'
  import { isAlphaNumeric, keys } from '@/types/keyEvent'
  import { SelectModelValue, flattenSelectOptions, normalizeSelectOption, SelectOptionGroup, SelectOptionNormalized, SelectOption, isSelectOptionNormalized } from '@/types/selectOption'
  import { TagValue } from '@/types/tag'
  import { asArray, isArray } from '@/utilities/arrays'
  import { media } from '@/utilities/media'
  import { topLeft, bottomLeft, bottomRight, topRight } from '@/utilities/position'

  const props = defineProps<{
    modelValue: string | number | boolean | null | SelectModelValue[] | undefined,
    disabled?: boolean,
    options: MaybeReadonly<(SelectOption | SelectOptionGroup)[]>,
    emptyMessage?: string,
    multiple?: boolean,
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

  const modelValue = computed({
    get() {
      return props.modelValue ?? null
    },
    set(value) {
      emit('update:modelValue', value)
    },
  })

  const tags = computed(() => {
    return asArray(modelValue.value).map(option => ({
      label: getLabel(option),
      value: option,
    }))
  })

  // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
  const multiple = computed(() => props.multiple || isArray(modelValue.value))

  const isOpen = computed(() => popOver.value?.visible ?? false)
  const showShowEmptyMessage = computed(() => {
    if (isArray(modelValue.value)) {
      return modelValue.value.length === 0
    }

    return getSelectOption(modelValue.value) === undefined
  })

  const selectOptions = computed(() => {
    return props.options.map(normalizeSelectOption)
  })

  const flatSelectOptions = computed(() => flattenSelectOptions(selectOptions.value))
  const { highlightedValue, isUnselected, setHighlightedValueUnselected, setNextHighlightedValue, setPreviousHighlightedValue } = useHighlightedValue(flatSelectOptions)

  function getSelectOption(value: unknown): SelectOptionNormalized | undefined {
    return flatSelectOptions.value.find(option => option.value === value)
  }

  function getLabel(value: SelectModelValue): string {
    return getSelectOption(value)?.label ?? ''
  }

  function dismissTag(tagValue: TagValue): void {
    if (isArray(modelValue.value)) {
      modelValue.value = modelValue.value.filter(x => x !== tagValue.value)
    }
  }

  function closeIfNotMultiple(): void {
    if (multiple.value) {
      return
    }

    closeSelect()
  }

  function isDismissible(tagValue: TagValue): boolean {
    if (props.disabled) {
      return false
    }

    const option = getSelectOption(tagValue.value)

    return !option?.disabled
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
    if (Array.isArray(modelValue.value)) {
      const index = modelValue.value.indexOf(newValue)

      if (index > -1) {
        modelValue.value = [...modelValue.value.slice(0, index), ...modelValue.value.slice(index + 1)]
      } else {
        modelValue.value = [...modelValue.value, newValue]
      }
    } else {
      modelValue.value = newValue
    }

    if (!multiple.value) {
      closeSelect()
    }
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
        } else {
          setPreviousHighlightedValue()
        }
        event.preventDefault()
        break
      case keys.downArrow:
        if (!isOpen.value) {
          openSelect()
        } else {
          setNextHighlightedValue()
        }
        event.preventDefault()
        break
      case keys.space:
        if (!isOpen.value) {
          openSelect()
        } else if (!isUnselected(highlightedValue.value)) {
          setValue(highlightedValue.value)
        }
        event.preventDefault()
        break
      case keys.enter:
        if (!isOpen.value) {
          return
        }

        if (selectOptions.value.length === 1) {
          const [first] = selectOptions.value

          if (isSelectOptionNormalized(first)) {
            setValue(first.value)
          }
        } else if (!isUnselected(highlightedValue.value)) {
          setValue(highlightedValue.value)
          event.preventDefault()
        }
        break
      default:
        break
    }
  }
</script>
