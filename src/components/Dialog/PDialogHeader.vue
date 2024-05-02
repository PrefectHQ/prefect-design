<template>
  <div
    class="p-dialog-header"
  >
    <slot />
  </div>
</template>

<style>
.p-dialog-header {
  @apply
  flex
  flex-col
  gap-y-1.5
  text-center
  sm:text-left;
}
</style>
