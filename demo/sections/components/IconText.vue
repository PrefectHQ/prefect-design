<template>
  <ComponentPage title="Icon Text" :demos="[{ title: 'Icon Text' }, { title: 'Icon Text Inside Link' }]">
    <template #icon-text>
      <PIconText v-for="icon in icons" :key="icon" :icon="icon" :text="icon" />
    </template>

    <template #icon-text-inside-link>
      <PLink>
        <PIconText icon="MapPinIcon" text="happy-gazelle" />
      </PLink>
    </template>
  </ComponentPage>
</template>

<script lang="ts" setup>
  import { PIconText, PLink } from '@/components'
  import { Icon } from '@/types/icon'
  import ComponentPage from '@/demo/components/ComponentPage.vue'

  const icons: Icon[] = ['Agent', 'AwaitingRetry', 'Cancelled']
</script>