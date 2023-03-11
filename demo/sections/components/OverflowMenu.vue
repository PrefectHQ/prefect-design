<template>
  <ComponentPage title="Overflow Menu" :demos="[{ title: 'Overflow Menu' }]">
    <template #description>
      This is where we add a short description of <p-code inline>
        p-overflow-menu
      </p-code>. Describe the components intent, not hyper specific documentation that belongs on vitepress page.
    </template>

    <template #overflow-menu>
      <p-overflow-menu>
        <p-overflow-menu-item label="Share">
          <template #after>
            <span class="text-prefect-500">3 INVITES</span>
          </template>
        </p-overflow-menu-item>
        <p-overflow-menu-item label="Add Favorite" />
        <p-overflow-menu-item label="Copy ID" to="https://www.google.com" />
        <p-overflow-menu-item label="Settings" to="/p-button" />
      </p-overflow-menu>
    </template>
  </ComponentPage>
</template>

<script lang="ts" setup>
  import { POverflowMenu, POverflowMenuItem } from '@/components'
  import ComponentPage from '@/demo/components/ComponentPage.vue'
</script>