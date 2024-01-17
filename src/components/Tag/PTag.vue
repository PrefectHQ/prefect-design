<template>
  <span class="p-tag" :class="classes.root">
    <div v-if="icon" class="p-tag__icon">
      <PIcon :icon="icon" size="small" />
    </div>

    <slot>{{ tagValue.label }}</slot>

    <button
      v-if="dismissible"
      type="button"
      class="p-tag__dismiss"
      @click.stop="emits('dismiss', tagValue)"
    >
      <PIcon icon="XMarkIcon" size="small" class="p-tag__icon p-tag__icon--dismiss" />
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
    small?: boolean,
  }>()

  const emits = defineEmits<{
    (event: 'dismiss', value: TagValue): void,
  }>()

  const tagValue = computed(() => {
    return normalize(props.value ?? props.label ?? '')
  })

  const classes = computed(() => ({
    root: {
      'p-tag--dismissible': props.dismissible,
      'p-tag--small': props.small,
    },
  }))
</script>

<style>
.p-tag { @apply
  gap-1
  inline-flex
  items-center
  rounded-default
  text-sm
  px-2.5
  py-0.5;
  background-color: var(--p-color-tag-bg);
  border-color: var(--p-color-tag-border);
  color: var(--p-color-tag-text);
}

.p-tag--dismissible { @apply
  pr-1.5
}

.p-tag__dismiss {
  color: var(--p-color-tag-text);
}

.p-tag--small { @apply
  text-xs
  px-1.5
  py-0.5
}
</style>