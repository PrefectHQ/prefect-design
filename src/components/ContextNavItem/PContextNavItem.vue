<template>
  <router-link
    active-class="p-context-nav-item--active"
    class="p-context-nav-item"
    :to="to"
  >
    <template v-if="icon">
      <PIcon :icon="icon" class="p-context-nav-item__icon" />
    </template>
    <span>{{ title }}</span>
  </router-link>
</template>

<script setup lang="ts">
  import { RouteLocationRaw } from 'vue-router'
  import PIcon from '@/components/Icon/PIcon.vue'
  import { Icon } from '@/types/icon'

  defineProps<{
    to: string | RouteLocationRaw,
    title?: string,
    icon?: Icon,
  }>()
</script>

<style>
.p-context-nav-item { @apply
  flex
  p-2
  rounded-default
  items-center
  transition
  duration-200
  ease-linear
  gap-2
  text-sm
  leading-5
  select-none
  hover:bg-selectable-hover
  active:bg-selected
}

.p-context-nav-item__icon { @apply
  h-5
  w-5
}

.p-context-nav-item--active { @apply
  bg-selected
  hover:bg-selected
}
</style>