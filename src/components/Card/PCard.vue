<template>
  <div class="card">
    <slot />
  </div>
</template>

<style>
.card {
    @apply
  bg-white
  border
  border-gray-300
  p-6
  rounded-lg
  shadow-sm
}
</style>