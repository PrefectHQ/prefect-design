<template>
  <ComponentPage title="Divider" :demos="[{ title: 'Divider' }, { title: 'With Slot' }]">
    <template #divider>
      <span>above</span>
      <p-divider />
      <span>below</span>
    </template>

    <template #with-slot>
      <p-divider><span class="text-xl text-subdued">§</span></p-divider>
    </template>
  </ComponentPage>
</template>

<script lang="ts" setup>
  import ComponentPage from '@/demo/components/ComponentPage.vue'
</script>