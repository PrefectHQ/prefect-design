<template>
  <Section heading="Global Sidebar and Sidebar Nav Items">
    <p-toggle v-model="showSidebar" @click="$emit('show-sidebar')">
      <template #append>
        <span class="text-sm font-medium text-gray-900">Show Sidebar</span>
      </template>
    </p-toggle>
    <Teleport to="#app">
      <transition name="slide">
        <p-global-sidebar v-if="showSidebar">
          <template #sidebar-top-nav-links>
            <p-icon icon="PrefectGradient" />
            <p-icon icon="FolderIcon" class="fill-slate-400" />
          </template>

          <template #sidebar-bottom-nav-links>
            <p-icon icon="LightBulbIcon" class="fill-slate-400" />
          </template>

          <template #sidebar-profile-menu-button>
            <button v-if="profileImage" type="button">
              <img :src="profileImage" alt="Profile image">
            </button>

            <p-button rounded icon="UserIcon" />
          </template>
        </p-global-sidebar>
      </transition>
    </Teleport>
  </Section>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import Section from '../components/Section.vue'

  const showSidebar = ref(false)
  const profileImage = ref('https://randomuser.me/api/portraits/women/49.jpg')

  defineEmits<{
    (event: 'show-sidebar'): void,
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