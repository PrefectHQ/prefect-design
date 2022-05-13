<template>
  <transition name="slide">
    <ContextSidebarSection v-if="showContextSidebar" class="sm:ml-16 sm:mt-0 mt-16" />
  </transition>

  <GlobalSidebarSection @update:value="toggleContextSidebar" />
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import ContextSidebarSection from './ContextSidebarSection.vue'
  import GlobalSidebarSection from './GlobalSidebarSection.vue'

  const showContextSidebar = ref(false)

  const toggleContextSidebar = (value: boolean): void => {
    showContextSidebar.value = value
  }
</script>


<style>
.slide-enter-active,
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