<template>
  <Section heading="Global Sidebar">
    <p-toggle v-model="showSidebar" @click="$emit('show')">
      <template #append>
        <span class="text-sm font-medium text-gray-900">Show Sidebar</span>
      </template>
    </p-toggle>
    <Teleport to="#app">
      <transition name="slide">
        <p-global-sidebar v-if="showSidebar" />
      </transition>
    </Teleport>
  </Section>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import Section from '../components/Section.vue'

  const showSidebar = ref(false)

  defineEmits<{
    (event: 'show'): void,
  }>()
</script>

<style>
.slide-enter-active {
  @apply
  transition-all
  duration-500
}

.slide-leave-active {
  @apply
  transition-all
  duration-500
}

.slide-enter-from,
.slide-leave-to {
  @apply
  -translate-y-full
  sm:-translate-x-full
  sm:-translate-y-0
 }
</style>