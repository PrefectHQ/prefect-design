<template>
  <ComponentPage title="Markdown Renderer" :demos="[{ title: 'Markdown Renderer' }]">
    <template #description>
      <p-code inline>p-markdown-renderer</p-code> is a component that renders markdown text into a Vue component tree.
    </template>

    <template #markdown-renderer>
      <PMarkdownRenderer text="## Hello World" />
    </template>
  </ComponentPage>
</template>

<script lang="ts" setup>
  import ComponentPage from '@/demo/components/ComponentPage.vue'
  import PMarkdownRenderer from '@/components/MarkdownRenderer/PMarkdownRenderer.vue'
</script>