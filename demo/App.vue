<template>
  <div class="min h-full">
    <transition>
      <p-global-sidebar v-if="showSidebar" />
    </transition>


    <div class="py-10" :class="calc">
      <header>
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 class="text-3xl font-bold leading-tight text-gray-900">
            Dashboard
          </h1>
        </div>
      </header>
      <main>
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <Section heading="Global Sidebar">
            <p-toggle v-model="showSidebar">
              <template #append>
                <span class="text-sm font-medium text-gray-900">Show Sidebar</span>
              </template>
            </p-toggle>
          </Section>


          <!-- <GlobalSidebarSection /> -->

          <TypographySection />

          <BreadCrumbsSection />

          <ButtonsSection />

          <FormsSection />

          <TogglesSection />

          <TagsSection />

          <ToastsSection />

          <ModalsSection />

          <IconsSection />

          <CodeSection />

          <TablesSection />

          <IconTextSection />
        </div>
      </main>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { computed } from '@vue/reactivity'
  import { ref } from 'vue'
  import Section from './components/Section.vue'
  import BreadCrumbsSection from './sections/BreadCrumbsSection.vue'
  import ButtonsSection from './sections/ButtonsSection.vue'
  import CodeSection from './sections/CodeSection.vue'
  import FormsSection from './sections/FormsSection.vue'
  import IconsSection from './sections/IconsSection.vue'
  import IconTextSection from './sections/IconTextSection.vue'
  import ModalsSection from './sections/ModalsSection.vue'
  import TablesSection from './sections/TablesSection.vue'
  import TagsSection from './sections/TagsSection.vue'
  import ToastsSection from './sections/ToastsSection.vue'
  import TogglesSection from './sections/TogglesSection.vue'
  import TypographySection from './sections/TypographySection.vue'


  const showSidebar = ref(false)

  const calc = computed(() => {
    return showSidebar.value ? 'ease-in' : 'ease-out'
  })
</script>

<style>
.ease-out {
  @apply
  transition-all
  duration-500
  sm:w-full
}

.ease-in {
  @apply
  transition-all
  duration-500
  translate-y-10
  translate-x-0
  sm:w-11/12
  sm:translate-y-0
  sm:translate-x-16
}

.v-enter-active {
  @apply
  transition-all
  duration-500
}

.v-leave-active {
  @apply
  transition-all
  duration-500
}

.v-enter-from,
.v-leave-to {
  @apply
  -translate-y-full
  sm:-translate-x-full
  sm:-translate-y-0
 }
</style>