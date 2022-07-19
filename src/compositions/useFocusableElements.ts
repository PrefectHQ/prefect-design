import { computed, Ref } from 'vue'

export function useFocusableElements(element: Ref<HTMLElement | undefined>): Ref<HTMLElement[]> {
  const focusableQuery = 'button:not([disabled]), [href]:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"]):not([disabled])'

  return computed(() => {
    if (element.value === undefined) {
      return []
    }

    return Array.from(element.value.querySelectorAll(focusableQuery))
  })
}