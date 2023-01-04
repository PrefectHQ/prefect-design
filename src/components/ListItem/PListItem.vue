<template>
  <div class="list-item">
    <slot />
  </div>
</template>

<style>
.list-item { @apply
  bg-background
  shadow
  rounded-lg
  flex
  py-3
  px-4
}
</style>