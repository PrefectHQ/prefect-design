<template>
  <PPopOver
    ref="popOver"
    :placement="[bottomLeft, topLeft, bottomRight, topRight]"
    class="p-type-ahead"
    :class="attrClasses"
    :styles="attrStyles"
    auto-close
    @open="handleOpenChange"
    @keydown="handleKeydown"
  >
    <template #target>
      <PTextInput
        ref="inputElement"
        v-model="internalValue"
        :class="classes.control"
        :disabled="disabled"
        v-bind="attrs"
        :options="filteredSelectOptions"
        @click="handleInputClick"
      >
        <template v-for="(index, name) in $slots" #[name]="data">
          <slot :name="name" v-bind="{ ...data, isOpen, open: openSelect, close: closeSelect }" />
        </template>
      </PTextInput>
    </template>

    <PSelectOptions
      v-model:highlightedIndex="highlightedIndex"
      :model-value="internalValue"
      :options="filteredSelectOptions"
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
    name: 'PTypeAhead',
    expose: [],
    inheritAttrs: false,
  }
</script>

<script lang="ts" setup>
  import { useElementRect } from '@prefecthq/vue-compositions'
  import { computed, ref, watch } from 'vue'
  import PPopOver from '@/components/PopOver/PPopOver.vue'
  import PSelectOptions from '@/components/Select/PSelectOptions.vue'
  import { useHighlightedIndex } from '@/components/Select/useHighlightedIndex'
  import PTextInput from '@/components/TextInput/PTextInput.vue'
  import { useAttrsStylesAndClasses } from '@/compositions/attributes'
  import { isAlphaNumeric, keys } from '@/types/keyEvent'
  import { optionIncludes, SelectModelValue, toSelectOptions } from '@/types/selectOption'
  import { topLeft, bottomLeft, bottomRight, topRight } from '@/utilities/position'

  const props = defineProps<{
    modelValue: string | null | undefined,
    disabled?: boolean,
    openOnFocus?: boolean,
    options: string[],
  }>()

  const emits = defineEmits<{
    (event: 'update:modelValue' | 'selected', value: string | null): void,
    (event: 'open' | 'close'): void,
  }>()

  const inputElement = ref<typeof PTextInput>()
  const targetElement = computed(() => inputElement.value?.wrapper)
  const { width: targetElementWidth } = useElementRect(targetElement)
  const { classes: attrClasses, styles: attrStyles, attrs } = useAttrsStylesAndClasses()
  const popOver = ref<typeof PPopOver>()

  const internalValue = computed({
    get() {
      return props.modelValue ?? null
    },
    set(value: string | null) {
      emits('update:modelValue', value)
    },
  })

  const isOpen = computed(() => popOver.value?.visible ?? false)

  const selectOptions = computed(() => {
    return props.options.map(toSelectOptions)
  })

  const filteredSelectOptions = computed(() => {
    return selectOptions.value.filter(option => optionIncludes(option, internalValue.value))
  })

  const { highlightedIndex, highlighted, incrementHighlightedIndex, decrementHighlightedIndex } = useHighlightedIndex(filteredSelectOptions)

  const classes = computed(() => ({
    control: {
      'p-type-ahead--open': isOpen.value,
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

  function handleInputClick(): void {
    if (props.openOnFocus) {
      openSelect()
    }
  }

  function setValue(newValue: SelectModelValue | SelectModelValue[]): void {
    if (Array.isArray(newValue)) {
      return
    }

    if (typeof newValue === 'string') {
      internalValue.value = newValue
    }

    emits('selected', newValue?.toString() ?? null)

    closeSelect()
  }

  function handleOpenChange(open: boolean): void {
    if (open) {
      emits('open')
    } else {
      emits('close')
      inputElement.value?.el.focus()
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
          decrementHighlightedIndex()
        }
        event.preventDefault()
        break
      case keys.downArrow:
        if (!isOpen.value) {
          openSelect()
        } else {
          incrementHighlightedIndex()
        }
        event.preventDefault()
        break
      case keys.space:
        if (!isOpen.value) {
          openSelect()
        } else if (highlighted.value && !highlighted.value.disabled) {
          setValue(highlighted.value.value)
        }
        event.preventDefault()
        break
      case keys.enter:
        if (isOpen.value && highlighted.value && !highlighted.value.disabled) {
          setValue(highlighted.value.value)
          event.preventDefault()
        }
        break
      default:
        break
    }
  }

  watch(filteredSelectOptions, (options) => {
    if (highlightedIndex.value !== undefined && !options[highlightedIndex.value]) {
      highlightedIndex.value = undefined
    }
  })
</script>

<style>
.p-type-ahead { @apply
  relative
  text-base
  rounded-md
}

.p-type-ahead--open { @apply
  outline-none
  ring-1
  ring-primary-500
  border-primary-500
}
</style>