<template>
  <ComponentPage
    title="Code"
    :demos="[
      { title: 'Inline' },
      { title: 'Multiline' },
    ]"
  >
    <template #description>
      <p-code>PCodeHighlight</p-code> is a wrapper around <p-code>PCode</p-code> that adds syntax highlighting via <p-link href="https://github.com/highlightjs/highlight.js">
        highlight.js
      </p-link>.
    </template>

    <template #inline>
      <PCodeHighlight :content="content">
        {{ content }}
      </PCodeHighlight>
    </template>
  </ComponentPage>
</template>

<script lang="ts" setup>
  import { PCode } from '@/components'
  import PCodeHighlight from '@/components/CodeHighlight/PCodeHighlight.vue'
  import ComponentPage from '@/demo/components/ComponentPage.vue'

  const content = `import { createApp } from 'vue'

createApp({
  data() {
    return {
      count: 0
    }
  }
}).mount('#app')`
</script>