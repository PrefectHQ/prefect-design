<template>
  <div class="p-list-item p-background">
    <slot />
  </div>
</template>

<style>
.p-list-item { @apply
  rounded-lg
  flex
  py-3
  px-4
}
</style>