<template>
  <div class="min-h-full">
    <div class="mt-6 h-screen w-full">
      <resizable-section class="layout-resizable-section">
        <div class="layout">
          <div class="layout-section app-nav-1" />
          <div class="layout-section app-nav-2" />
          <div class="layout-section app-content" />
        </div>
      </resizable-section>
    </div>
  </div>
</template>


<script lang="ts" setup>
  import ResizableSection from '../components/ResizableSection.vue'
</script>

<style>
.layout-section { @apply
   w-full h-[200px] bg-slate-500;
}

.layout-resizable-section { @apply
  h-[400px];
}

.layout {
  @apply h-full w-full grid p-8;

  grid-template-columns: repeat(auto-fit, minmax(20ch, 1fr));
  column-gap: 8px;
  row-gap: 8px;
}
</style>
