<template>
  <div class="p-context-sidebar">
    <slot name="header" />
    <div class="p-context-sidebar__nav-items">
      <slot name="upper-links" />
    </div>
    <div class="p-context-sidebar__nav-items p-context-sidebar__nav-items--bottom">
      <slot name="bottom-links" />
    </div>
  </div>
</template>

<style>
.p-context-sidebar {
  @apply
  bg-slate-700
  text-slate-300
  sticky
  top-0
  w-screen
  px-3
  py-2
  z-10
  sm:flex
  sm:h-screen
  sm:w-64
  sm:flex-col
}

.p-context-sidebar__nav-items {
  @apply
  flex
  flex-col
  gap-1
}

.p-context-sidebar__nav-items--bottom {
  @apply
  sm:mt-auto
  mt-1
}
</style>