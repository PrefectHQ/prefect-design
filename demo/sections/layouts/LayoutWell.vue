<template>
  <ComponentPage title="Well Layout" :demos="[{ title: 'Well Layout' }]">
    <template #well-layout>
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
    </template>
  </ComponentPage>
</template>

<script lang="ts" setup>
  import ComponentPage from '@/demo/components/ComponentPage.vue'
</script>

<style>
.layout-well-section__box {
  @apply
  w-full
  h-12;
}
</style>