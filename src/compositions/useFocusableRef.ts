import { computed, Ref } from 'vue'

export function useFocusableRef(element: Ref<HTMLElement | undefined>): Ref<HTMLElement[]> {
  return computed(() => Array.from(element.value?.querySelectorAll('button:not([disabled]), [href]:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"]):not([disabled])') ?? []))
}