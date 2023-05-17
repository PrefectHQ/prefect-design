import { onMounted, onUnmounted } from 'vue'

type UseGlobalEventListener = {
  remove: () => void,
}

export function useGlobalEventListener<K extends keyof DocumentEventMap>(
  type: K,
  callback: (this: Document, event: DocumentEventMap[K]) => unknown,
  options?: boolean | AddEventListenerOptions,
): UseGlobalEventListener {

  const remove = (): void => {
    document.removeEventListener(type, callback, options)
  }

  onMounted(() => document.addEventListener(type, callback, options))
  onUnmounted(remove)

  return { remove }
}

