<template>
  <TabsTrigger
    v-bind="forwardedProps"
    class="p-tabs-trigger"
  >
    <slot />
  </TabsTrigger>
</template>

<script setup lang="ts">
  import { TabsTrigger, type TabsTriggerProps, useForwardProps } from 'radix-vue'
  // eslint-disable-next-line vue/no-unused-properties
  const props = defineProps<TabsTriggerProps>()
  const forwardedProps = useForwardProps(props)
</script>

<style>
.p-tabs-trigger {
  @apply
  inline-flex
  items-center
  justify-center
  whitespace-nowrap
  rounded-sm
  px-3
  py-1.5
  text-sm
  font-medium
  ring-offset-background
  transition-all
  focus-visible:outline-none
  focus-visible:ring-2
  focus-visible:ring-ring
  focus-visible:ring-offset-2
  disabled:pointer-events-none
  disabled:opacity-50
  data-[state=active]:bg-background
  data-[state=active]:text-foreground
  data-[state=active]:shadow-sm;
}
</style>