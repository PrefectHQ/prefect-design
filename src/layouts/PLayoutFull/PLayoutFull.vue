<template>
  <div class="p-layout-full">
    <div class="p-layout-full__header">
      <slot name="header" class="p-layout-full__header" />
    </div>

    <slot />
  </div>
</template>

<style>
.p-layout-full { @apply
  w-screen
  h-screen
}
.p-layout-full__header { @apply
  absolute
  top-8
  left-8
  right-8
}
</style>