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
            :class="classes.dismiss"
            icon="XIcon"
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
    dismiss: {
      'p-message__dismiss--info': props.info,
      'p-message__dismiss--warning': props.warning,
      'p-message__dismiss--error': props.error,
      'p-message__dismiss--success': props.success,
    },
  }))
</script>

<style>
.p-message { @apply
  flex
  gap-2
  items-center
  bg-gray-100
  p-4
  rounded-md
  text-sm
}

.p-message__icon { @apply
  flex-shrink-0
}

.p-message__body { @apply
  flex-grow
}

.p-message__dismiss  { @apply
  !p-1
}

.p-message--info { @apply
  bg-prefect-50
  text-prefect-800
}

.p-message--warning { @apply
  bg-orange-50
  text-orange-800
}

.p-message--error { @apply
  bg-red-50
  text-red-800
}

.p-message--success { @apply
  bg-green-50
  text-green-800
}

.p-message__dismiss--info,
.p-message__icon--info { @apply
  text-prefect-600
}

.p-message__dismiss--warning,
.p-message__icon--warning { @apply
  text-orange-600
}

.p-message__dismiss--error,
.p-message__icon--error { @apply
  text-red-600
}

.p-message__dismiss--success,
.p-message__icon--success { @apply
  text-green-600
}
</style>