<template>
  <ComponentPage
    title="CodeInput"
    :demos="[
      { title: 'Unstyled' },
      { title: 'Markdown' },
      { title: 'Python' },
      { title: 'Vue' },
      { title: 'JavaScript' },
      { title: 'HTML' },
      { title: 'CSS' },
    ]"
  >
    <template #description>
      <p-code>PCodeInput</p-code> is a wrapper around <p-code>PCode</p-code> and <p-code>PCodeHighlight</p-code> that allows input.

      <div>
        <p-checkbox v-model="showLineNumbers" label="Show line numbers" />
      </div>
    </template>

    <template #unstyled>
      <PCodeInput v-model="unstyledInput" />
    </template>
  </ComponentPage>
</template>

<script lang="ts" setup>
  import { PCode } from '@/components'
  import PCodeInput from '@/components/CodeInput/PCodeInput.vue'
  import { ref } from 'vue'
  import ComponentPage from '@/demo/components/ComponentPage.vue'

  const showLineNumbers = ref(true)

  const unstyledInput = ref('')
</script>