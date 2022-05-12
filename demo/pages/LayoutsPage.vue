<template>
  <div class="min-h-full">
    <div class="mt-6 h-screen w-full">
      <resizable-section>
        <div class="layout-section" />
      </resizable-section>
    </div>
  </div>
</template>


<script lang="ts" setup>
  import ResizableSection from '../components/ResizableSection.vue'
</script>

<style>
.layout-section { @apply
   w-full h-[400px];
}
</style>
