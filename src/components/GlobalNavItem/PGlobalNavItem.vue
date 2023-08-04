<template>
  <router-link :to="to">
    <template v-if="icon">
      <PIcon :icon="icon" class="p-global-nav-item__icon" />
    </template>
    <span>{{ title }}</span>
  </router-link>
</template>

<script lang="ts" setup>
  import PIcon from '@/components/Icon/PIcon.vue'
  import { Icon } from '@/types/icon'

  defineProps<{
    to: string,
    title?: string,
    icon?: Icon,
  }>()
</script>

<style>
.p-global-nav-item__icon {
  @apply
  w-6
  text-subdued
  hover:text-default
  transition
  duration-200
  ease-linear
}
</style>