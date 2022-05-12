<template>
  <div class="p-context-sidebar">
    <div class="p-context-sidebar__nav-items">
      <slot name="header" />
      <slot name="upper-links" />
    </div>
    <div class="p-context-sidebar__nav-items">
      <slot name="bottom-links" />
    </div>
  </div>
</template>

<style>
.p-context-sidebar {
  @apply
  bg-slate-700
  text-slate-300
  font-sans
  fixed
  w-screen
  flex
  flex-row
  justify-between
  px-5
  z-10
  sm:h-screen
  sm:w-64
  sm:flex-col
  sm:py-5
}

.p-context-sidebar__nav-items {
  @apply
  flex
  flex-col
  gap-1
}
</style>