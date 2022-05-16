<template>
  <router-link
    v-slot="{ href, navigate, isExactActive }"
    :to="to"
    custom
  >
    <div class="p-context-nav-item">
      <a
        class="p-context-nav-item__link"
        :href="href"
        :class="{ 'p-context-nav-item--active': isExactActive }"
        @click="navigate"
      >
        <template v-if="icon">
          <p-icon :icon="icon" class="p-context-nav-item__icon" />
        </template>
        <span>{{ title }}</span>
      </a>
    </div>
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
  -mx-3
  py-2
  px-2
  border-b
  border-slate-600
  first:border-t
  sm:first:pt-1
  sm:border-0
  sm:py-0
}

.p-context-nav-item__link {
  @apply
  flex
  items-center
  gap-3
  text-sm
  leading-5
  font-medium
  py-2.5
  px-2
  rounded-md
  hover:bg-slate-600
  active:bg-slate-800
  focus:bg-white/25
  transition
  duration-200
  ease-linear
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