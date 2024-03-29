<template>
  <ComponentPage title="Cascade Panels" :demos="demos">
    <template #description>
      <p-code inline>
        p-cascade-panels
      </p-code> is a component that manages a collection of <p-code inline>
        p-cascade-panel
      </p-code> components; they operate similarly to the <p-code inline>
        p-wizard
      </p-code> component. Both components are relatively straightforward, but they can be used to create complex cascading menus; most of the magic happens in the `useCascadePanels` and `useCascadePanel` compositions.
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