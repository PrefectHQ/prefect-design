<template>
  <div class="sidebar">
    <div class="sidebar__nav-links">
      <slot name="sidebar-top-nav-links" />
    </div>

    <div class="sidebar__nav-links">
      <slot name="sidebar-bottom-nav-links" />

      <div class="sidebar__profile">
        <slot name="sidebar-profile-menu-button" />
      </div>
      <!-- ↓↓↓ Address toggle of context menu for mobile in Context Sidebar PR -->
      <p-icon icon="MenuIcon" class="sidebar__show-context" />
    </div>
  </div>
</template>


<style>
.sidebar {
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

.sidebar__nav-links {
  @apply
  flex
  items-center
  gap-3
  flex-row
  sm:gap-5
  sm:flex-col
}

.sidebar__nav-links>*{
  @apply
  w-6
}

.sidebar__profile {
  @apply
  cursor-pointer
  h-10
  w-10
  rounded-full
  hidden
  overflow-hidden
  sm:block
}

.sidebar__show-context {
  @apply
  fill-slate-400
  h-6
  w-6
  block
  sm:hidden
  cursor-pointer
}
</style>