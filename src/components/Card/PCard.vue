<template>
  <div class="p-card" :class="classes">
    <slot />
  </div>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'

  const props = defineProps<{
    flat: boolean,
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

  /*
    Explicitly defining these after transition-all
      to override the transition-property on the box-shadow
      because transitioning shadows isn't super performant
      and it doesn't add much value.
  */
  transition-property: border border-color border-radius background-color color padding;
}

.p-card .p-card--flat { @apply
  border-none
  shadow-none
  bg-transparent
}
</style>