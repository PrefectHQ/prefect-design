<template>
  <ComboboxGroup
    v-bind="props"
    class="p-command-group"
  >
    <ComboboxLabel v-if="heading" class="p-command-group-heading">
      {{ heading }}
    </ComboboxLabel>
    <slot />
  </ComboboxGroup>
</template>

<script setup lang="ts">
  import { ComboboxGroup, ComboboxLabel, type ComboboxGroupProps } from 'radix-vue'

  const props = defineProps<ComboboxGroupProps & {
    heading?: string,
  }>()
</script>

<style>
.p-command-group {
  @apply
  overflow-hidden
  p-1
  text-foreground
  [&_[cmdk-group-heading]]:px-2
  [&_[cmdk-group-heading]]:py-1.5
  [&_[cmdk-group-heading]]:text-xs
  [&_[cmdk-group-heading]]:font-medium
  [&_[cmdk-group-heading]]:text-muted-foreground;
}

.p-command-group-heading {
  @apply
  px-2
  py-1.5
  text-xs
  font-medium
  text-muted-foreground;
}
</style>