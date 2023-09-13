<template>
  <li class="p-tab" :class="classes" tabindex="0">
    <slot />
  </li>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'

  const props = defineProps<{
    active?: boolean,
    disabled?: boolean,
  }>()

  const classes = computed(() => ({
    'p-tab__active': props.active,
    'p-tab__disabled': props.disabled,
  }))
</script>

<style>
.p-tab { @apply
  px-5
  py-4
  text-center
  font-medium
  text-sm
  flex
  items-center
  cursor-pointer
}

.p-tab__active { @apply
  border-b-4
  border-selected
}

.p-tab:not(.p-tab__active) { @apply
  border-b-4
  border-transparent
  text-subdued
  hover:border-selectable-hover
  hover:text-default
}

.p-tab__disabled { @apply
  pointer-events-none
  opacity-50
}
</style>