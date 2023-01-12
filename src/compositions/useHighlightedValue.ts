import { computed, Ref, ref, watch } from 'vue'
import { SelectModelValue, SelectOptionNormalized } from '@/types'
import { MaybeRef } from '@/types/ref'

const unselected = Symbol()

export type UseHighlightedValue = {
  highlightedValue: Ref<SelectModelValue | typeof unselected>,
  isUnselected: (value: unknown) => value is typeof unselected,
  setNextHighlightedValue: () => void,
  setPreviousHighlightedValue: () => void,
  setHighlightedValueUnselected: () => void,
}
export function useHighlightedValue(selectOptions: MaybeRef<SelectOptionNormalized[]>): UseHighlightedValue {
  const selectOptionsRef = ref(selectOptions)
  const valuesThatCanBeHighlighted = computed(() => selectOptionsRef.value
    .filter(option => !option.disabled)
    .map(({ value }) => value))

  const highlightedValue = ref<SelectModelValue | typeof unselected>(unselected)

  function isUnselected(value: unknown): value is typeof unselected {
    return value === unselected
  }

  function setNextHighlightedValue(): void {
    const currentIndex = valuesThatCanBeHighlighted.value.indexOf(highlightedValue.value as SelectModelValue)
    const newIndex = Math.min(currentIndex + 1, valuesThatCanBeHighlighted.value.length - 1)
    highlightedValue.value = valuesThatCanBeHighlighted.value[newIndex]
  }

  function setPreviousHighlightedValue(): void {
    if (highlightedValue.value === unselected) {
      highlightedValue.value = valuesThatCanBeHighlighted.value[valuesThatCanBeHighlighted.value.length - 1]
      return
    }

    const currentIndex = valuesThatCanBeHighlighted.value.indexOf(highlightedValue.value as SelectModelValue)
    const newIndex = Math.max(currentIndex - 1, 0)
    highlightedValue.value = valuesThatCanBeHighlighted.value[newIndex]
  }

  function setHighlightedValueUnselected(): void {
    highlightedValue.value = unselected
  }

  watch(valuesThatCanBeHighlighted, (options) => {
    if (highlightedValue.value === unselected) {
      return
    }

    if (!options.includes(highlightedValue.value)) {
      highlightedValue.value = unselected
    }
  })

  const value = {
    highlightedValue,
    isUnselected,
    setNextHighlightedValue,
    setPreviousHighlightedValue,
    setHighlightedValueUnselected,
  }

  return value
}