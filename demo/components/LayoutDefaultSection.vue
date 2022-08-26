<template>
  <Section heading="Default Layout">
    <resizable-section class="h-[400px]">
      <p-layout-default class="bg-slate-100">
        <template #header>
          <div class="bg-slate-300 h-full p-4">
            Header
          </div>
        </template>

        <div class="bg-indigo-500 layout-default-section__box" />
        <div class="bg-violet-500 layout-default-section__box" />
        <div class="bg-lime-500 layout-default-section__box" />
        <div class="bg-amber-500 layout-default-section__box" />
        <div class="bg-rose-500 layout-default-section__box" />
      </p-layout-default>
    </resizable-section>
  </Section>
</template>

<script lang="ts" setup>
  import ResizableSection from './ResizableSection.vue'
  import Section from './Section.vue'
</script>

<style>
.layout-default-section__box {
  @apply
  w-full
  h-12;
}
</style>