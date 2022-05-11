<template>
  <transition>
    <Section heading="Global Sidebar" :class="showGlobalSidebar ? 'ml-12' : ''">
      <p-toggle @update:value="toggleGlobalSidebar" @click="toggleGlobalSidebar">
        <template #append>
          <span class="text-sm font-medium text-gray-900">Show Sidebar</span>
        </template>
      </p-toggle>

      <Teleport to="#app">
        <transition name="slide">
          <p-global-sidebar
            v-if="showGlobalSidebar"
          >
            <template #upper-links>
              <p-icon icon="PrefectGradient" />
              <p-icon icon="FolderIcon" />
            </template>

            <template #bottom-links>
              <p-icon icon="LightBulbIcon" />
            </template>

            <template #profile-button>
              <button v-if="profileImage" type="button">
                <img :src="profileImage" alt="Profile image">
              </button>
              <p-button rounded icon="UserIcon" />
            </template>
          </p-global-sidebar>
        </transition>
      </Teleport>
    </Section>
  </transition>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import Section from '../components/Section.vue'

  const emit = defineEmits<{
    (event: 'update:value', value: boolean): void,
  }>()

  const showGlobalSidebar = ref(false)

  const toggleGlobalSidebar = (): void => {
    showGlobalSidebar.value = !showGlobalSidebar.value
    emit('update:value', showGlobalSidebar.value)
  }

  const profileImage = ref('https://randomuser.me/api/portraits/women/49.jpg')
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