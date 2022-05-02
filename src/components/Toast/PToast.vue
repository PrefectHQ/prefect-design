<template>
  <div class="p-toast__card">
    <div class="p-toast__card-container">
      <div class="p-toast__info">
        <p-icon :icon="icon" aria-hidden="true" class="p-toast__icon" :class="color" />
        <p class="p-toast__message">
          {{ message }}
        </p>
      </div>
      <div v-if="dismissable" class="p-toast__close">
        <button type="button" class="p-toast__close-btn" @click="removeToast">
          <span class="sr-only">Close</span>
          <p-icon class="" icon="XIcon" aria-hidden="true" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed, onMounted, withDefaults } from 'vue'
  import PIcon from '@/components/Icon/PIcon.vue'
  import { ToastType } from '@/plugins/Toast'
  import { Icon } from '@/types/icon'

  const props = withDefaults(defineProps<{
    message: string,
    dismissable?: boolean,
    timeout?: number,
    type?: ToastType,
  }>(), {
    message: '',
    timeout: 5000,
    type: 'default',
  })


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

  const setToastTimeout = (): void => {
    setTimeout(removeToast, props.timeout)
  }

  onMounted(() => {
    setToastTimeout()
  })
</script>


<style>
.p-toast__icon--success {
  fill: var(--completed)
}

.p-toast__icon--error {
  fill: var(--failed)
}

.p-toast__card { @apply
  max-w-sm
  w-full
  bg-white
  shadow-lg
  rounded-lg
  pointer-events-auto
  ring-1
  ring-black
  ring-opacity-5
  overflow-hidden
  p-4
  mb-4
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
   text-gray-500
}

.p-toast__close { @apply
 ml-4
 flex-shrink-0
 flex
}

.p-toast__close-btn { @apply
  bg-white
  rounded-md
  inline-flex
  text-gray-400
  hover:text-gray-500
  focus:outline-none
  focus:ring-2
  focus:ring-offset-2
  focus:ring-indigo-500
  h-5
  w-5
}
</style>