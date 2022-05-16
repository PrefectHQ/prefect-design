<template>
  <div>
    <p-menu-card>
      <p-menu-item label="Share" icon="Prefect">
        <template #after>
          <span class="text-prefect-500">3 INVITES</span>
        </template>
      </p-menu-item>
      <p-menu-item label="Add Favorite" />
      <p-menu-item label="Copy ID" />
      <p-menu-item label="Settings" />
    </p-menu-card>
  </div>
</template>

<script lang="ts" setup>
  import PMenuCard from '@/components/MenuCard/PMenuCard.vue'
  import PMenuItem from '@/components/MenuItem/PMenuItem.vue'
</script>
