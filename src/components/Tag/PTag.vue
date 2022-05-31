<template>
  <span class="p-tag">
    <div v-if="icon" class="p-tag__icon">
      <p-icon :icon="icon" />
    </div>

    <slot>{{ label }}</slot>

    <div v-if="dismissible" class="p-tag__dismiss" @click.stop="emits('dismiss')">
      <p-icon icon="XIcon" />
    </div>
  </span>
</template>

<script lang="ts" setup>
  import PIcon from '@/components/Icon/PIcon.vue'
  import { Icon } from '@/types/icon'

  defineProps<{
    icon?: Icon,
    label?: string,
    dismissible?: boolean,
  }>()

  const emits = defineEmits<{
    (event: 'dismiss'): void,
  }>()
</script>

<style>
.p-tag { @apply
  gap-1
  inline-flex
  items-center
  rounded-full
  bg-gray-100
  text-black
  px-2.5
  py-0.5
  text-sm
}

.p-tag__icon { @apply
  w-4
  h-4
}

.p-tag__dismiss { @apply
  hover:text-black
  hover:cursor-pointer
  text-gray-500
}

.p-tag__dismiss .p-icon { @apply
  w-4
  h-4
}
</style>