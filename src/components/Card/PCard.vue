<template>
  <div class="p-card">
    <slot />
  </div>
</template>

<style>
.p-card { @apply
  bg-background
  text-foreground
  border
  border-gray-300
  p-6
  rounded-lg
  shadow-sm
}
</style>