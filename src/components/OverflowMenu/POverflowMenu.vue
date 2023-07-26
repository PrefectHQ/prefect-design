<template>
  <div class="p-overflow-menu">
    <slot />
  </div>
</template>

<style>
.p-overflow-menu { @apply
  bg-floating
  w-auto
  rounded
  overflow-hidden
  inline-flex
  flex-col
  gap-[1px]
}

.p-overflow-menu > * { @apply
  block
}
</style>