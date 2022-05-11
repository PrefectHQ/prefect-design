<template>
  <Section heading="Context Sidebar">
    <p-toggle @update:value="toggleContextSidebar" @click="toggleContextSidebar">
      <template #append>
        <span class="text-sm font-medium text-gray-900">Show Context Sidebar</span>
      </template>
    </p-toggle>

    <Teleport to="#app">
      <transition name="slide">
        <p-context-sidebar
          v-if="showContextSidebar"
          class="right-0"
        >
          <template #header>
            This is header
          </template>

          <template #upper-links>
            <p>link-1</p>
            <p>link-2</p>
          </template>

          <template #bottom-links>
            <p>link-3</p>
          </template>
        </p-context-sidebar>
      </transition>
    </Teleport>
  </Section>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import Section from '../components/Section.vue'

  const emit = defineEmits<{
    (event: 'update:value', value: boolean): void,
  }>()

  const showContextSidebar = ref(false)

  const toggleContextSidebar = (): void => {
    showContextSidebar.value = !showContextSidebar.value
    emit('update:value', showContextSidebar.value)
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
  sm:translate-x-full
  sm:translate-y-0
 }
</style>