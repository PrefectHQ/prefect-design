<template>
  <div class="min-h-full">
    <div class="mt-6 h-screen w-full">
      <resizable-section class="layout-resizable-section">
        <div class="layout-container">
          <div class="layout-section" />
          <div class="layout-section" />
          <div class="layout-section" />
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

.layout-container { @apply
  h-full w-full grid gap-8 p-8;

  grid-template-columns: repeat(auto-fit, minmax(20ch, 1fr));
}
</style>
