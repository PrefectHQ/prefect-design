<template>
  <div
    class="p-dialog-footer"
  >
    <slot />
  </div>
</template>

<style>
.p-dialog-footer {
  @apply
  flex
  flex-col-reverse
  sm:flex-row
  sm:justify-end
  sm:gap-x-2;
}
</style>