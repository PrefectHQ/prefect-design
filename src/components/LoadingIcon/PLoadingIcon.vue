<template>
  <div class="p-loading-icon" :class="iconSizeClass">
    <div class="p-loading-icon__segment" />
    <div class="p-loading-icon__segment" />
    <div class="p-loading-icon__segment" />
    <div class="p-loading-icon__segment" />
  </div>
</template>

<script setup lang="ts">
  import { computed, defineProps } from 'vue'

  const props = defineProps<{
    size?: 'small' | 'large',
  }>()
  const iconSizeClass = computed(() => props.size && `p-loading-icon--${props.size}`)
</script>

<style>
.p-loading-icon { @apply
  relative
  w-4
  h-4
}

.p-loading-icon--small { @apply
  w-3
  h-3
}

.p-loading-icon--large { @apply
  w-5
  h-5
}

.p-loading-icon__segment {
  animation: loading-icon 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;

  @apply
  absolute
  w-full
  h-full
  border-2
  border-current
  border-r-transparent
  border-b-transparent
  border-l-transparent
  rounded-[50%]
  top-[50%]
  left-[50%]
}

.p-loading-icon__segment:nth-child(1) {
  animation-delay: -450ms;
}

.p-loading-icon__segment:nth-child(2) {
  animation-delay: -300ms;
}

.p-loading-icon__segment:nth-child(3) {
  animation-delay: -150ms;
}

@keyframes loading-icon {
  0% {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  100% {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}
</style>