import { computed, ref, Ref } from 'vue'

type UseShow = {
  show: Ref<boolean>,
  isOpen: Ref<boolean>,
  open: () => void,
  close: () => void,
  toggle: () => void,
}

export function useShow(): UseShow {
  const show = ref(false)

  const isOpen = computed(() => show.value)

  function open(): void {
    show.value = true
  }

  function close(): void {
    show.value = false
  }

  function toggle(): void {
    show.value = !show.value
  }

  return { isOpen, show, open, close, toggle }
}