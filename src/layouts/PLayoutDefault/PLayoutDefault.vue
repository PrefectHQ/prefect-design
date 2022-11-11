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
  p-4
  lg:p-8
  grid
  grid-rows-[max-content_max-content]
  gap-4
  h-full
  w-full
}

.p-layout-default__content {
  @apply
  grid
  grid-cols-[minmax(0,1fr)]
  gap-4
}
</style>