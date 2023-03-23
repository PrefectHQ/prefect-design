<template>
  <ComponentPage title="Card" :demos="[{ title: 'Card' }]">
    <template #description>
      A basic card, one of the most common UI components.

      <div>
        <p-checkbox v-model="flat" label="Flat" />
      </div>
    </template>

    <template #card>
      <p-card :flat="flat">
        <h1>This is a Card component</h1>
      </p-card>
    </template>
  </ComponentPage>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import ComponentPage from '@/demo/components/ComponentPage.vue'

  const flat = ref(false)
</script>