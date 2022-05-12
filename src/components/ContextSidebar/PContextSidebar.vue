<template>
  <div class="p-context-sidebar">
    <div>
      <slot name="header" />
      <div class="p-context-sidebar__nav-items">
        <slot name="upper-links" />
      </div>
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
  fixed
  w-screen
  justify-between
  px-3
  z-10
  sm:flex
  sm:h-screen
  sm:w-64
  sm:flex-col
  sm:py-5
}

.p-context-sidebar__nav-items {
  @apply
  flex
  flex-col
  sm:gap-1
}
</style>