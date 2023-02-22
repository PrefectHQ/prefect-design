<template>
  <div class="p-overflow-menu">
    <slot />
  </div>
</template>

<style>
.p-overflow-menu { @apply
  bg-background-500
  dark:bg-background-600
  w-auto
  border
  dark:border-background-600
  rounded
  overflow-hidden
  inline-flex
  flex-col
  gap-[1px]
}

.p-overflow-menu > * { @apply
  bg-background
  block
}
</style>