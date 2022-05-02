<template>
  <transition>
    <div class="p-toast__card">
      <p-icon :icon="icon" aria-hidden="true" class="p-toast__icon" :class="color" />
      <p class="p-toast__message">
        {{ toast.message }}
      </p>

      <div class="p-toast__close">
        <!--
          <button class="p-toast__close-btn" @click="show = false">
          <span class="sr-only">Close</span>
          <p-icon class="" icon="XIcon" aria-hidden="true" />
          </button>
        -->
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
  import { computed } from 'vue'
  import PIcon from '@/components/Icon/PIcon.vue'
  import { Toast } from '@/plugins/Toast'
  import { Icon } from '@/types/icon'

  const props = defineProps<{
    toast: Toast,
  }>()


  const iconMap: Record<string, string> = {
    success: 'CheckCircleIcon',
    error: 'XCircleIcon',
  }

  const icon = computed(() => iconMap[props.toast.type] as Icon)

  const colorClasses = [
    { className: 'p-toast__icon--success', name: 'success'  },
    { className: 'p-toast__icon--error', name: 'error'  },
  ]

  const color = computed(() => {
    return colorClasses.find(color => color.name == props.toast.type)?.className
  })
</script>


<style>
:root {
  --success: #2AC769;
  --error: #FB4E4E;
}

.p-toast__icon--success {
  fill: var(--success)
}

.p-toast__icon--error {
  fill: var(--error)
}

.p-toast__card { @apply
  flex
  items-center
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

.v-enter-active-class { @apply
  transform
  ease-out
  duration-300
  transition
}

.v-enter-from { @apply
  translate-y-2
  opacity-0
  sm:translate-y-0
  sm:translate-x-2
}

.v-enter-to { @apply
  translate-y-0
  opacity-100
  sm:translate-x-0
}

.v-leave-active { @apply
  transition
  ease-in
  duration-100
}

.v-leave-from { @apply
  opacity-100
}

.v-leave-to-class{ @apply
  opacity-0
}
</style>