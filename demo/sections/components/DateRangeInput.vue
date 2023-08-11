<template>
  <ComponentPage title="Date Range Input" :demos="[{ title: 'Date Range Input' }]">
    <template #date-range-input>
      <div class="date-range-input__demo">
        <p-date-range-input v-model:startDate="value.start" v-model:endDate="value.end" clearable />

        <p-code inline>
          start:{{ JSON.stringify(value.start) }}
        </p-code>
        <p-code inline>
          end:{{ JSON.stringify(value.end) }}
        </p-code>
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
.date-range-input__demo { @apply
  flex
  flex-col
  gap-4
  h-96
}
</style>