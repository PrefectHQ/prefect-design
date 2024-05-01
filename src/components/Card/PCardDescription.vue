<template>
  <p class="p-card-description">
    <slot />
  </p>
</template>

<style scoped>
.p-card-description {
  @apply
    text-sm
    text-muted-foreground;
}
</style>