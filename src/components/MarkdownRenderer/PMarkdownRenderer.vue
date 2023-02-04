<template>
  <component :is="renderRoot" />
</template>

<script lang="ts" setup>
  import { default as dompurify } from 'dompurify'
  import { marked } from 'marked'
  import { computed, ref, watch } from 'vue'
  import { getRootVNode } from '@/components/MarkdownRenderer/parser'
  import MarkdownTokenWorker from '@/components/MarkdownRenderer/worker?worker&inline'
  import type { FormattedMessagePayload } from '@/types/markdownRenderer'

  const props = defineProps<{
    text: string,
    linkBaseUrl?: string,
  }>()

  const tokens = ref<marked.TokensList | []>([])

  const renderRoot = computed(() => {
    return getRootVNode(tokens.value, { baseLinkUrl: props.linkBaseUrl })
  })

  const handleWorkerMessage = (message: FormattedMessagePayload): void => {
    tokens.value = message.tokens
  }

  const worker: Worker = new MarkdownTokenWorker()

  worker.onmessage = (event: MessageEvent<FormattedMessagePayload>) => handleWorkerMessage(event.data)


  const forbiddenAttrs = ['style']
  const useProfiles = { svg: true, html: true }

  watch(() => [props.text], ([text]) => {
    if (text) {
      text = dompurify.sanitize(text, {
        FORBID_ATTR: forbiddenAttrs,
        USE_PROFILES: useProfiles,
      })
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

.markdown-renderer__text--strong,
.markdown-renderer__text--em { @apply
  inline
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