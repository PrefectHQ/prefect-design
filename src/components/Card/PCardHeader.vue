<template>
  <div class="p-card-header" :class="props.class">
    <slot />
  </div>
</template>

<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'

  const props = defineProps<{
    class?: HTMLAttributes['class'],
  }>()
</script>

<style scoped>
.p-card-header {
  @apply
    flex
    flex-col
    gap-y-1.5
    p-6;
}
</style>