import { computed, ComputedRef, Ref, ref, watch } from 'vue'
import { SelectModelValue, SelectOption } from '@/types'
import { MaybeRef } from '@/types/ref'

const unselected = 'UNSELECTED_VALUE' as const

export type UseHighlightedValue = {
  highlightedValue: Ref<SelectModelValue>,
  isUnselected: ComputedRef<boolean>,
  setNextHighlightedValue: () => void,
  setPreviousHighlightedValue: () => void,
  setHighlightedValueUnselected: () => void,
}
export function useHighlightedValue(selectOptions: MaybeRef<SelectOption[]>): UseHighlightedValue {
  const selectOptionsRef = ref(selectOptions)
  const highlightableValues = computed(() => selectOptionsRef.value
    .filter(option => !option.disabled)
    .map(({ value }) => value))

  const highlightedValue = ref<SelectModelValue>(unselected)

  const isUnselected = computed(() => highlightedValue.value === unselected)

  function setNextHighlightedValue(): void {
    const currentIndex = highlightableValues.value.indexOf(highlightedValue.value as SelectModelValue)
    const newIndex = Math.min(currentIndex + 1, highlightableValues.value.length - 1)
    highlightedValue.value = highlightableValues.value[newIndex]
  }

  function setPreviousHighlightedValue(): void {
    if (highlightedValue.value === unselected) {
      highlightedValue.value = highlightableValues.value[highlightableValues.value.length - 1]
      return
    }

    const currentIndex = highlightableValues.value.indexOf(highlightedValue.value as SelectModelValue)
    const newIndex = Math.max(currentIndex - 1, 0)
    highlightedValue.value = highlightableValues.value[newIndex]
  }

  function setHighlightedValueUnselected(): void {
    highlightedValue.value = unselected
  }

  watch(highlightableValues, (options) => {
    if (!options.includes(highlightedValue.value)) {
      highlightedValue.value = unselected
    }
  })


  return {
    highlightedValue,
    isUnselected,
    setNextHighlightedValue,
    setPreviousHighlightedValue,
    setHighlightedValueUnselected,
  }
}