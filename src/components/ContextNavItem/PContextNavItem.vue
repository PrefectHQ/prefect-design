<template>
  <a
    :href="href"
    class="p-context-nav-item"
    :class="{ 'p-context-nav-item--active': isActive }"
  >
    <p-icon :icon="icon" class="p-context-nav-item__icon" />
    <span>{{ title }}</span>
  </a>
</template>

<script setup lang="ts">
  defineProps<{
    href: string,
    title?: string,
    icon?: string,
    isActive: boolean,
  }>()
</script>

<style>
.p-context-nav-item {
  @apply
  flex
  items-center
  gap-3
  text-sm
  leading-5
  font-medium
  py-2.5
  rounded-md
  -mx-2
  px-2
  transition
  duration-200
  ease-linear
  hover:bg-slate-600
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