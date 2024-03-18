import { marked } from 'marked'
import { computed, MaybeRefOrGetter, onScopeDispose, Ref, ref, toValue, watchEffect } from 'vue'
import HighlightWorker from '@/components/CodeHighlight/worker?worker&inline'
import { FormattedMessagePayload, UnformattedMessagePayload } from '@/types/codeHighlight'
import { randomId } from '@/utilities'

export type Tokens = marked.TokensList | []
export type HighlightCallback = (payload: FormattedMessagePayload) => void
export type UseCodeHighlight = {
  formatted: Ref<string>,
  lines: Ref<number>,
  illegal: Ref<boolean>,
  relevance: Ref<number>,
}

const callbacks = new Map<string, HighlightCallback>()
const worker = new HighlightWorker()

worker.onmessage = (message: MessageEvent<FormattedMessagePayload>) => {
  const { id } = message.data
  const callback = callbacks.get(id)

  if (callback) {
    callback(message.data)
  }
}

export function useCodeHighlight(text: MaybeRefOrGetter, language: MaybeRefOrGetter): UseCodeHighlight {
  const id = randomId()
  const formatted = ref<string>('')
  const illegal = ref<boolean>(false)
  const relevance = ref<number>(0)
  const lines = computed(() => toValue(text).split('\n').length)

  const highlightCallback = (payload: FormattedMessagePayload): void => {
    formatted.value = payload.formatted
    illegal.value = payload.illegal
    relevance.value = payload.relevance
  }

  callbacks.set(id, highlightCallback)
  watchEffect(() => {
    const message: UnformattedMessagePayload = {
      id,
      text: toValue(text),
      lang: toValue(language),
    }

    worker.postMessage(message)
  })
  onScopeDispose(() => callbacks.delete(id))

  return { formatted, illegal, relevance, lines }
}