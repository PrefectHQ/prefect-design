<template>
  <ComponentPage title="Divider" :demos="[{ title: 'Divider' }]">
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