<template>
  <div class="p-content" :class="classes">
    <slot />
  </div>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'

  const props = defineProps<{
    flex?: boolean,
    secondary?: boolean,
  }>()

  const classes = computed(() => ({
    'p-content--flex': props.flex,
    'p-content--secondary': props.secondary,
  }))
</script>

<style>
.p-content { @apply
  grid
  gap-4
}

.p-content--flex { @apply
  flex
}

.p-content--secondary { @apply
  gap-2
}
</style>