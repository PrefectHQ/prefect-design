<template>
  <p :class="props.class" class="p-card-description">
    <slot />
  </p>
</template>

<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'

  const props = defineProps<{
    class?: HTMLAttributes['class'],
  }>()
</script>

<style scoped>
.p-card-description {
  @apply
    text-sm
    text-muted-foreground;
}
</style>