<template>
  <div class="p-menu-card">
    <slot />
  </div>
</template>

<style>
.p-menu-card { @apply
  w-auto
  inline-block
  rounded-md
  shadow-lg
  bg-white
  border-2
  border-gray-200
  divide-y-2
  divide-gray-100
}
</style>