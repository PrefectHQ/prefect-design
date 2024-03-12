import { marked } from 'marked'
import { computed, getCurrentScope, MaybeRefOrGetter, onUnmounted, Ref, ref, toRef, toValue, watch, watchEffect } from 'vue'
import MarkdownTokenWorker from '@/components/MarkdownRenderer/worker?worker&inline'
import { ParseMessagePayload } from '@/types/markdownRenderer'
import { randomId } from '@/utilities'

export type Tokens = marked.TokensList | []
export type MarkdownRendererCallback = (tokens: Tokens) => void
export type UseMarkdownRenderer = {
  tokens: Ref<Tokens>,
}

const callbacks = new Map<string, MarkdownRendererCallback>()
const worker = new MarkdownTokenWorker()

worker.onmessage = (message: MessageEvent<ParseMessagePayload>) => {
  const { id, tokens } = message.data
  const callback = callbacks.get(id)

  if (callback) {
    callback(tokens)
  }
}

export function useMarkdownRenderer(text: MaybeRefOrGetter): UseMarkdownRenderer {
  const id = randomId()
  const tokensRef = ref<Tokens>([])

  const rendererCallback = (tokens: Tokens): void => {
    tokensRef.value = tokens
  }

  callbacks.set(id, rendererCallback)
  watchEffect(() => worker.postMessage({ id, text: toValue(text) }))

  if (getCurrentScope()) {
    onUnmounted(() => {
      callbacks.delete(id)
    })
  }

  return { tokens: tokensRef }
}