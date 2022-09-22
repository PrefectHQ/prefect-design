<template>
  <ComponentPage title="Premojis" :demos="[{ title: 'Premojis' }]">
    <template #premojis>
      <span v-premoji>:google:-random-words:abc123: :github::google-logo::gh:</span>
    </template>
  </ComponentPage>
</template>

<script lang="ts" setup>
  import ComponentPage from '@/demo/components/ComponentPage.vue'
</script>