<template>
  <Page heading="Layouts">
    <layout-sidebar-section />

    <layout-default-section />

    <layout-well-section />

    <layout-full-section />
  </Page>
</template>


<script lang="ts" setup>
  import Page from '../components/Page.vue'
  import LayoutDefaultSection from '../sections/LayoutDefaultSection.vue'
  import LayoutFullSection from '../sections/LayoutFullSection.vue'
  import LayoutSidebarSection from '../sections/LayoutSidebarSection.vue'
  import LayoutWellSection from '../sections/LayoutWellSection.vue'
</script>