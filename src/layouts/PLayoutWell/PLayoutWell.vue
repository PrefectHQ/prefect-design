<template>
  <div class="p-layout-well">
    <div class="p-layout-well__header">
      <slot name="header" />
    </div>
    <div class="p-layout-well__content">
      <slot name="content" />
    </div>
    <div class="p-layout-well__well">
      <slot name="well" />
    </div>
  </div>
</template>

<style>
.p-layout-well {
  @apply
  p-8
  grid
  grid-cols-[1fr_1fr_250px]
  grid-rows-[repeat(2,_auto)]
  gap-8
  h-full
  w-full
}

.p-layout-well__header {
  @apply
  col-span-3
}

.p-layout-well__content {
  @apply
  sm:col-span-2
  col-span-3
}

.p-layout-well__well {
  @apply
  w-full
  hidden
  sm:block
}
</style>