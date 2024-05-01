<template>
  <p class="p-card-description">
    <slot />
  </p>
</template>

<style>
.p-card-description {
  @apply
    text-sm
    text-muted-foreground;
}
</style>