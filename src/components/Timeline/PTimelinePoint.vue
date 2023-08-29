<template>
  <div class="p-timeline-point p-background">
    <slot />
  </div>
</template>

<style>
.p-timeline-point { @apply
  rounded-full
  border
  border-divider
  p-2
  text-center
  shadow
}
</style>