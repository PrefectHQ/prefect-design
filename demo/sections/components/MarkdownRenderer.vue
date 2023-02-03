<template>
  <ComponentPage title="Markdown Renderer" :demos="[{ title: 'Markdown Renderer' }]">
    <template #description>
      <p-code inline>
        p-markdown-renderer
      </p-code> is a component that renders a Vue component tree from markdown.
    </template>

    <p-label class="markdown-renderer__select" label="README.md">
      <p-select v-model="selectedMarkdown" :options="options" />
    </p-label>

    <p-tabs v-model:selected="tab" :tabs="['Parsed', 'Raw']">
      <template #parsed>
        <div>
          <PMarkdownRenderer :text="markdownRef" />
        </div>
      </template>

      <template #raw>
        <PCodeHighlight :text="markdownRef" class="markdown-renderer__raw " show-line-numbers lang="markdown" />
      </template>
    </p-tabs>
  </ComponentPage>
</template>

<script lang="ts" setup>
  import { PTabs } from '@/components'
  import PCodeHighlight from '@/components/CodeHighlight/PCodeHighlight.vue'
  import PMarkdownRenderer from '@/components/MarkdownRenderer/PMarkdownRenderer.vue'
  import { SelectOptionNormalized } from '@/types/selectOption'
  import { ref, watch } from 'vue'
  import ComponentPage from '@/demo/components/ComponentPage.vue'

  const options: (SelectOptionNormalized & { url: string })[] = [
    { label: 'Prefect', value: 'prefect', url: 'https://raw.githubusercontent.com/PrefectHQ/prefect/main/README.md' },
    { label: 'Orion Design', value: 'orion-design', url: 'https://raw.githubusercontent.com/PrefectHQ/orion-design/main/README.md' },
    { label: 'Vue Compositions', value: 'vue-compositions', url: 'https://raw.githubusercontent.com/PrefectHQ/vue-compositions/main/README.md' },
    { label: 'Fiber', value: 'fiber', url: 'https://raw.githubusercontent.com/gofiber/fiber/master/.github/README.md' },
  ]
  const selectedMarkdown = ref('prefect')
  const tab = ref('Parsed')
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

<style>
.markdown-renderer__select { @apply
  mb-4
  max-w-sm
  ml-auto
}

.markdown-renderer__raw { @apply
  overflow-auto
  max-w-full
  max-h-96
  w-full
}
</style>