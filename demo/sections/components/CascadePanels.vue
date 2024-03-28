<template>
  <ComponentPage title="Cascade Panels" :demos="[{ title: 'Cascade Panels' }]">
    <template #description>
      This is where we add a short description of <p-code inline>
        p-cascade-panels
      </p-code>. Describe the components intent, not hyper specific documentation that belongs on vitepress page.
    </template>

    <template #cascade-panels>
      hello
    </template>
  </ComponentPage>
</template>

<script lang="ts" setup>
  import ComponentPage from '@/demo/components/ComponentPage.vue'
</script>