<template>
  <Section heading="Well Layout">
    <resizable-section class="h-[400px]">
      <p-layout-well class="bg-slate-100">
        <template #header>
          <div class="bg-slate-300 h-full p-4">
            Header
          </div>
        </template>

        <div class="bg-indigo-500 layout-well-section__box" />
        <div class="bg-violet-500 layout-well-section__box" />
        <div class="bg-lime-500 layout-well-section__box" />
        <div class="bg-amber-500 layout-well-section__box" />
        <div class="bg-rose-500 layout-well-section__box" />

        <template #well>
          <div class="bg-slate-300 h-full p-4">
            Well
          </div>
        </template>
      </p-layout-well>
    </resizable-section>
  </Section>
</template>

<script lang="ts" setup>
  import ResizableSection from '../../components/ResizableSection.vue'
  import Section from '../../components/Section.vue'
</script>

<style>
.layout-well-section__box {
  @apply
  w-full
  h-12;
}
</style>