<template>
  <div class="p-ordered-list-node">
    <slot />
  </div>
</template>

<style>
.p-ordered-list-node { @apply
  rounded-full
  bg-background
  border
  dark:border-foreground-100
  text-foreground-400
  p-2
  text-center
  shadow
}
</style>