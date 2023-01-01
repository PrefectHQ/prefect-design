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
  bg-background-800
  dark:bg-background-600
  border-2
  border-background-400
  dark:border-background-600
  divide-y-2
  divide-background-400
  dark:divide-background-500
}

.p-overflow-menu > a { @apply
  block
}
</style>