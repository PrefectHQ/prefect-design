<template>
  <ComponentPage title="Divider" :demos="[{ title: 'Divider' }]">
    <template #description>
      This is where we add a short description of <p-code>p-divider</p-code>. Describe the components intent, not hyper specific documentation that belongs on vitepress page.
    </template>

    <template #divider>
      <span>above</span>
      <p-divider />
      <span>below</span>
    </template>
  </ComponentPage>
</template>

<script lang="ts" setup>
  import ComponentPage from '@/demo/components/ComponentPage.vue'
</script>