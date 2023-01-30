<template>
  <span class="p-tag">
    <div v-if="icon" class="p-tag__icon">
      <PIcon :icon="icon" />
    </div>

    <slot>{{ tagValue.label }}</slot>

    <button
      v-if="dismissible"
      type="button"
      class="p-tag__dismiss"
      @click.stop="emits('dismiss', tagValue)"
    >
      <PIcon icon="XIcon" class="p-tag__icon p-tag__icon--dismiss" />
    </button>
  </span>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import PIcon from '@/components/Icon/PIcon.vue'
  import { Icon } from '@/types/icon'
  import { TagValue, normalize } from '@/types/tag'

  const props = defineProps<{
    icon?: Icon,
    label?: string,
    value?: string | TagValue,
    dismissible?: boolean,
  }>()

  const emits = defineEmits<{
    (event: 'dismiss', value: TagValue): void,
  }>()

  const tagValue = computed(() => {
    return normalize(props.value ?? props.label ?? '')
  })
</script>

<style>
.p-tag { @apply
  gap-1
  inline-flex
  items-center
  rounded-full
  bg-background-400
  text-foreground
  dark:bg-background-600
  px-2.5
  py-0.5
  text-sm
}

.p-tag__icon { @apply
  w-4
  h-4
}

.p-tag__dismiss { @apply
  text-foreground-600
  hover:text-foreground-300
}
</style>