<template>
  <div class="p-default-layout">
    <div class="p-default-layout__header">
      <slot name="header" class="p-default-layout__header" />
    </div>
    <div class="p-default-layout__content">
      <slot name="content" />
    </div>
  </div>
</template>

<style>
.p-default-layout {
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