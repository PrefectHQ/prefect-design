<template>
  <div class="p-overflow-menu">
    <slot />
  </div>
</template>

<style>
.p-overflow-menu { @apply
  bg-floating
  shadow-lg
  w-auto
  rounded-default
  overflow-hidden
  inline-flex
  flex-col
  gap-[1px]
  py-1
}

.p-overflow-menu > * { @apply
  block
}
</style>