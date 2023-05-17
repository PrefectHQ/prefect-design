import { Ref } from 'vue'

type UseBooleanToggle = {
  toggle: () => void,
  setTrue: () => void,
  setFalse: () => void,
}

export function useBooleanToggle(value: Ref<boolean>): UseBooleanToggle {
  const toggle = (): void => {
    value.value = !value.value
  }

  const setTrue = (): void => {
    value.value = true
  }

  const setFalse = (): void => {
    value.value = false
  }

  return { toggle, setTrue, setFalse }
}

