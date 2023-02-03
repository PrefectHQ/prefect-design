<template>
  <component :is="renderRoot" />
</template>

<script lang="ts" setup>
  import { marked } from 'marked'
  import { computed, ref, watch } from 'vue'
  import { getRootVNode } from '@/components/MarkdownRenderer/parser'
  import MarkdownTokenWorker from '@/components/MarkdownRenderer/worker?worker&inline'
  import type { FormattedMessagePayload } from '@/types/markdownRenderer'

  const props = defineProps<{
    text?: string,
  }>()

  const tokens = ref<marked.TokensList | []>([])

  const renderRoot = computed(() => {
    return getRootVNode(tokens.value)
  })

  const handleWorkerMessage = (message: FormattedMessagePayload): void => {
    tokens.value = message.tokens
  }

  const worker: Worker = new MarkdownTokenWorker()

  worker.onmessage = (event: MessageEvent<FormattedMessagePayload>) => handleWorkerMessage(event.data)

  watch(() => [props.text], ([text]) => {
    if (text) {
      worker.postMessage({ text })
    }
  }, { immediate: true })
</script>

<style>
.markdown-renderer { @apply
  text-base
  block
  relative
  overflow-auto
}

.markdown-renderer > * { @apply
  mb-4
}

.markdown-renderer__html { @apply
  block
}

.markdown-renderer__html img { @apply
  inline
  max-w-full
}

.markdown-view__html,
.markdown-view__token { @apply
  mb-4
}

.markdown-renderer__code { @apply
  p-4
  max-w-full
  overflow-auto
}
</style>