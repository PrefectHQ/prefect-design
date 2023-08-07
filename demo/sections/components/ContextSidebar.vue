<template>
  <ComponentPage title="Context Sidebar" :demos="[{ title: 'Context Sidebar' }]">
    <template #context-sidebar>
      <PContextSidebar>
        <template #header>
          Header
        </template>
        <PContextNavItem to="#0" title="Context Nav Item" icon="Agent" />
        <PContextNavItem to="/" title="Context Nav Item" />
        <PContextNavItem to="/" title="Context Nav Item" />
        <PContextNavItem to="/" title="Context Nav Item" />
        <template #footer>
          Footer
        </template>
      </PContextSidebar>
    </template>
  </ComponentPage>
</template>

<script lang="ts" setup>
  import ComponentPage from '@/demo/components/ComponentPage.vue'
</script>