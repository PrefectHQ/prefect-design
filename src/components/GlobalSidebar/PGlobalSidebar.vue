<template>
  <div class="global-sidebar">
    <div class="global_sidebar__items">
      <p-icon icon="PrefectGradient" class="global-sidebar__logo" />
      <div class="global_sidebar__item">
        <slot name="sidebar-items" />
      </div>
    </div>

    <div class="global-sidebar__profile" />

    <p-icon icon="MenuIcon" class="global-sidebar__close" />
  </div>
</template>

<script setup lang="ts">
</script>

<style>
.global-sidebar {
  @apply
  bg-slate-800
  fixed
  h-16
  w-screen
  flex
  flex-row
  items-center
  justify-between
  px-5
  z-10
  sm:h-screen
  sm:w-16
  sm:flex-col
  sm:py-5
}

.global_sidebar__items {
  @apply
  flex
  items-center
  gap-5
  sm:flex-col
}

.global-sidebar__logo {
  @apply
  w-6
}

.global_sidebar__item {
  @apply
  w-9
}

.global-sidebar__profile {
  @apply
  h-10
  w-10
  rounded-full
  bg-white
  hidden
  sm:block
}

.global-sidebar__close {
  @apply
  fill-slate-400
  h-6
  w-6
  block
  sm:hidden
}
</style>