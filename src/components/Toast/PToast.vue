<template>
  <div class="p-toast__card">
    <div class="p-toast__card-container">
      <div class="p-toast__info">
        <p-icon :icon="icon" aria-hidden="true" class="p-toast__icon" :class="color" />
        <p class="p-toast__message">
          <slot>
            {{ message }}
          </slot>
        </p>
      </div>
      <div v-if="dismissible || timeout === false" class="p-toast__close">
        <button type="button" class="p-toast__close-btn" @click="removeToast">
          <span class="sr-only">Close</span>
          <p-icon class="" icon="XIcon" aria-hidden="true" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed, onMounted } from 'vue'
  import PIcon from '@/components/Icon/PIcon.vue'
  import { ToastType } from '@/plugins/Toast'
  import { Icon } from '@/types/icon'

  const props = defineProps<{
    message?: string,
    dismissible: boolean,
    timeout: number | false,
    type: ToastType,
  }>()


  const iconMap: Record<string, string> = {
    default: 'InformationCircleIcon',
    success: 'CheckCircleIcon',
    error: 'XCircleIcon',
  }
  const icon = computed(() => iconMap[props.type] as Icon)


  const colorClasses = [
    { className: 'p-toast__icon--success', name: 'success'  },
    { className: 'p-toast__icon--error', name: 'error'  },
  ]
  const color = computed(() => {
    return colorClasses.find(color => color.name == props.type)?.className
  })


  const emit = defineEmits<{
    (event: 'close'): void,
  }>()

  const removeToast = (): void => {
    emit('close')
  }

  const trySetTimeout = (): void => {
    if (props.timeout) {
      setTimeout(removeToast, props.timeout)
    }
  }

  onMounted(() => {
    trySetTimeout()
  })
</script>


<style>
/* TODO: This should be responsive to global CVD settings */
.p-toast__icon--success { @apply
  text-emerald-500
}

/* TODO: This should be responsive to global CVD settings */
.p-toast__icon--error { @apply
  text-rose-500
}

.p-toast__card { @apply
  max-w-sm
  w-full
  bg-slate-700
  text-slate-100
  shadow-lg
  rounded-lg
  pointer-events-auto
  ring-1
  ring-black
  ring-opacity-5
  overflow-hidden
  p-4
}

.p-toast__card-container { @apply
 flex
 justify-between
}

.p-toast__info { @apply
  flex
  items-center
}

.p-toast__icon { @apply
 flex-shrink-0
 h-6
 w-6
 pr-1
}

.p-toast__message { @apply
  text-sm
  text-slate-300
}

.p-toast__close { @apply
 ml-4
 flex-shrink-0
 flex
}

.p-toast__close-btn { @apply
  bg-slate-600
  rounded-md
  inline-flex
  text-slate-300
  hover:text-slate-50
  focus:outline-none
  focus:ring-2
  focus:ring-offset-2
  focus:ring-indigo-500
  h-5
  w-5
}
</style>