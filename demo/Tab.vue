<template>
  <div class="container">
    <p-tabs v-model="selectedTab" :tabs="['Logs', 'Task Runs', 'Sub Flow Runs']">
      <template #tab-heading-0="{ tab }">
        <p-icon icon="Prefect" class="mr-2 w-4 h-4" />
        <span>{{ tab }}</span>
      </template>

      <template #tab-heading-1="{ tab }">
        <p-icon icon="Prefect" class="mr-2 w-4 h-4" />
        <span>{{ tab }}</span>
      </template>

      <template #tab-heading-2="{ tab }">
        <p-icon icon="Prefect" class="mr-2 w-4 h-4" />
        <span>{{ tab }}</span>
      </template>
    </p-tabs>
  </div>
  Selected tab index: {{ selectedTab }}
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import PTabs from '@/components/Tabs/PTabs.vue'

  const selectedTab = ref()
</script>

<style>
.container {
  width: 80%;
}
</style>
