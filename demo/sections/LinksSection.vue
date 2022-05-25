<template>
  <Section heading="Links">
    <p-link>Link to nowhere</p-link>

    <br>

    <p-link to="/icons">
      Link to Icons page
    </p-link>

    <br>

    <p-link to="https://prefect.io">
      Link to prefect.io
    </p-link>
  </Section>
</template>

<script setup lang="ts">
  import Section from '../components/Section.vue'
</script>