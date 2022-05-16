<template>
  <div class="p-menu-item">
    <p-icon v-if="icon" :icon="icon" class="p-menu-item__icon" />

    <slot>
      <span>{{ label }}</span>
    </slot>

    <div class="p-menu-item__after">
      <slot name="after" />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { Icon } from '@/types/icon'
  defineProps<{
    label: string,
    icon?: Icon,
  }>()
</script>

<style>
.p-menu-item { @apply
  p-2
  font-normal
  text-gray-900
  flex
  items-center
  p-4
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