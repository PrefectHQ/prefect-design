<template>
  <Section heading="Full Layout">
    <resizable-section class="h-[200px]">
      <p-layout-full class="bg-slate-100">
        <template #header>
          <div class="bg-slate-300 p-2">
            <p>Header</p>
            <p>Header</p>
          </div>
        </template>
        <template #content>
          <div>
            <p>Content</p>
            <p>Content</p>
            <p>Content</p>
            <p>Content</p>
            <p>Content</p>
            <p>Content</p>
          </div>
        </template>
      </p-layout-full>
    </resizable-section>
  </Section>
</template>

<script lang="ts" setup>
  import ResizableSection from '../components/ResizableSection.vue'
  import Section from '../components/Section.vue'
</script>