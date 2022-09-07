<template>
  <ComponentPage title="Default Layout" :demos="[{ title: 'Default Layout' }]">
    <template #default-layout>
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
    </template>
  </ComponentPage>
</template>

<script lang="ts" setup>
  import ComponentPage from '@/demo/components/ComponentPage.vue'
</script>

<style>
.layout-default-section__box {
  @apply
  w-full
  h-12;
}
</style>