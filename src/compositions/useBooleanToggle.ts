import { Ref } from 'vue'

type UseBooleanToggle = {
  toggle: () => void,
}

export function useBooleanToggle(value: Ref<boolean>): UseBooleanToggle {
  const toggle = (): void => {
    value.value = !value.value
  }

  return { toggle }
}

