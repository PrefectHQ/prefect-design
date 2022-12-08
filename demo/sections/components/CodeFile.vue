<template>
  <component-page title="CodeFile" :demos="[{ title: 'CodeFile' }]">
    <template #description>
      This is where we add a short description of <p-code>p-terminal</p-code>. Describe the components intent, not hyper specific documentation that belongs on vitepress page.
    </template>

    <template #code-file>
      <p-code-file file-name="basic_file.py" :command="command" />
    </template>
  </component-page>
</template>

<script lang="ts" setup>
  import { PCodeFile } from '@/components'
  import ComponentPage from '@/demo/components/ComponentPage.vue'

  const command = 'perfect config set PREFECT_API_URL\n\ttest'
</script>