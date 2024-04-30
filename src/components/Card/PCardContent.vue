<template>
  <div class="p-card-content" :class="props.class">
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
.p-card-content {
  @apply
    p-6
    pt-0
    only:p-4
    ;
}
</style>
