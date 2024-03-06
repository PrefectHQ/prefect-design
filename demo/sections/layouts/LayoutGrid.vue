<template>
  <ComponentPage title="Grid Layout" :demos="[{ title: 'Well Layout' }]">
    <template #well-layout>
      <p-layout-well-toolbar class="bg-slate-100">
        <template #header-leading>
          <div class="h-full">
            Header Leading
          </div>
        </template>
        <template #header-trailing>
          <div class="h-full">
            Header Trailing
          </div>
        </template>
        <template #toolbar-leading>
          <div class="h-full">
            Toolbar Leading
          </div>
        </template>
        <template #toolbar-trailing>
          <div class="h-full">
            Toolbar Trailing
          </div>
        </template>
        <div class="p-background h-full">
          <div class="bg-gray-300 layout-well-section__box" />
          <div class="bg-gray-200 layout-well-section__box" />
          <div class="bg-gray-300 layout-well-section__box" />
          <div class="bg-gray-200 layout-well-section__box" />
          <div class="bg-gray-300 layout-well-section__box" />
        </div>
        <template #left-rail>
          <div class="h-full">
            Left Rail
          </div>
        </template>
        <template #right-rail>
          <div class="h-full">
            Right Rail
          </div>
        </template>
      </p-layout-well-toolbar>
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