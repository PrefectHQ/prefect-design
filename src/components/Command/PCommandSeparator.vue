<template>
  <ComboboxSeparator
    v-bind="props"
    class="p-command-separator"
  >
    <slot />
  </ComboboxSeparator>
</template>

<script setup lang="ts">
  import { ComboboxSeparator, type ComboboxSeparatorProps } from 'radix-vue'

  const props = defineProps<ComboboxSeparatorProps>()
</script>

<style>
.p-command-separator {
  @apply -mx-1 h-px bg-border only:bg-red-500;
}
</style>
