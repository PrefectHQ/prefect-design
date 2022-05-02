<template>
  <div aria-live="assertive" class="p-toast-container">
    <!-- <p-toast /> -->
    <template v-for="toast in queue" :key="toast.id">
      <p-toast :toast="toast" @close="toast.dismiss" />
    </template>
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
  items-end
  px-4
  py-6
  pointer-events-none
  sm:p-6
}
</style>