<template>
  <div class="p-text">
    <p-icon :icon="icon" class="p-text__icon" />
    <div class="p-text__label">
      <slot />
    </div>
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

.p-text__icon { @apply
  text-slate-400
  w-4
  h-5
  mr-2
}

.p-text__label { @apply
  text-slate-500
  text-xs
  leading-4
  font-normal
}
</style>