<template>
  <ComponentPage title="Card" :demos="[{ title: 'Card' }]">
    <template #description>
      This is where we add a short description of <p-code>p-card</p-code>. Describe the components intent, not hyper specific documentation that belongs on vitepress page.
    </template>

    <template #card>
      <p-card>
        <h1>This is a Card component</h1>
      </p-card>
    </template>
  </ComponentPage>
</template>

<script lang="ts" setup>
  import ComponentPage from '../../components/ComponentPage.vue'
</script>