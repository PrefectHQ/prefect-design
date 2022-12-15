<template>
  <div aria-live="assertive" class="p-toast-container">
    <transition-group name="toast">
      <div v-for="{ id, message, dismissible, timeout, type, dismiss } in queue" :key="id" class="p-toast-container__toast">
        <PToast v-bind="{ dismissible, timeout, type }" @close="dismiss">
          <template v-if="isStringMessage(message)">
            {{ message }}
          </template>
          <template v-else>
            <component :is="message" />
          </template>
        </PToast>
      </div>
    </transition-group>
  </div>
</template>

<script setup lang="ts">
  import { Component as ComponentType } from 'vue'
  import PToast from '@/components/Toast/PToast.vue'
  import { queue } from '@/plugins/Toast'

  function isStringMessage(message: string | ComponentType): message is string {
    return typeof message === 'string'
  }
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

.p-toast-container__toast { @apply
  pb-4
}

.toast-enter-active {
  transition: transform 0.75s, opacity 0.75s;

  @apply
  opacity-0
  translate-y-full
}

.toast-enter-active ~ .p-toast-container__toast { @apply
  translate-y-full
  transition-transform
  duration-700
}

.toast-enter-to { @apply
  opacity-100
  translate-y-0
}

.toast-enter-to ~ .p-toast-container__toast { @apply
  translate-y-0
}

.toast-leave-active {
  transition: transform 0.75s, opacity 0.75s;

  @apply
  opacity-100
  translate-x-0
}

.toast-leave-active ~ .p-toast-container__toast { @apply
  translate-x-0
  transition-transform
  duration-700
}

.toast-leave-to { @apply
  opacity-0
  translate-x-full
}

.toast-leave-to ~ .p-toast-container__toast { @apply
  translate-y-full
}
</style>
