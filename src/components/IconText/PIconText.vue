<template>
  <div class="flex items-center">
    <p-icon
      v-if="icon"
      :icon="icon"
      class="w-4 h-4 mr-1 p-icon-text"
    />
    <slot />
  </div>
</template>

<script lang="ts" setup>
  import { Icon } from '@/types/icon'

  defineProps<{
    icon?: Icon,
  }>()
</script>

<style lang="scss" scoped></style>