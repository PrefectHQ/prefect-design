<template>
  <resizable-section>
    <p-default-layout class="bg-slate-100">
      <template #header>
        <div class="bg-slate-300 h-20 p-4">
          Header
        </div>
      </template>
      <template #content>
        <div class="bg-slate-300 h-36 p-4">
          Content
        </div>
      </template>
    </p-default-layout>
  </resizable-section>
</template>

<script lang="ts" setup>
  import ResizableSection from '../components/ResizableSection.vue'
</script>