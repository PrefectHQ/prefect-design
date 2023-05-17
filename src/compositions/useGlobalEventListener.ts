import { onMounted, onUnmounted } from 'vue'

type UseGlobalEventListener = {
  add: () => void,
  remove: () => void,
}

export function useGlobalEventListener<K extends keyof DocumentEventMap>(
  type: K,
  callback: (this: Document, event: DocumentEventMap[K]) => unknown,
  options?: boolean | AddEventListenerOptions,
): UseGlobalEventListener {

  const add = (): void => {
    document.addEventListener(type, callback, options)
  }

  const remove = (): void => {
    document.removeEventListener(type, callback, options)
  }

  onMounted(add)
  onUnmounted(remove)

  return { add, remove }
}

