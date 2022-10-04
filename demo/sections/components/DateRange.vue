<template>
  <ComponentPage title="Date Range" :demos="[{ title: 'Date Range' }]">
    <template #description>
      This is where we add a short description of <p-code>p-date-range</p-code>. Describe the components intent, not hyper specific documentation that belongs on vitepress page.
    </template>

    <template #date-range>
      <div class="date-range__demo">
        <p-date-range v-model:startDate="value.start" v-model:endDate="value.end" clearable />

        <p-code>start:{{ JSON.stringify(value.start) }}</p-code>
        <p-code>end:{{ JSON.stringify(value.end) }}</p-code>
      </div>
    </template>
  </ComponentPage>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import ComponentPage from '@/demo/components/ComponentPage.vue'

  const value = ref({
    start: null,
    end: null,
  })
</script>

<style>
.date-range__demo { @apply
  flex
  flex-col
  gap-4
  h-96
}
</style>