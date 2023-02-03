<template>
  <ComponentPage title="Markdown Renderer" :demos="[{ title: 'Markdown Renderer' }]">
    <template #description>
      <p-code inline>
        p-markdown-renderer
      </p-code> is a component that renders markdown text into a Vue component tree.
    </template>

    <p-tabs v-model:selected="tab" :tabs="['Parsed', 'Raw']">
      <template #parsed>
        <div>
          <PMarkdownRenderer :text="markdownRef" />
        </div>
      </template>

      <template #raw>
        <div>
          {{ markdownRef }}
        </div>
      </template>
    </p-tabs>
  </ComponentPage>
</template>

<script lang="ts" setup>
  import { PTabs } from '@/components'
  import PMarkdownRenderer from '@/components/MarkdownRenderer/PMarkdownRenderer.vue'
  import { SelectOptionNormalized } from '@/types/selectOption'
  import { ref, watch } from 'vue'
  import ComponentPage from '@/demo/components/ComponentPage.vue'

  const options: (SelectOptionNormalized & { url: string })[] = [
    { label: 'Prefect', value: 'prefect', url: 'https://raw.githubusercontent.com/PrefectHQ/prefect/main/README.md' },
    { label: 'Fiber', value: 'fiber', url: 'https://raw.githubusercontent.com/gofiber/fiber/master/.github/README.md' },
  ]
  const selectedMarkdown = ref('fiber')
  const tab = ref('Raw')
  const markdownRef = ref('')
  const getMarkdown = async (): Promise<void> => {
    const url = options.find(option => option.value == selectedMarkdown.value)?.url
    if (!url) {
      return
    }
    markdownRef.value = await fetch(url).then(res => res.text())
  }
  watch(selectedMarkdown, getMarkdown, { immediate: true })
</script>