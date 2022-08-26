<template>
  <Section heading="Icon Text">
    <p-icon-text v-for="icon in icons" :key="icon" :icon="icon" :text="icon" class="mt-2" />
  </Section>
</template>

<script lang="ts" setup>
  import { Icon } from '@/types/icon'
  import Section from './Section.vue'
  const icons: Icon[] = ['Agent', 'AwaitingRetry', 'Cancelled']
</script>
