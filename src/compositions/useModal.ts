import { computed, Ref } from 'vue'
import { useBooleanToggle } from '@/compositions/useBooleanToggle'

type UseDrawer = {
  value: Ref<boolean>,
  isVisble: Ref<boolean>,
  open: () => void,
  close: () => void,
  show: () => void,
  hide: () => void,
  toggle: () => void,
}

export function useModal(valueRef?: Ref<boolean>): UseDrawer {
  const { value, toggle, setTrue, setFalse } = useBooleanToggle(valueRef)

  const isVisble = computed<boolean>(() => value.value)

  return { value, isVisble, open: setTrue, close: setFalse, show: setTrue, hide: setFalse, toggle }
}

