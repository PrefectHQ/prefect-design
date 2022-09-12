<template>
  <ComponentPage title="Premojis" :demos="[{ title: 'Premojis' }]">
    <template #premojis>
      <span v-html="convertToPremoji(':google:-random-words:abc123: :github:')" />
    </template>
  </ComponentPage>
</template>

<script lang="ts" setup>
  import { convertToPremoji } from '@/compositions'
  import ComponentPage from '@/demo/components/ComponentPage.vue'
</script>