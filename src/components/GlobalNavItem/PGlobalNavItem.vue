<template>
  <a :href="href">
    <p-icon :icon="icon" class="p-global-nav-item__icon" />
    <span>{{ title }}</span>
  </a>
</template>

<script lang="ts" setup>
  defineProps<{
    href?: string,
    title?: string,
    icon?: string,
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