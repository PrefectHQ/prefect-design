<template>
  <DialogDescription
    v-bind="props"
    class="p-dialog-description"
  >
    <slot />
  </DialogDescription>
</template>

<script setup lang="ts">
  import { DialogDescription, type DialogDescriptionProps } from 'radix-vue'


  // eslint-disable-next-line vue/no-unused-properties
  const props = defineProps<DialogDescriptionProps>()
</script>

<style>
.p-dialog-description {
  @apply text-sm text-muted-foreground;
}
</style>