<template>
  <ComponentPage title="Calendar" :demos="[{ title: 'Calendar' }]">
    <template #calendar>
      <p-content>
        <p-calendar v-model="value" />

        <p-code inline>
          Value :{{ JSON.stringify(value) }}
        </p-code>
      </p-content>
    </template>
  </ComponentPage>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import ComponentPage from '@/demo/components/ComponentPage.vue'

  const value = ref()
</script>