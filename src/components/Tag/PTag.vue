<template>
  <span class="p-tag">
    <div v-if="icon" class="p-tag__icon">
      <PIcon :icon="icon" />
    </div>

    <slot>{{ label }}</slot>

    <div v-if="dismissible" class="p-tag__dismiss" @click.stop="emits('dismiss')">
      <PIcon icon="XIcon" />
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
  bg-foreground-100
  text-white
  px-2.5
  py-0.5
  text-sm
}

.p-tag__icon { @apply
  w-4
  h-4
}

.p-tag__dismiss { @apply
  hover:text-foreground-300
  hover:cursor-pointer
  text-foreground-600
}

.p-tag__dismiss .p-icon { @apply
  w-4
  h-4
}
</style>