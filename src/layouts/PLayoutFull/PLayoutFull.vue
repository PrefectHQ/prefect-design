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
  relative
  w-full
  h-full
}

.p-layout-full__header { @apply
  absolute
  top-8
  left-8
  right-8
  z-10
}
</style>