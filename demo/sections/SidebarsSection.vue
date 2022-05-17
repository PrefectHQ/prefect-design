<template>
  <ContextSidebarSection @update:value="toggleGlobalSidebar" />


  <teleport to="body">
    <transition name="slide">
      <GlobalSidebarSection v-if="showGlobalSidebar" class="bottom-0 ml-auto" />
    </transition>
  </teleport>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import ContextSidebarSection from './ContextSidebarSection.vue'
  import GlobalSidebarSection from './GlobalSidebarSection.vue'

  const showGlobalSidebar = ref(false)

  const toggleGlobalSidebar = (value: boolean): void => {
    showGlobalSidebar.value = value
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
  translate-y-full
  sm:translate-x-full
  sm:translate-y-0
 }
</style>