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
    'p-background': !props.flat,
  }))
</script>

<style>
.p-card { @apply
  p-4
  rounded-default
  transition-all;

  transition-property: background-color;
}

.p-card--flat { @apply
  bg-transparent
}
</style>