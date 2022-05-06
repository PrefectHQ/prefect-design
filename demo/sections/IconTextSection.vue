<template>
  <Section heading="Icon Text">
    <p-icon-text v-for="icon in icons" :key="icon" :icon="icon" class="mt-2">
      <span>{{ icon }}</span>
    </p-icon-text>
  </Section>
</template>

<script lang="ts" setup>
  import Section from '../components/Section.vue'
  const icons = ['Agent', 'AwaitingRetry', 'Cancelled']
</script>
