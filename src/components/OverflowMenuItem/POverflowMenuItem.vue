<template>
  <button
    type="button"
    class="p-menu-item"
  >
    <PIcon v-if="icon" :icon="icon" class="p-menu-item__icon" />

    <slot>
      <span>{{ label }}</span>
    </slot>

    <div class="p-menu-item__after">
      <slot name="after" />
    </div>
  </button>
</template>

<script lang="ts" setup>
  import PIcon from '@/components/Icon/PIcon.vue'
  import { Icon } from '@/types/icon'

  defineProps<{
    label?: string,
    icon?: Icon,
  }>()
</script>

<style>
.p-menu-item { @apply
  p-3
  font-normal
  text-foreground
  text-sm
  flex
  items-center
  w-full
  hover:bg-background-500
}

.p-menu-item__icon { @apply
  w-5
  h-5
  mr-2
}

.p-menu-item__after { @apply
  ml-auto
  pl-10
}
</style>