<template>
  <div class="min-h-full">
    <div class="py-10">
      <header>
        <div>
          <h1 class="text-3xl font-bold leading-tight text-gray-900">
            Components
          </h1>
        </div>
      </header>
      <main>
        <div>
          <PopOverSection />

          <TypographySection />

          <BreadCrumbsSection />

          <WellKeyValueSection />

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

          <ListItemsSection />
        </div>
      </main>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import BreadCrumbsSection from '../sections/BreadCrumbsSection.vue'
  import ButtonsSection from '../sections/ButtonsSection.vue'
  import CodeSection from '../sections/CodeSection.vue'
  import FormsSection from '../sections/FormsSection.vue'
  import IconsSection from '../sections/IconsSection.vue'
  import IconTextSection from '../sections/IconTextSection.vue'
  import ListItemsSection from '../sections/ListItemsSection.vue'
  import ModalsSection from '../sections/ModalsSection.vue'
  import PopOverSection from '../sections/PopOverSection.vue'
  import TablesSection from '../sections/TablesSection.vue'
  import TabSection from '../sections/TabSection.vue'
  import TagsSection from '../sections/TagsSection.vue'
  import ToastsSection from '../sections/ToastsSection.vue'
  import TogglesSection from '../sections/TogglesSection.vue'
  import TypographySection from '../sections/TypographySection.vue'
  import WellKeyValueSection from '../sections/WellKeyValueSection.vue'
</script>
