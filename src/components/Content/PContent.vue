<template>
  <div class="p-content" :class="classes">
    <slot />
  </div>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'

  const props = defineProps<{
    secondary?: boolean,
  }>()

  const classes = computed(() => ({
    'p-content--secondary': props.secondary,
  }))
</script>

<style>
.p-content { @apply
  grid
  gap-4
  grid-cols-1
}

.p-content--secondary { @apply
  gap-2
}
</style>