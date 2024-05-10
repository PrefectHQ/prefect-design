<template>
  <TabsList
    v-bind="props"
    class="p-tabs-list"
  >
    <slot />
  </TabsList>
</template>

<script setup lang="ts">
  import { TabsList, type TabsListProps } from 'radix-vue'

  const props = defineProps<TabsListProps>()
</script>

<style>
  .p-tabs-list {
    @apply
    inline-flex
    h-10
    items-center
    justify-center
    rounded-md
    bg-muted
    p-1
    text-muted-foreground
  }
</style>