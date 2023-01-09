import { computed, Ref, ref, watch } from 'vue'
import { SelectOption } from '@/types'
import { MaybeRef } from '@/types/ref'

export type UseHighlightedIndex = {
  highlightedIndex: Ref<number | undefined>,
  highlighted: Ref<SelectOption | undefined>,
  incrementHighlightedIndex: () => void,
  decrementHighlightedIndex: () => void,
}
export function useHighlightedIndex(options: MaybeRef<SelectOption[]>): UseHighlightedIndex {
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

  function getFirstSelectableOption(): number | undefined {
    return optionsRef.value.findIndex(x => !x.disabled)
  }

  function getLastSelectableOption(): number | undefined {
    for (let i = optionsRef.value.length - 1; i > 0; i--) {
      if (!optionsRef.value[i].disabled) {
        return i
      }
    }

    return undefined
  }

  watch(highlightedIndex, (index, previous) => {
    if (index === undefined) {
      return
    }

    if (optionsRef.value[index].disabled) {
      const difference = index - (previous ?? -1)
      highlightedIndex.value = index + difference
      return
    }

    if (index <= 0) {
      highlightedIndex.value = getFirstSelectableOption()
    } else if (index >= optionsRef.value.length) {
      highlightedIndex.value = getLastSelectableOption()
    }
  })

  return {
    highlightedIndex,
    highlighted,
    incrementHighlightedIndex,
    decrementHighlightedIndex,
  }
}