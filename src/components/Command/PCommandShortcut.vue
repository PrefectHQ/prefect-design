<template>
  <span class="p-command-shortcut">
    <slot />
  </span>
</template>

<style>
.p-command-shortcut {
  @apply
  ml-auto
  text-xs
  tracking-widest
  text-muted-foreground;
}
</style>
