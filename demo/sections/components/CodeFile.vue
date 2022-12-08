<template>
  <component-page title="CodeFile" :demos="[{ title: 'CodeFile' }]">
    <template #description>
      This component <p-code>p-code-file</p-code> takes in two props, an optional <p-code>file-name</p-code>, and a single <p-code>code</p-code> prop.
      <br>
      The <p-code>code</p-code> prop will take in character formatters such as <p-code>\n</p-code> to create new lines and <p-code>\t</p-code> to create tabs.
      <br>
      It copies the code as formatted.
    </template>

    <template #code-file>
      <p-code-file file-name="basic_file.py" :code="code" />
    </template>
  </component-page>
</template>

<script lang="ts" setup>
  import { PCodeFile } from '@/components'
  import ComponentPage from '@/demo/components/ComponentPage.vue'

  const code = 'from prefect import flow\n\n@flow\n\tdef hello_flow():\n\t\tprint(\'hello\')\n\nif __name__ == "__main__":\n\thello_flow()'
</script>