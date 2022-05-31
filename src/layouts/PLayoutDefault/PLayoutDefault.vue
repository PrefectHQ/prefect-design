<template>
  <div class="p-layout-default">
    <div class="p-layout-default__header">
      <slot name="header" class="p-layout-default__header" />
    </div>
    <div class="p-layout-default__content">
      <slot />
    </div>
  </div>
</template>

<style>
.p-layout-default {
  @apply
  p-8
  grid
  grid-rows-[max-content_max-content]
  gap-4
  h-full
  w-full
}

.p-layout-default__content {
  @apply
  grid
  gap-4
}
</style>