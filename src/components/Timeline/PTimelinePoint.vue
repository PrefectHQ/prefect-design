<template>
  <div class="p-timeline-point p-background">
    <slot />
  </div>
</template>

<style>
.p-timeline-point { @apply
  rounded-full
  border
  dark:border-foreground-100
  text-foreground-400
  p-2
  text-center
  shadow
}
</style>