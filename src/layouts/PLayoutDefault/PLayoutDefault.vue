<template>
  <div class="p-layout-default">
    <div v-if="$slots.header" class="p-layout-default__header">
      <slot name="header" />
    </div>
    <div class="p-layout-default__content">
      <slot />
    </div>
  </div>
</template>

<style>
.p-layout-default { @apply
  p-4
  grid
  grid-rows-[max-content_max-content]
  gap-4
  w-full
}

.p-layout-default__header { @apply
  min-w-0
  max-w-full
}

.p-layout-default__content { @apply
  grid
  grid-cols-[minmax(0,1fr)]
  gap-4
}
</style>