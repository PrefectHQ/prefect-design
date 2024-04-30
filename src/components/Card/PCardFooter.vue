<template>
  <div class="p-card-footer" :class="props.class">
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
.p-card-footer {
  @apply
    flex
    items-center
    p-6
    pt-0;
}
</style>
