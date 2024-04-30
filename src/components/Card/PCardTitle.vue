<template>
  <h3
    class="p-card-title"
    :class="props.class"
  >
    <slot />
  </h3>
</template>

<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'

  const props = defineProps<{
    class?: HTMLAttributes['class'],
  }>()
</script>

<style scoped>
.p-card-title {
  @apply
    text-2xl
    font-semibold
    leading-none
    tracking-tight
}
</style>