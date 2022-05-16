<template>
  <router-link
    exact-active-class="p-context-nav-item--active"
    class="p-context-nav-item"
    :to="to"
  >
    <template v-if="icon">
      <p-icon :icon="icon" class="p-context-nav-item__icon" />
    </template>
    <span>{{ title }}</span>
  </router-link>
</template>

<script setup lang="ts">
  import { RouteLocationRaw } from 'vue-router'
  import { Icon } from '@/types/icon'

  defineProps<{
    to: string | RouteLocationRaw,
    title?: string,
    icon?: Icon,
  }>()
</script>

<style>
.p-context-nav-item {
  @apply
  flex
  py-2.5
  px-3
  rounded-md
  items-center
  transition
  duration-200
  ease-linear
  gap-3
  text-sm
  leading-5
  font-medium
  hover:bg-slate-600
  active:bg-slate-800
  focus:bg-white/25
}

.p-context-nav-item__icon{
  @apply
  h-6
  w-6
}

.p-context-nav-item--active {
  @apply
  bg-white/25
}
</style>