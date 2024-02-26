<template>
  <div class="p-divider">
    <hr class="p-divider__line">

    <template v-if="$slots.default">
      <div class="p-divider__text">
        <slot />
      </div>
      <hr class="p-divider__line">
    </template>
  </div>
</template>

<style>
  .p-divider { @apply
    flex
    items-center
    gap-x-2
    w-full
  }

  .p-divider__line { @apply
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