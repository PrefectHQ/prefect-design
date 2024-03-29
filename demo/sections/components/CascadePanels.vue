<template>
  <ComponentPage title="Cascade Panels" :demos="demos">
    <template #description>
      This is where we add a short description of <p-code inline>
        p-cascade-panels
      </p-code>. Describe the components intent, not hyper specific documentation that belongs on vitepress page.
    </template>

    <template #basic>
      <BasicDemo />
    </template>

    <template #advanced>
      <AdvancedDemo />
    </template>
  </ComponentPage>
</template>

<script lang="ts" setup>
  import AdvancedDemo from '@/demo/components/cascade/AdvancedDemo.vue'
  import BasicDemo from '@/demo/components/cascade/BasicDemo.vue'
  import ComponentPage from '@/demo/components/ComponentPage.vue'

  const demos = [
    { title: 'Basic' },
    { title: 'Advanced' },
  ]
</script>