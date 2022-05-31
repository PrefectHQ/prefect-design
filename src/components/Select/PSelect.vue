<template>
  <PPopOver
    ref="popOver"
    :placement="[bottomLeft, topLeft]"
    class="p-select"
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
          :style="styles.control"
          v-bind="attrs"
          :options="selectOptions"
          @click="openSelect"
        >
          <template #default="scope">
            <slot v-bind="scope" :is-open="isOpen" :open="openSelect" :close="closeSelect" />
          </template>
        </PSelectButton>
      </template>

      <template v-else>
        <PNativeSelect
          v-model="internalValue"
          size="1"
          class="p-select__native"
          :class="classes.control"
          :style="styles.control"
          v-bind="attrs"
          :options="filteredSelectOptions"
        />
      </template>
    </template>

    <PSelectOptions
      v-model:highlightedIndex="highlightedIndex"
      :model-value="internalValue"
      :options="filteredSelectOptions"
      :style="styles.option"
      @keydown="handleKeydown"
      @update:model-value="setValue"
    >
      <template #pre-options="scope">
        <slot name="pre-options" v-bind="scope" />
      </template>
      <template #option="scope">
        <slot name="option" v-bind="scope" />
      </template>
      <template #options-empty="scope">
        <slot name="options-empty" v-bind="scope" />
      </template>
      <template #post-options="scope">
        <slot name="post-options" v-bind="scope" />
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
  import PSelectButton from '@/components/Select/PSelectButton.vue'
  import PSelectOptions from '@/components/Select/PSelectOptions.vue'
  import { useAttrsStylesAndClasses } from '@/compositions/attributes'
  import { isAlphaNumeric, keys } from '@/types/keyEvent'
  import { SelectOption, isSelectOption, SelectModelValue } from '@/types/selectOption'
  import { convertToClassValueObject } from '@/utilities/attributes'
  import { media } from '@/utilities/media'
  import { topLeft, bottomLeft } from '@/utilities/position'

  const props = defineProps<{
    modelValue: string | number | null | SelectModelValue[] | undefined,
    options: (string | number | SelectOption)[],
    filterOptions?: (option: SelectOption) => boolean,
  }>()

  const emits = defineEmits<{
    (event: 'update:modelValue', value: SelectModelValue | SelectModelValue[]): void,
    (event: 'open' | 'close'): void,
  }>()

  const buttonElement = ref<typeof PSelectButton>()
  const targetElement = computed(() => buttonElement.value?.wrapper)
  const targetElementWidth = useElementWidth(targetElement)
  const { classes:attrClasses, styles:attrStyles, attrs } = useAttrsStylesAndClasses()
  const popOver = ref<typeof PPopOver>()
  const highlightedIndex = ref(0)

  const internalValue = computed({
    get() {
      return props.modelValue ?? null
    },
    set(value: SelectModelValue | SelectModelValue[]) {
      emits('update:modelValue', value)
    },
  })

  const multiple = computed(() => Array.isArray(internalValue.value))
  const isOpen = computed(() => popOver.value?.visible ?? false)

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
    control: {
      ...convertToClassValueObject(attrClasses.value),
      'p-select--open': isOpen.value,
    },
  }))

  const styles = computed(() => ({
    option:{
      minWidth: `${targetElementWidth.value}px`,
    },
    control: attrStyles,
  }))

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

  function handleOpenChange(open: boolean): void {
    if (open) {
      emits('open')
    } else {
      emits('close')
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
  bg-white
  w-full
  rounded-md
}
</style>