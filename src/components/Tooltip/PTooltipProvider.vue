<template>
  <TooltipProvider v-bind="props">
    <slot />
  </TooltipProvider>
</template>

<script setup lang="ts">
  import { TooltipProvider, type TooltipProviderProps } from 'radix-vue'

  const props = defineProps<TooltipProviderProps>()
</script>