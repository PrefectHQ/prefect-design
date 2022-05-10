<template>
  <div class="min h-full">
    <div class="py-10" :class="mainContentTransition">
      <header>
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 class="text-3xl font-bold leading-tight text-gray-900">
            Dashboard
          </h1>
        </div>
      </header>
      <main>
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <GlobalSidebarSection @show-sidebar="toggleSidebar" />

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
  import BreadCrumbsSection from './sections/BreadCrumbsSection.vue'
  import ButtonsSection from './sections/ButtonsSection.vue'
  import CodeSection from './sections/CodeSection.vue'
  import FormsSection from './sections/FormsSection.vue'
  import GlobalSidebarSection from './sections/GlobalSidebarSection.vue'
  import IconsSection from './sections/IconsSection.vue'
  import IconTextSection from './sections/IconTextSection.vue'
  import ModalsSection from './sections/ModalsSection.vue'
  import TablesSection from './sections/TablesSection.vue'
  import TagsSection from './sections/TagsSection.vue'
  import ToastsSection from './sections/ToastsSection.vue'
  import TogglesSection from './sections/TogglesSection.vue'
  import TypographySection from './sections/TypographySection.vue'


  const showSidebar = ref(false)

  const mainContentTransition = computed(() => {
    return showSidebar.value ? 'ease-in' : 'ease-out'
  })

  const toggleSidebar = (): void => {
    showSidebar.value = !showSidebar.value
  }
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
</style>