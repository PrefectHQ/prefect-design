import { computed, Ref } from 'vue'
import { useBooleanToggle } from '@/compositions/useBooleanToggle'
import { keys } from '@/types'

type UseDrawer = {
  isOpen: Ref<boolean>,
  open: () => void,
  close: () => void,
  toggle: () => void,
  closeOnEscape: (event: KeyboardEvent) => void,
}

export function useDrawer(value: Ref<boolean>): UseDrawer {
  const { toggle, setTrue, setFalse } = useBooleanToggle(value)

  const isOpen = computed<boolean>(() => value.value)

  const closeOnEscape = (event: KeyboardEvent): void => {
    if (event.key === keys.escape) {
      setFalse()
    }
  }

  return { isOpen, open: setTrue, close: setFalse, toggle, closeOnEscape }
}

