<template>
  <div class="p-card">
    <slot />
  </div>
</template>

<style>
.p-card { @apply
  dark:bg-background-500
  bg-background-700
  text-foreground
  border
  border-background-400
  dark:border-foreground-200
  p-6
  rounded-lg
  shadow-sm
}

.p-card .p-code-highlight:not(:only-child) { @apply
  px-4
  py-2
  dark:bg-background-600
  bg-background-500
}
</style>