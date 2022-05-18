<template>
  <div class="p-default-layout">
    <div class="p-default-layout__header">
      <slot name="header" />
    </div>
    <div class="p-default-layout__content">
      <slot name="content" />
    </div>
  </div>
</template>

<style>
.p-default-layout {
  @apply
  h-full
  w-full
  p-8
}
.p-default-layout__header {
  @apply
  pb-8
}
</style>