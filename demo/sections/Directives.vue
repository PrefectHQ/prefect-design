<template>
  <ComponentPage
    title="Custom Directives"
    :demos="[{ title: 'v-premoji', description: 'This custom directive scans provided text for premoji pattern (:word:), and turns it into premoji' }]"
  >
    <template #description>
      This is a library of custom directives
    </template>

    <template #v-premoji>
      <span v-premoji>:google:-random-words:abc123: :github::google-logo::gh:</span>
    </template>
  </ComponentPage>
</template>

<script lang="ts" setup>
  import ComponentPage from '@/demo/components/ComponentPage.vue'
</script>