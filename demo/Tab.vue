<template>
  <div class="container">
    <p-tabs v-model="tab">
      <p-tab>
        <p-icon icon="Prefect" class="-ml-0.5 mr-2 h-5 w-5" />
        Hello
      </p-tab>

      <p-tab>
        <p-icon icon="Prefect" class="-ml-0.5 mr-2 h-5 w-5" />
        Hola
      </p-tab>
    </p-tabs>
    {{ tab }}
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import { PTab } from '@/components/Tab'
  const tab = ref()
</script>

<style>
.container {
  max-width: 40%;
}
</style>