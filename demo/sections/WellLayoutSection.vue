<template>
  <Section heading="Well Layout">
    <resizable-section class="h-[400px]">
      <p-well-layout class="bg-slate-100">
        <template #header>
          <div class="bg-slate-300 h-full p-4">
            Header
          </div>
        </template>
        <template #content>
          <div class="bg-slate-300 h-full p-4">
            <p>Content</p>
            <p>Content</p>
            <p>Content</p>
            <p>Content</p>
          </div>
        </template>

        <template #well>
          <div class="bg-slate-300 h-full p-4">
            Well
          </div>
        </template>
      </p-well-layout>
    </resizable-section>
  </Section>
</template>

<script lang="ts" setup>
  import ResizableSection from '../components/ResizableSection.vue'
  import Section from '../components/Section.vue'
</script>