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
  import 'highlight.js/styles/github-dark.css'

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