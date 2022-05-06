<template>
  <Section heading="Bread Crumbs">
    <p-bread-crumbs :crumbs="crumbs" />
  </Section>
</template>

<script setup lang="ts">
  import Section from '../components/Section.vue'

  const crumbs = [
    { text: 'ETL', to: '#' },
    { text: 'hungry-hippo' },
  ]
</script>