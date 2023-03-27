<template>
  <div class="p-list-item">
    <slot />
  </div>
</template>

<style>
.p-list-item { @apply
  bg-background
  shadow
  rounded-lg
  flex
  py-3
  px-4
}
</style>