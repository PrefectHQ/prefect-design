<template>
  <div class="flex items-center gap-x-2">
    <hr class="p-divider">

    <template v-if="$slots.default">
      <div class="p-divider__text">
        <slot />
      </div>
      <hr class="p-divider">
    </template>
  </div>
</template>

<style>
  .p-divider { @apply
    border-none
    h-[1px]
    bg-divider
    w-full
    my-3
  }

  .p-divider__text { @apply
    px-2
    flex-shrink-0
    flex
    items-center
  }
</style>