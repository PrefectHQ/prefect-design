<template>
  <span
    class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
    :class="classes"
  >
    <slot name="icon" />
    <slot />
  </span>
</template>

<script lang="ts" setup>
  import { computed, withDefaults } from 'vue'

  const props = withDefaults(defineProps<{
    disabled?: boolean,
  }>(), {
  })
  const classes = computed(() => ({
    'cursor-not-allowed': props.disabled,
  }))
</script>