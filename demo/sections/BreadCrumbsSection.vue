<template>
  <Section heading="Bread Crumbs">
    <p-bread-crumbs :crumbs="crumbs" icon="CakeIcon" />
  </Section>
</template>

<script setup lang="ts">
  import Section from '../components/Section.vue'

  const crumbs = [
    { text: 'Account', to: '#' },
    { text: 'Workspace', to: '#' },
    { text: 'Workspace name' },
  ]
</script>