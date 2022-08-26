<template>
  <Section heading="Overflow Menu & Overflow Menu Items">
    <p-overflow-menu>
      <p-overflow-menu-item label="Share">
        <template #after>
          <span class="text-prefect-500">3 INVITES</span>
        </template>
      </p-overflow-menu-item>
      <p-overflow-menu-item label="Add Favorite" />
      <p-overflow-menu-item label="Copy ID" />
      <p-overflow-menu-item label="Settings" />
    </p-overflow-menu>
  </Section>
</template>

<script lang="ts" setup>
  import { POverflowMenu, POverflowMenuItem } from '@/components'
  import Section from './Section.vue'
</script>
