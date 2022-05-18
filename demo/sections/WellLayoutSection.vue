<template>
  <resizable-section>
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
</template>

<script lang="ts" setup>
  import ResizableSection from '../components/ResizableSection.vue'
</script>