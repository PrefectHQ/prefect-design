<template>
  <Section heading="Context Sidebar and Nav Items">
    <p-toggle v-model="showContextSidebar">
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
            <div class="flex flex-col my-3 sm:mt-0">
              <span class="font-normal text-sm mx-3">Acme Technologies</span>
              <span class="font-bold text-base mx-3">DS Team Q1 collection</span>
            </div>
          </template>

          <template #upper-links>
            <router-link
              v-slot="{ href, navigate, isExactActive }"
              to="/dashboard"
              custom
            >
              <p-context-nav-item :is-active="isExactActive" :href="href" title="Dashboard" icon="HomeIcon" @click="navigate" />
            </router-link>
            <router-link
              v-slot="{ href, navigate, isExactActive }"
              to="/flows"
              custom
            >
              <p-context-nav-item :is-active="isExactActive" :href="href" title="Flows" icon="Flow" @click="navigate" />
            </router-link>
          </template>

          <template #bottom-links>
            <router-link
              v-slot="{ href, navigate, isExactActive }"
              to="/edit"
              custom
            >
              <p-context-nav-item :is-active="isExactActive" :href="href" title="Edit Settings" icon="PencilIcon" @click="navigate" />
            </router-link>
            <router-link
              v-slot="{ href, navigate, isExactActive }"
              to="/leave"
              custom
            >
              <p-context-nav-item :is-active="isExactActive" :href="href" title="Leave Workspace" icon="LogoutIcon" @click="navigate" />
            </router-link>
          </template>
        </p-context-sidebar>
      </transition>
    </Teleport>
  </Section>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import Section from '../components/Section.vue'

  const showContextSidebar = ref(false)
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