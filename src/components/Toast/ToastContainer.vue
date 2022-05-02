<template>
  <div aria-live="assertive" class="p-toast-container">
    <!-- <p-toast /> -->
    <!-- <transition-group name="toast-list"> -->
    <template v-for="toast in queue" :key="toast.id">
      <p-toast :toast="toast" @close="toast.dismiss" />
    </template>
    <!-- </transition-group> -->
  </div>
</template>

<script setup lang="ts">
  import PToast from './PToast.vue'
  import { queue } from '@/plugins/Toast'
</script>

<style>
.p-toast-container { @apply
  fixed
  inset-0
  flex
  flex-col-reverse
  items-end
  px-4
  py-6
  pointer-events-none
  sm:p-6
}


/* .toast-list-enter-active-class { @apply
  transform
  ease-out
  duration-300
  transition
}

.toast-list-enter-from { @apply
  translate-y-2
  opacity-0
  sm:translate-y-0
  sm:translate-x-2
}

.toast-list-enter-to { @apply
  translate-y-0
  opacity-100
  sm:translate-x-0
}

.toast-list-leave-active { @apply
  transition
  ease-in
  duration-100
}

.toast-list-leave-from { @apply
  opacity-100
}

.toast-list-leave-to-class{ @apply
  opacity-0
} */
</style>
