<template>
  <div class="p-layout-well">
    <div class="p-layout-well__header">
      <slot name="header" />
    </div>
    <div class="p-layout-well__content">
      <slot />
    </div>
    <div class="p-layout-well__well">
      <slot name="well" />
    </div>
  </div>
</template>

<style>
.p-layout-well {
  @apply
  p-4
  grid
  grid-cols-[1fr_1fr_250px]
  grid-rows-[max-content_max-content]
  gap-4
  w-full
}

.p-layout-well__header {
  @apply
  col-span-3
}

.p-layout-well__content {
  @apply
  xl:col-span-2
  col-span-3
  grid
  gap-4
  grid-cols-[minmax(0,1fr)]
}

.p-layout-well__well {
  @apply
  w-full
  hidden
  xl:block
}
</style>