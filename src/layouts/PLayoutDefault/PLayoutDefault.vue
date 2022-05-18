<template>
  <div class="p-layout-default">
    <div class="p-layout-default__header">
      <slot name="header" class="p-layout-default__header" />
    </div>
    <div class="p-layout-default__content">
      <slot name="content" />
    </div>
  </div>
</template>

<style>
.p-layout-default {
  @apply
  p-8
  grid
  grid-cols-1
  grid-rows-[repeat(2,_auto)]
  gap-8
  h-full
  w-full
}
</style>