<template>
  <ComponentPage
    title="Links"
    :demos="[
      { title: 'Local' },
      { title: 'External' },
    ]"
  >
    <template #description>
      This is where we add a short description of <p-code inline>
        p-links
      </p-code>. Describe the components intent, not hyper specific documentation that belongs on vitepress page.
    </template>

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
  </ComponentPage>
</template>

<script lang="ts" setup>
  import ComponentPage from '@/demo/components/ComponentPage.vue'
</script>