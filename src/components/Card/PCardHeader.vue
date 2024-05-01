<template>
  <div class="p-card-header">
    <slot />
  </div>
</template>

<style scoped>
.p-card-header {
  @apply
    flex
    flex-col
    gap-y-1.5
    p-6;
}
</style>