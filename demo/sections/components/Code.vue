<template>
  <ComponentPage
    title="Code"
    :demos="[
      { title: 'Inline' },
      { title: 'Multiline' },
    ]"
  >
    <template #description>
      This is where we add a short description of <p-code>p-code</p-code>. Describe the components intent, not hyper specific documentation that belongs on vitepress page.
    </template>

    <template #inline>
      This is an <p-code>inline</p-code> code block.
    </template>

    <template #multiline>
      <p-code multiline>
        {{ multilineContent }}
      </p-code>
    </template>
  </ComponentPage>
</template>

<script lang="ts" setup>
  import { PCode } from '@/components'
  import ComponentPage from '@/demo/components/ComponentPage.vue'

  const multilineContent = `import { createApp } from 'vue'

createApp({
  data() {
    return {
      count: 0
    }
  }
}).mount('#app')`
</script>

<style>
.code-row {
  @apply flex w-full;
}

.code-row__leading {
  @apply select-none
  w-[75px]
}

.code-row__content {
  @apply flex-grow select-auto whitespace-pre-wrap;
}
</style>