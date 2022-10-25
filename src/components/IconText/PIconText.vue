<template>
  <div class="p-icon-text">
    <PIcon :icon="icon" class="p-icon-text__icon" />
    <div class="p-icon-text__label">
      <slot>
        {{ text }}
      </slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import PIcon from '@/components/Icon/PIcon.vue'
  import { Icon } from '@/types/icon'

  defineProps<{
    icon: Icon,
    text?: string,
  }>()
</script>

<style>
.p-icon-text { @apply
  flex
  items-start
  gap-1
}

.p-icon-text__icon { @apply
  text-slate-400
  w-4
  flex-shrink-0
  h-4
}

.p-link .p-icon-text__icon { @apply
  text-inherit
  opacity-70
}

.p-icon-text__label { @apply
  text-xs
  leading-4
  font-normal
}
</style>