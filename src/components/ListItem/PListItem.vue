<template>
  <div class="list-item">
    <slot />
  </div>
</template>

<style>
.list-item { @apply
  bg-gray-50
  shadow
  rounded-lg
  flex
  py-3
  px-4
}
</style>