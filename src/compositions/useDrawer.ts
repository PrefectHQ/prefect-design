import { computed, Ref } from 'vue'
import { useBooleanToggle } from '@/compositions/useBooleanToggle'

type UseDrawer = {
  value: Ref<boolean>,
  isOpen: Ref<boolean>,
  open: () => void,
  close: () => void,
  toggle: () => void,
}

/**
 * The useDrawer composition takes a boolean ref and returns a set of methods
 * for controlling the state of the drawer. The isOpen ref is computed from the
 * provided value ref.
 *
 * @param value Ref<boolean>
 * @returns UseDrawer
 * @example
 *  const drawerOpen = ref(false)
 *  const { isOpen, open, close, toggle } = useDrawer(drawerOpen)
 *
**/
export function useDrawer(valueRef?: Ref<boolean>): UseDrawer {
  const { value, toggle, setTrue, setFalse } = useBooleanToggle(valueRef)

  const isOpen = computed<boolean>(() => value.value)

  return { value, isOpen, open: setTrue, close: setFalse, toggle }
}

