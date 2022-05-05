<template>
  <div class="p-text">
    <p-icon
      :icon="icon"
      class="p-text__icon"
    />
    <slot />
  </div>
</template>

<script lang="ts" setup>
  import { Icon } from '@/types/icon'

  defineProps<{
    icon: Icon,
  }>()
</script>

<style>
.p-text { @apply
  flex
  items-center
}
.p-text__icon {@apply
  w-6
  h-6
  mr-2
}
</style>