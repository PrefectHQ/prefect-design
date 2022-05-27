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

        <div class="bg-indigo-500 box" />
        <div class="bg-violet-500 box" />
        <div class="bg-lime-500 box" />
        <div class="bg-amber-500 box" />
        <div class="bg-rose-500 box" />
      </p-layout-full>
    </resizable-section>
  </Section>
</template>

<script lang="ts" setup>
  import ResizableSection from '../components/ResizableSection.vue'
  import Section from '../components/Section.vue'
</script>

<style>
.box {
  @apply
  w-full
  h-12;
}
</style>