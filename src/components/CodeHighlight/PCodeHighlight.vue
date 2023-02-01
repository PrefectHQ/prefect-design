<template>
  <PCode class="p-code-highlight">
    <PUnwrap :html="formattedText" />
  </PCode>
</template>

<script lang="ts">
  export default {
    name: 'PCodeHighlight',
    expose: [],
    components: { PCode },
  }
</script>

<script lang="ts" setup>
  import { onMounted, ref } from 'vue'
  import { PCode, PUnwrap } from '@/components'
  import type { FormattedMessagePayload, SupportedLanguage } from '@/components/CodeHighlight/types'
  import HighlightWorker from '@/components/CodeHighlight/worker?worker&inline'

  const props = defineProps<{
    text: string,
    lang: SupportedLanguage,
  }>()

  const worker: Worker = new HighlightWorker()
  const loading = ref(true)
  const formattedText = ref('')

  const handleWorkerMessage = (message: FormattedMessagePayload): void => {
    formattedText.value = message.formatted
    loading.value = false
  }

  worker.onmessage = (event: MessageEvent<FormattedMessagePayload>) => handleWorkerMessage(event.data)

  onMounted(() => {
    const { text, lang } = props
    worker.postMessage({ text, lang })
  })
</script>

<style>
/* TODO: It'd be great to move each of these to CSS variables that could be themed more easily */
.p-code-highlight .hljs { @apply
  text-slate-50
}

/* Comment */
.p-code-highlight .hljs-comment { @apply
  text-slate-400
}

/* Quote */
.p-code-highlight .hljs-quote { @apply
  text-slate-100
  italic
}

/* Red */
.p-code-highlight .hljs-variable,
.p-code-highlight .hljs-template-variable,
.p-code-highlight .hljs-tag,
.p-code-highlight .hljs-name,
.p-code-highlight .hljs-selector-id,
.p-code-highlight .hljs-selector-class,
.p-code-highlight .hljs-regexp,
.p-code-highlight .hljs-deletion { @apply
  text-rose-400
}

/* Orange */
.p-code-highlight .hljs-number,
.p-code-highlight .hljs-built_in,
.p-code-highlight .hljs-literal,
.p-code-highlight .hljs-type,
.p-code-highlight .hljs-params,
.p-code-highlight .hljs-meta,
.p-code-highlight .hljs-link { @apply
  text-orange-400
}

/* Yellow */
.p-code-highlight .hljs-attr,
.p-code-highlight .hljs-attribute { @apply
  text-amber-400
}

/* Green */
.p-code-highlight .hljs-string,
.p-code-highlight .hljs-symbol,
.p-code-highlight .hljs-bullet,
.p-code-highlight .hljs-addition { @apply
  text-emerald-400
}

/* Blue */
.p-code-highlight .hljs-title,
.p-code-highlight .hljs-section { @apply
  text-sky-400
}

/* Purple */
.p-code-highlight .hljs-keyword,
.p-code-highlight .hljs-selector-tag { @apply
  text-fuchsia-400
}

.p-code-highlight .hljs-code { @apply
  font-mono
}

.p-code-highlight .hljs-strikethrough { @apply
  line-through
}

.p-code-highlight .hljs-emphasis { @apply
  italic
}

.p-code-highlight .hljs-strong { @apply
  font-bold
}

@media screen and (-ms-high-contrast: active) {
  .p-code-highlight .hljs-addition,
  .p-code-highlight .hljs-attr,
  .p-code-highlight .hljs-built_in,
  .p-code-highlight .hljs-bullet,
  .p-code-highlight .hljs-comment,
  .p-code-highlight .hljs-link,
  .p-code-highlight .hljs-literal,
  .p-code-highlight .hljs-meta,
  .p-code-highlight .hljs-number,
  .p-code-highlight .hljs-params,
  .p-code-highlight .hljs-string,
  .p-code-highlight .hljs-symbol,
  .p-code-highlight .hljs-type,
  .p-code-highlight .hljs-quote {
    color: highlight;
  }

  .p-code-highlight .hljs-keyword,
  .p-code-highlight .hljs-selector-tag { @apply
    font-medium
  }
}
</style>