<template>
  <ComponentPage
    title="Links"
    :demos="[
      { title: 'Local' },
      { title: 'External' },
      { title: 'Absolute' },
      { title: 'Route' },
    ]"
  >
    <template #local>
      <p-link to="/icons">
        Link to Icons page
      </p-link>
    </template>

    <template #external>
      <p-link to="https://prefect.io">
        Link to prefect.io
      </p-link>
    </template>

    <template #absolute>
      <p-link :to="absolute">
        {{ absolute }}
      </p-link>
    </template>

    <template #route>
      <p-link :to="{ name: 'home' }">
        home
      </p-link>
    </template>
  </ComponentPage>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import ComponentPage from '@/demo/components/ComponentPage.vue'

  const absolute = computed(() => `${window.location.protocol}//${window.location.host}/components/links`)
</script>