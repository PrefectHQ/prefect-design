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
      <p-tabs :tabs="['Demo', 'Code']">
        <template #demo>
          <PCodeHighlight :text="content" lang="vue" />
        </template>
        <template #code>
          <PCodeHighlight :text="rawContent" lang="vue" />
        </template>
      </p-tabs>
    </template>
  </ComponentPage>
</template>

<script lang="ts" setup>
  import { PCode } from '@/components'
  import PCodeHighlight from '@/components/CodeHighlight/PCodeHighlight.vue'
  import { ref } from 'vue'
  import ComponentPage from '@/demo/components/ComponentPage.vue'

  const content = ref('import { PCode } from \'@/components\'')

  const rawContent = ref(`<PCodeHighlight :text="${content.value}" lang="vue" />`)
</script>