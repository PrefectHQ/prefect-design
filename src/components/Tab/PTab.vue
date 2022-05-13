<template>
  <li class="p-tab__li" :class="classes" tabindex="0">
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
.p-tab__li { @apply
  px-10
  py-4
  text-center
  font-medium
  text-sm
  flex
  items-center
}

.p-tab__active { @apply
  border-b-2
  border-prefect-600
  text-prefect-600
}

.p-tab__li:not(.p-tab__active) { @apply
  border-b-2
  border-transparent
  hover:border-gray-400
  text-gray-500
  hover:text-gray-600
}

.p-tab__disabled { @apply
  pointer-events-none
  opacity-50
}
</style>