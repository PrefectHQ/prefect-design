<template>
  <div class="p-card" :class="classes">
    <slot />
  </div>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'

  const props = defineProps<{
    flat?: boolean,
  }>()

  const classes = computed(() => ({
    'p-card--flat': props.flat,
  }))
</script>

<style>
.p-card { @apply
  bg-background
  text-foreground
  border
  border-background-400
  dark:border-foreground-200
  p-6
  rounded-lg
  shadow-sm
  transition-all;

  transition-property: border border-color background-color;
}

.p-card--flat { @apply
  border-transparent
  dark:border-transparent
  shadow-none
  bg-transparent
}
</style>