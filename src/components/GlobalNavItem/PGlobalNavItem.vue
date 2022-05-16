<template>
  <router-link
    :to="to"
  >
    <template v-if="icon">
      <p-icon :icon="icon" class="p-global-nav-item__icon" />
    </template>
    <span>{{ title }}</span>
  </router-link>
</template>

<script lang="ts" setup>
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
  stroke-slate-400
  hover:stroke-white
  transition
  duration-200
  ease-linear
}
</style>