<template>
  <PCode class="p-code-highlight">
    <slot />
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
  import PCode from '@/components/Code/PCode.vue'
  import type { FormattedMessagePayload } from '@/components/CodeHighlight/worker'
  import HighlightWorker from '@/components/CodeHighlight/worker?worker&inline'

  const props = defineProps<{
    content: string,
  }>()

  const worker = new HighlightWorker()
  const loading = ref(true)
  const formattedText = ref()

  const handleWorkerMessage = (message: FormattedMessagePayload): void => {
    formattedText.value = message.text
    loading.value = false
  }

  worker.onmessage = (event: MessageEvent<FormattedMessagePayload>) => handleWorkerMessage(event.data)

  onMounted(() => {
    worker.postMessage({ text: props.content })
  })
</script>

<style>
.p-code-highlight { @apply
  bg-fuchsia-600
}
</style>