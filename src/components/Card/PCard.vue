<template>
  <div class="p-card p-background" :class="classes">
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
  text-foreground
  p-4
  rounded-xl
  shadow-sm
  transition-all;

  transition-property: border border-color background-color;
}

.p-card--flat { @apply
  shadow-none
  bg-transparent
}
</style>