<template>
  <div class="p-global-sidebar">
    <div class="p-global-sidebar__nav-links">
      <slot name="upper-links" />
    </div>

    <div class="p-global-sidebar__nav-links">
      <slot name="bottom-links" />

      <div class="p-global-sidebar__profile">
        <slot name="profile-button" />
      </div>
    </div>
  </div>
</template>

<style>
.p-global-sidebar {
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

.p-global-sidebar__nav-links {
  @apply
  flex
  items-center
  gap-4
  flex-row
  sm:gap-5
  sm:flex-col
}

.p-global-sidebar__profile {
  @apply
  cursor-pointer
  h-10
  w-10
  rounded-full
  hidden
  overflow-hidden
  sm:block
}
</style>