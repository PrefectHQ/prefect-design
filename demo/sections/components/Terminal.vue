<template>
  <ComponentPage title="Terminal" :demos="[{ title: 'Terminal' }, { title: 'In a card' }]">
    <template #terminal>
      <p-terminal command="perfect config set PREFECT_API_URL" />
    </template>

    <template #in-a-card>
      <p-card>
        <p-terminal command="perfect config set PREFECT_API_URL" />
      </p-card>
    </template>
  </ComponentPage>
</template>

<script lang="ts" setup>
  import ComponentPage from '@/demo/components/ComponentPage.vue'
</script>