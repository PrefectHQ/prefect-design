<template>
  <PCode class="p-code-highlight">
    <template v-if="loading">
      <PLoadingIcon class="p-code-highlight__loading-icon" />
    </template>
    <template v-else>
      <!-- eslint-disable-next-line vue/no-v-html -->
      <PUnwrap :html="formattedText" />
    </template>
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
  import { PCode, PLoadingIcon, PUnwrap } from '@/components'
  import type { FormattedMessagePayload } from '@/components/CodeHighlight/types'
  import HighlightWorker from '@/components/CodeHighlight/worker?worker&inline'

  const props = defineProps<{
    text: string,
    lang: string,
  }>()

  const worker: Worker = new HighlightWorker()
  const loading = ref(true)
  const formattedText = ref()

  const handleWorkerMessage = (message: FormattedMessagePayload): void => {
    formattedText.value = message
    loading.value = false
  }

  worker.onmessage = (event: MessageEvent<FormattedMessagePayload>) => handleWorkerMessage(event.data)

  onMounted(() => {
    const { text, lang } = props
    worker.postMessage({ text, lang })
  })
</script>

<style>
.p-code-highlight__loading-icon { @apply
  top-1/2
  left-1/2
  -translate-x-1/2
  -translate-y-1/2
}
</style>