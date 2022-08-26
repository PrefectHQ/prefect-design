<template>
  <Section heading="Icon Text">
    <p-icon-text v-for="icon in icons" :key="icon" :icon="icon" :text="icon" class="mt-2" />
  </Section>
</template>

<script lang="ts" setup>
  import Section from '../../components/Section.vue'
  import { Icon } from '@/types/icon'
  const icons: Icon[] = ['Agent', 'AwaitingRetry', 'Cancelled']
</script>
