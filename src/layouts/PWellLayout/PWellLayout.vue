<template>
  <div class="p-well-layout">
    <div class="p-well-layout__header">
      <slot name="header" />
    </div>
    <div class="p-well-layout__content">
      <slot name="content" />
    </div>
    <div class="p-well-layout__well">
      <slot name="well" />
    </div>
  </div>
</template>

<style>
.p-well-layout {
  @apply
  p-8
  grid
  grid-cols-[1fr_1fr_250px]
  grid-rows-[repeat(2,_auto)]
  gap-8
  h-full
  w-full
}

.p-well-layout__header {
  @apply
  col-span-3
}

.p-well-layout__content {
  @apply
  sm:col-span-2
  col-span-3
}

.p-well-layout__well {
  @apply
  w-full
  hidden
  sm:block
}
</style>