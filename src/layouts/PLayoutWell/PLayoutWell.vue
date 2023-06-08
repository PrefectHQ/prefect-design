<template>
  <div class="p-layout-well">
    <div v-if="slots.header" class="p-layout-well__header">
      <slot name="header" />
    </div>

    <div v-if="slots.default" class="p-layout-well__content">
      <slot />
    </div>
    <div v-if="slots.well" class="p-layout-well__well">
      <slot name="well" />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { useSlots } from 'vue'

  const slots = useSlots()
</script>

<style>
.p-layout-well { @apply
  grid
  grid-cols-[1fr_1fr_250px]
  grid-rows-[max-content_max-content]
  gap-4
  h-full
  w-full
}

.p-layout-well__header { @apply
  col-span-3
}

.p-layout-well__content { @apply
  xl:col-span-2
  col-span-3
  grid
  gap-4
  grid-cols-[minmax(0,1fr)]
}

.p-layout-well__well { @apply
  w-full
  hidden
  xl:block
}
</style>