import { computed, Ref } from 'vue'
import { useBooleanToggle } from '@/compositions/useBooleanToggle'
import { keys } from '@/types'

type UseDrawer = {
  isVisble: Ref<boolean>,
  open: () => void,
  close: () => void,
  show: () => void,
  hide: () => void,
  toggle: () => void,
  closeOnEscape: (event: KeyboardEvent) => void,
}

export function useModal(value: Ref<boolean>): UseDrawer {
  const { toggle, setTrue, setFalse } = useBooleanToggle(value)

  const isVisble = computed<boolean>(() => value.value)

  const closeOnEscape = (event: KeyboardEvent): void => {
    if (event.key === keys.escape) {
      setFalse()
    }
  }
  return { isVisble, open: setTrue, close: setFalse, show: setTrue, hide: setFalse, toggle, closeOnEscape }
}

