<template>
  <ComponentPage title="Icon Text" :demos="[{ title: 'Icon Text' }, { title: 'Icon Text Inside Link' }]">
    <template #description>
      This is where we add a short description of <p-code inline>
        p-icon-text
      </p-code>. Describe the components intent, not hyper specific documentation that belongs on vitepress page.
    </template>

    <template #icon-text>
      <PIconText v-for="icon in icons" :key="icon" :icon="icon" :text="icon" />
    </template>

    <template #icon-text-inside-link>
      <PLink>
        <PIconText icon="LocationMarkerIcon" text="happy-gazelle" />
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