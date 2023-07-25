<template>
  <div class="p-global-sidebar p-background">
    <div class="p-global-sidebar__nav-links">
      <slot name="upper-links" />
    </div>

    <div class="p-global-sidebar__nav-links">
      <slot name="bottom-links" />
    </div>
  </div>
</template>

<style>
.p-global-sidebar { @apply
  sticky
  top-0
  h-16
  flex
  flex-row
  items-center
  justify-between
  z-10
  px-4
  lg:px-5
  lg:h-screen
  lg:w-16
  lg:flex-col
  lg:py-5
}

.p-global-sidebar__nav-links { @apply
  flex
  items-center
  gap-4
  flex-row
  lg:gap-5
  lg:flex-col
}
</style>