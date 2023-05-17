import { computed, Ref } from 'vue'
import { useBooleanToggle } from '@/compositions/useBooleanToggle'

type UseDrawer = {
  isOpen: Ref<boolean>,
  open: () => void,
  close: () => void,
  toggle: () => void,
}

export function useDrawer(value: Ref<boolean>): UseDrawer {
  const { toggle } = useBooleanToggle(value)

  const isOpen = computed<boolean>(() => value.value)

  const open = (): void => {
    value.value = true
  }

  const close = (): void => {
    value.value = false
  }

  return { isOpen, open, close, toggle }
}

