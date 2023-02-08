<template>
  <component :is="renderRoot" />
</template>

<script lang="ts" setup>
  import { marked } from 'marked'
  import { computed, ref, watch } from 'vue'
  import { getRootVNode } from '@/components/MarkdownRenderer/parser'
  import MarkdownTokenWorker from '@/components/MarkdownRenderer/worker?worker&inline'
  import type { MarkdownMessagePayload, ParseMessagePayload } from '@/types/markdownRenderer'

  const props = defineProps<{
    text: string,
    linkBaseUrl?: string,
  }>()

  const tokens = ref<marked.TokensList | []>([])

  const renderRoot = computed(() => {
    return getRootVNode(tokens.value, { baseLinkUrl: props.linkBaseUrl })
  })

  const handleWorkerMessage = (message: ParseMessagePayload): void => {
    console.log('message', message)
    tokens.value = message.tokens
  }

  const worker: Worker = new MarkdownTokenWorker()

  worker.onmessage = (event: MessageEvent<ParseMessagePayload>) => handleWorkerMessage(event.data)

  watch(() => [props.text], ([text]) => {
    if (text) {
      const message: MarkdownMessagePayload = { text }
      worker.postMessage(message)
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

.markdown-renderer__html img { @apply
  inline
  max-w-full
}

.markdown-renderer__html a[href] { @apply
  text-primary-500
  hover:text-primary-600
}

.markdown-renderer__image { @apply
  h-auto
  max-w-full
  rounded
  shadow-sm
}

.markdown-renderer__code { @apply
  p-4
  max-w-full
  overflow-auto
}

.markdown-renderer__text--del,
.markdown-renderer__text--strong,
.markdown-renderer__text--em { @apply
  inline
}

.markdown-renderer__text--del { @apply
  line-through
}

.markdown-renderer__text--strong { @apply
  font-semibold
}

.markdown-renderer__blockquote { @apply
  italic
  border-l-4
  border-background-600
  pl-4
  ml-2
}

.markdown-renderer__text--em { @apply
  italic
}

.markdown-renderer__heading { @apply
  font-semibold
}

.markdown-renderer__space { @apply
  h-1
  mb-0.5
}

.markdown-renderer__divider { @apply
  h-1
}

.markdown-renderer__heading--h1,
.markdown-renderer__heading--h2 { @apply
  font-bold
}

.markdown-renderer__list--ordered { @apply
  list-decimal
}

.markdown-renderer__list--unordered { @apply
  list-disc
  list-outside
}

.markdown-renderer__list-item { @apply
  ml-4
  mb-1
  list-item
}
</style>