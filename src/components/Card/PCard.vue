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
  p-4
  rounded-md
  transition-all;

  transition-property: background-color;
}

.p-card--flat { @apply
  bg-transparent
}
</style>