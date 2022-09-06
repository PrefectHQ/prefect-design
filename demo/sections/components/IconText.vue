<template>
  <ComponentPage title="Icon Text" :demos="[{ title: 'Icon Text' }]">
    <template #description>
      This is where we add a short description of <p-code>p-icon-text</p-code>. Describe the components intent, not hyper specific documentation that belongs on vitepress page.
    </template>

    <template #icon-text>
      <p-icon-text v-for="icon in icons" :key="icon" :icon="icon" :text="icon" class="mt-2" />
    </template>
  </ComponentPage>
</template>

<script lang="ts" setup>
  import { Icon } from '@/types/icon'
  import ComponentPage from '../../components/ComponentPage.vue'

  const icons: Icon[] = ['Agent', 'AwaitingRetry', 'Cancelled']
</script>