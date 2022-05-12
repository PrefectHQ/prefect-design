<template>
  <div class="min-h-full">
    <div class="py-10">
      <header>
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 class="text-3xl font-bold leading-tight text-gray-900">
            Dashboard
          </h1>
        </div>
      </header>
      <main>
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <PopOverSection />

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

          <TabSection />
        </div>
      </main>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import BreadCrumbsSection from './sections/BreadCrumbsSection.vue'
  import ButtonsSection from './sections/ButtonsSection.vue'
  import CodeSection from './sections/CodeSection.vue'
  import FormsSection from './sections/FormsSection.vue'
  import IconsSection from './sections/IconsSection.vue'
  import IconTextSection from './sections/IconTextSection.vue'
  import ModalsSection from './sections/ModalsSection.vue'
  import PopOverSection from './sections/PopOverSection.vue'
  import TablesSection from './sections/TablesSection.vue'
  import TabSection from './sections/TabSection.vue'
  import TagsSection from './sections/TagsSection.vue'
  import ToastsSection from './sections/ToastsSection.vue'
  import TogglesSection from './sections/TogglesSection.vue'
  import TypographySection from './sections/TypographySection.vue'
</script>
