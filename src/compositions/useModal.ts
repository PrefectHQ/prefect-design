import { computed, Ref } from 'vue'
import { useBooleanToggle } from '@/compositions/useBooleanToggle'

type UseDrawer = {
  isVisble: Ref<boolean>,
  open: () => void,
  close: () => void,
  show: () => void,
  hide: () => void,
  toggle: () => void,
}

export function useModal(value: Ref<boolean>): UseDrawer {
  const { toggle } = useBooleanToggle(value)

  const isVisble = computed<boolean>(() => value.value)

  const show = (): void => {
    value.value = true
  }

  const hide = (): void => {
    value.value = false
  }

  return { isVisble, open: show, close: hide, show, hide, toggle }
}

