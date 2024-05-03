<template>
  <ComponentPage title="Card" :demos="[{ title: 'Basic Card' }, { title: 'Nested Card' }, { title: 'Ghost Card' }, { title: 'Card' }]">
    <template #basic-card>
      <p-card>
        <h1>This is a Card component</h1>
      </p-card>
    </template>
    <template #nested-card>
      <p-card>
        <h1>This is a Card component</h1>
        <p-card class="m-4">
          <h1>This is a Second Level Card component</h1>
          <p-card class="m-4">
            <h1>This is a Third Level Card component</h1>
          </p-card>
        </p-card>
      </p-card>
    </template>
    <template #ghost-card>
      <p-card :flat="flat" variant="ghost">
        <h1>This is a Card component</h1>
      </p-card>
    </template>
    <template #card>
      <p-card>
        <template #title>
          Title
        </template>
        <template #description>
          Description
        </template>
        <p>This is the content of the card</p>
        <template #footer>
          Footer
        </template>
      </p-card>
    </template>
  </ComponentPage>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import ComponentPage from '@/demo/components/ComponentPage.vue'

  const flat = ref(false)
</script>