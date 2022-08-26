<template>
  <Section heading="Full Layout">
    <resizable-section class="h-[200px]">
      <p-layout-full class="bg-slate-100">
        <template #header>
          <div class="bg-slate-300 p-2">
            <p>Header</p>
          </div>
        </template>

        <div class="bg-indigo-500 layout-full-section__box" />
        <div class="bg-violet-500 layout-full-section__box" />
        <div class="bg-lime-500 layout-full-section__box" />
        <div class="bg-amber-500 layout-full-section__box" />
        <div class="bg-rose-500 layout-full-section__box" />
      </p-layout-full>
    </resizable-section>
  </Section>
</template>

<script lang="ts" setup>
  import ResizableSection from './ResizableSection.vue'
  import Section from './Section.vue'
</script>

<style>
.layout-full-section__box {
  @apply
  w-full
  h-12;
}
</style>