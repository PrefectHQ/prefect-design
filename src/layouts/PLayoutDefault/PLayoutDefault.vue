<template>
  <div class="p-layout-default">
    <div v-if="slots.header" class="p-layout-default__header">
      <slot name="header" />
    </div>
    <div v-if="slots.default" class="p-layout-default__content">
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { useSlots } from 'vue'

  const slots = useSlots()
</script>

<style>
.p-layout-default { @apply
  grid
  grid-rows-[max-content_max-content]
  gap-4
  h-full
  w-full
}

.p-layout-default__content { @apply
  grid
  grid-cols-[minmax(0,1fr)]
  gap-4
}
</style>