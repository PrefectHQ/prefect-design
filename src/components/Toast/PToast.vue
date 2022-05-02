<template>
  <div class="p-toast__container">
    <transition>
      <div class="p-toast__card">
        <div class="flex items-start">
          <!--
            <div class="p-toast__icon">
            <p-icon :icon="icon" aria-hidden="true" />
            </div>
          -->
          <div class="p-toast__info">
            <!--
              <p class="p-toast__header">
              <slot name="header" />
              </p>
            -->
            <p class="p-toast__message">
              I am a toast, and this is amazing
              {{ toast }}
              <!-- <slot name="message" /> -->
            </p>
          </div>
          <div class="p-toast__close">
            <!--
              <button class="p-toast__close-btn" @click="show = false">
              <span class="sr-only">Close</span>
              <p-icon class="" icon="XIcon" aria-hidden="true" />
              </button>
            -->
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
  import { computed, PropType, ref, withDefaults } from 'vue'
  import { Icon } from '@/types/icon'

  // const props = withDefaults(defineProps<{
  //   icon: string,
  // }>(), {
  //   // icon: 'default',
  // })

  const props = defineProps<{
    toast: any,
  }>()


  const iconMap: Record<string, string> = {
    default: 'InformationCircleItem',
    success: 'CheckCircleIcon',
    error: 'XCircleIcon',
  }

  // const compyteIcon = computed(() => {
  //     return props.icon?
  // })
</script>


<style>
/* .p-toast { @apply
  fixed
  inset-0
  flex
  items-end
  px-4
  py-6
  pointer-events-none
  sm:p-6
} */

.p-toast__container { @apply
 w-full
 flex
 flex-col
 space-y-4
 items-end
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
}

.p-toast__icon { @apply
 flex-shrink-0
 h-6
 w-6
}

.p-toast__info { @apply
  ml-3
  w-0
  flex-1
  pt-0.5
}

.p-toast__header { @apply
  text-sm
  font-medium
  text-gray-900
}

.p-toast__message { @apply
   mt-1
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