<template>
  <div class="p-full-layout">
    <div class="p-full-layout__header">
      <slot name="header" class="p-full-layout__header" />
    </div>

    <slot name="content" />
  </div>
</template>

<style>
.p-full-layout {
   @apply
  w-screen
  h-screen
}
.p-full-layout__header {
  @apply
  absolute
  top-8
  left-8
  right-8
}
</style>