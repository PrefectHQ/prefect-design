<template>
  <component :is="renderRoot" />
</template>

<script lang="ts" setup>
  import { marked } from 'marked'
  import { computed, ref, watch } from 'vue'
  import { getRootVNode } from '@/components/MarkdownRenderer/parser'
  import MarkdownTokenWorker from '@/components/MarkdownRenderer/worker?worker&inline'
  import type { ParseMessagePayload } from '@/types/markdownRenderer'

  const props = defineProps<{
    text: string,
    linkBaseUrl?: string,
  }>()

  const tokens = ref<marked.TokensList | []>([])

  const renderRoot = computed(() => {
    return getRootVNode(tokens.value, { baseLinkUrl: props.linkBaseUrl })
  })

  const handleWorkerMessage = (message: ParseMessagePayload): void => {
    tokens.value = message.tokens
  }

  const worker = new MarkdownTokenWorker()

  worker.onmessage = (event: MessageEvent<ParseMessagePayload>) => handleWorkerMessage(event.data)

  watch(() => props.text, (text) => {
    if (text) {
      worker.postMessage({ text })
    }
  }, { immediate: true })
</script>

<style>
.markdown-renderer { @apply
  text-base
  block
  overflow-auto
}

.markdown-renderer__html img { @apply
  inline
  max-w-full
}

.markdown-renderer__html a[href] { @apply
  text-link
}

.markdown-renderer__image { @apply
  max-w-full
  rounded-default
  shadow-sm
}

.markdown-renderer__blockquote .markdown-renderer__code,
.markdown-renderer__blockquote .markdown-renderer__table,
.markdown-renderer__blockquote .markdown-renderer__codespan { @apply
  font-normal
  text-base
  not-italic
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

.markdown-renderer__table::-webkit-scrollbar {
  display: none;
}

.markdown-renderer__table {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.markdown-renderer__table { @apply
  m-2
  max-h-screen
  !overflow-auto
  overscroll-auto
  max-w-min
}

.markdown-renderer__table .p-table-data img { @apply
  max-w-none
}

.markdown-renderer__table .p-table-head { @apply
  sticky
  top-0
  z-[1]
  shadow
}

.markdown-renderer__table-column--center { @apply
  text-center
}

.markdown-renderer__table-column--left { @apply
  text-left
}

.markdown-renderer__table-column--right { @apply
  text-right
}

.markdown-renderer__text--paragraph:not(:first-child):not(:last-child) { @apply
  my-2
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
  border-divider
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
  my-1
}

.markdown-renderer__divider { @apply
  h-1
  my-2
}

.markdown-renderer__heading:not(:first-child) { @apply
  mt-2
}

.markdown-renderer__heading:not(:last-child) { @apply
  mb-2
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