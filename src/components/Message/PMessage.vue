<template>
  <div class="p-message" :class="classes.message">
    <slot name="icon">
      <template v-if="icon">
        <p-icon class="p-message__icon" :class="classes.icon" :icon="icon" />
      </template>
    </slot>

    <div class="p-message__body">
      <slot />
    </div>

    <slot name="action">
      <div class="p-message__action">
        <template v-if="dismissible">
          <p-button
            class="p-message__dismiss"
            icon="XMarkIcon"
            small
            flat
            @click="emit('dismiss')"
          />
        </template>
      </div>
    </slot>
  </div>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import { Icon } from '@/types'

  const props = defineProps<{
    info?: boolean,
    warning?: boolean,
    error?: boolean,
    success?: boolean,
    dismissible?: boolean,
  }>()

  const emit = defineEmits<{
    (event: 'dismiss'): void,
  }>()

  const icon = computed<Icon | undefined>(() => {
    if (props.info) {
      return 'InformationCircleIcon'
    }

    if (props.warning || props.error) {
      return 'ExclamationCircleIcon'
    }

    if (props.success) {
      return 'CheckCircleIcon'
    }

    return undefined
  })

  const classes = computed(() => ({
    message: {
      'p-message--info': props.info,
      'p-message--warning': props.warning,
      'p-message--error': props.error,
      'p-message--success': props.success,
    },
    icon: {
      'p-message__icon--info': props.info,
      'p-message__icon--warning': props.warning,
      'p-message__icon--error': props.error,
      'p-message__icon--success': props.success,
    },
  }))
</script>

<style>
.p-message { @apply
  flex
  gap-2
  items-center
  p-4
  rounded-default
  text-sm
  bg-floating
}

.p-message__icon { @apply
  flex-shrink-0
}

.p-message__body { @apply
  flex-grow
}

.p-message--info {
  background-color: var(--p-color-message-info-bg);
  color: var(--p-color-message-info-text);
}

.p-message--warning {
  background-color: var(--p-color-message-warning-bg);
  color: var(--p-color-message-warning-text);
}

.p-message--error {
  background-color: var(--p-color-message-error-bg);
  color: var(--p-color-message-error-text);
}

.p-message--success {
  background-color: var(--p-color-message-success-bg);
  color: var(--p-color-message-success-text);
}

.p-message__dismiss { @apply
  text-current
}
</style>
