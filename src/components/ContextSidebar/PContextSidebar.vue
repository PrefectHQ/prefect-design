<template>
  <div class="p-context-sidebar">
    <div>
      <slot name="header" />
      <slot name="upper-links" />
    </div>
    <div>
      <slot name="bottom-links" />
    </div>
  </div>
</template>

<style>
.p-context-sidebar {
  @apply
  bg-slate-700
  fixed
  left-0
  top-16
  w-screen
  flex
  flex-row
  justify-between
  px-5
  z-10
  sm:top-0
  sm:left-16
  sm:h-screen
  sm:w-64
  sm:flex-col
  sm:py-5
}
</style>