<template>
  <TabsContent
    class="p-tabs-content"
    v-bind="props"
  >
    <slot />
  </TabsContent>
</template>

<script setup lang="ts">
  import { TabsContent, type TabsContentProps } from 'radix-vue'


  const props = defineProps<TabsContentProps>()
</script>

<style>
  .p-tabs-content {
    @apply
    mt-2
    ring-offset-background
    focus-visible:outline-none
    focus-visible:ring-2
    focus-visible:ring-ring
    focus-visible:ring-offset-2

  }
</style>