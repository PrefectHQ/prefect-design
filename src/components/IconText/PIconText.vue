<template>
  <div class="p-text">
    <p-icon :icon="icon" class="p-text__icon" />
    <div class="p-text__label">
      <slot>
        {{ text }}
      </slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { Icon } from '@/types/icon'

  defineProps<{
    icon: Icon,
    text?: string,
  }>()
</script>

<style>
.p-text { @apply
  flex
  items-center
  gap-1
}

.p-text__icon { @apply
  text-slate-400
  w-4
  flex-shrink-0
  h-4
}

.p-text__label { @apply
  text-xs
  leading-4
  font-normal
}
</style>