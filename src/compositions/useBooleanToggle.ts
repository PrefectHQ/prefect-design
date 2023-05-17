import { ref, Ref } from 'vue'

type UseBooleanToggle = {
  value: Ref<boolean>,
  toggle: () => void,
  setTrue: () => void,
  setFalse: () => void,
}

export function useBooleanToggle(valueRef?: Ref<boolean>): UseBooleanToggle {
  const value = ref(valueRef ?? false)

  const toggle = (): void => {
    value.value = !value.value
  }

  const setTrue = (): void => {
    value.value = true
  }

  const setFalse = (): void => {
    value.value = false
  }

  return { value, toggle, setTrue, setFalse }
}

