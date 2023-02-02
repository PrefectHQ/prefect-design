<template>
  <ComponentPage title="Terminal" :demos="[{ title: 'Terminal' }]">
    <template #description>
      This is where we add a short description of <p-code inline>
        p-terminal
      </p-code>. Describe the components intent, not hyper specific documentation that belongs on vitepress page.
    </template>

    <template #terminal>
      <p-terminal command="perfect config set PREFECT_API_URL" />
    </template>
  </ComponentPage>
</template>

<script lang="ts" setup>
  import ComponentPage from '@/demo/components/ComponentPage.vue'
</script>