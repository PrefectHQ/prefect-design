<template>
  <div class="p-overflow-menu">
    <slot />
  </div>
</template>

<style>
.p-overflow-menu { @apply
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

.p-overflow-menu > a { @apply
  block
}
</style>