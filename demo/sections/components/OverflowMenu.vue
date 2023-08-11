<template>
  <ComponentPage title="Overflow Menu" :demos="[{ title: 'Overflow Menu' }]">
    <template #overflow-menu>
      <p-overflow-menu>
        <p-overflow-menu-item label="Share">
          <template #after>
            <span class="text-subdued">3 INVITES</span>
          </template>
        </p-overflow-menu-item>
        <p-overflow-menu-item label="Google" to="https://www.google.com" />
        <p-overflow-menu-item label="Icons" :to="{ name: 'icons' }" />
        <p-overflow-menu-item label="Settings" />
      </p-overflow-menu>
    </template>
  </ComponentPage>
</template>

<script lang="ts" setup>
  import { POverflowMenu, POverflowMenuItem } from '@/components'
  import ComponentPage from '@/demo/components/ComponentPage.vue'
</script>