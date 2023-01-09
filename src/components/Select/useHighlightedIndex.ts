import { computed, Ref, ref } from 'vue'
import { SelectOption } from '@/types'

export type UseHighlightedIndex = {
  highlightedIndex: Ref<number | undefined>,
  highlighted: Ref<SelectOption | undefined>,
  incrementHighlightedIndex: () => void,
  decrementHighlightedIndex: () => void,
}
export function useHighlightedIndex(options: SelectOption[] | Ref<SelectOption[]>): UseHighlightedIndex {
  const optionsRef = ref(options)
  const highlightedIndex = ref<number>()

  const highlighted = computed(() => {
    if (highlightedIndex.value === undefined) {
      return undefined
    }

    return optionsRef.value[highlightedIndex.value]
  })

  function incrementHighlightedIndex(): void {
    if (highlightedIndex.value === undefined) {
      highlightedIndex.value = 0
    } else if (highlightedIndex.value < optionsRef.value.length - 1) {
      highlightedIndex.value++
    }
  }

  function decrementHighlightedIndex(): void {
    if (highlightedIndex.value === undefined) {
      highlightedIndex.value = optionsRef.value.length - 1
    } else if (highlightedIndex.value > 0) {
      highlightedIndex.value--
    }
  }

  return {
    highlightedIndex,
    highlighted,
    incrementHighlightedIndex,
    decrementHighlightedIndex,
  }
}