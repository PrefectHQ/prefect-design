<template>
  <div
    class="p-toast__card"
    @mouseenter="stopTimeout"
    @mouseleave="startTimeout"
    @focusin.capture="stopTimeout"
    @focusout.capture="startTimeout"
  >
    <div class="p-toast__card-container">
      <div class="p-toast__info">
        <PIcon :icon="internalIcon" aria-hidden="true" class="p-toast__icon" :class="color" solid />
        <p class="p-toast__message">
          <slot>
            <PMarkdownRenderer :text="message" />
          </slot>
        </p>
      </div>
      <div v-if="dismissible || timeout === false" class="p-toast__close">
        <PButton class="p-toast__close-btn" icon="Close" variant="ghost" size="sm" @click="removeToast">
          <span class="sr-only">Close</span>

          <svg v-if="dismissible" class="p-toast__svg" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" class="p-toast__svg-circle" />
          </svg>
        </PButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed, onMounted, ref } from 'vue'
  import PButton from '@/components/Button/PButton.vue'
  import PIcon from '@/components/Icon/PIcon.vue'
  import { PMarkdownRenderer } from '@/components/MarkdownRenderer'
  import { ToastType } from '@/plugins/Toast'
  import { Icon } from '@/types/icon'

  const {
    message,
    dismissible,
    timeout,
    type,
    icon,
  } = defineProps<{
    message?: string,
    dismissible: boolean,
    timeout: number | false,
    type: ToastType,
    icon?: Icon,
  }>()

  const timer = ref<ReturnType<typeof setTimeout>>()
  const timerStrokeWidth = ref(timeout === false ? '0' : '8px')
  const animationDuration = ref(timeout ? `${timeout / 1000}s` : '5s')
  const animationPlayState = ref('running')

  const iconMap: Record<string, Icon> = {
    default: 'Info',
    success: 'CheckCircleIcon',
    error: 'ExclamationTriangleIcon',
  }
  const internalIcon = computed(() => icon ?? iconMap[type])

  const colorClasses = [
    { className: 'p-toast__icon--success', name: 'success' },
    { className: 'p-toast__icon--error', name: 'error' },
  ]

  const color = computed(() => {
    return colorClasses.find(color => color.name == type)?.className
  })

  const emit = defineEmits<{
    (event: 'close'): void,
  }>()

  const removeToast = (): void => {
    emit('close')
  }

  const stopTimeout = (): void => {
    animationPlayState.value = 'paused'
    clearTimeout(timer.value)
  }

  const startTimeout = (): void => {
    if (timeout) {
      animationPlayState.value = 'running'
      timer.value = setTimeout(removeToast, timeout)
    }
  }

  onMounted(() => {
    startTimeout()
  })
</script>


<style>
/* TODO: This should be responsive to global CVD settings */
.p-toast__icon--success { @apply
  text-sentiment-positive
}

/* TODO: This should be responsive to global CVD settings */
.p-toast__icon--error { @apply
  text-sentiment-negative
}

.p-toast__card { @apply
  max-w-md
  w-full
  bg-floating
  shadow-lg
  rounded-default
  pointer-events-auto
  overflow-hidden
  p-4
}

.p-toast__card-container { @apply
 flex
 justify-between
 gap-2
}

.p-toast__info { @apply
  flex
  items-start
  gap-2
}

.p-toast__icon { @apply
 flex-shrink-0
}

.p-toast__message { @apply
  text-sm
}

.p-toast__close { @apply
 flex-shrink-0
 flex
 items-start
}

.p-toast__close-btn { @apply
  relative
  justify-center
  items-center
  text-subdued
  hover:text-default
  outline-none
  focus:ring-spacing-focus-ring
  focus:ring-focus-ring
  focus:ring-offset-focus-ring
  focus:ring-offset-focus-ring-offset
  h-6
  w-6
}

.p-toast__close-btn:focus:not(:focus-visible) { @apply
  ring-transparent
  ring-offset-transparent
}

.p-toast__close-icon { @apply
  w-4
  h-4
}

.p-toast__svg { @apply
  absolute
  -rotate-90
}

.p-toast__svg-circle {  @apply
  fill-transparent;

  stroke: var(--p-color-button-default-border);
  stroke-dasharray: 290px;
  stroke-dashoffset: 0px;
  stroke-linecap: round;
  stroke-width: v-bind(timerStrokeWidth);
  animation: countdown linear forwards;
  animation-duration: v-bind(animationDuration);
  animation-play-state: v-bind(animationPlayState)
}

/* Hack to restart main animation  */
.p-toast__card:hover .p-toast__svg-circle {
  animation: nonexistent;
}

@keyframes countdown {
  from { @apply
    stroke-sentiment-positive;

    stroke-dashoffset: 0px;
  }
  to { @apply
    stroke-sentiment-negative;

    stroke-dashoffset: 290px;
  }
}
</style>