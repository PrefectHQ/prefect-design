<template>
  <span class="p-tag">
    <div v-if="icon" class="p-tag__icon">
      <p-icon :icon="icon" />
    </div>

    <span class="p-tag__label">
      <slot>{{ label }}</slot>
    </span>
  </span>
</template>

<script lang="ts" setup>
  import { Icon } from '@/types/icon'

  defineProps<{
    icon?: Icon,
    label?: string,
  }>()
</script>

<style>
.p-tag {@apply
  gap-1
  inline-flex
  items-center
  rounded-full
  bg-gray-100
  text-black
  px-2.5
  py-0.5
  text-sm
}
.p-tag--icon {@apply
  w-4
  h-4
}
</style>