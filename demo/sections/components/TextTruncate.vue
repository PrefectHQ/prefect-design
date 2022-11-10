<template>
  <ComponentPage title="Text Truncate" :demos="[{ title: 'Text Truncate' }]">
    <template #description>
      This is where we add a short description of <p-code>p-text-truncate</p-code>. Describe the components intent, not hyper specific documentation that belongs on vitepress page.
    </template>

    <template #text-area>
      <p-text-truncate :text="exampleText" />
    </template>
  </ComponentPage>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import ComponentPage from '@/demo/components/ComponentPage.vue'

  const exampleText = ref('')
</script>