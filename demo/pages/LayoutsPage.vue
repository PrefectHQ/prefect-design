<template>
  <div class="min-h-full">
    <div class="mt-6 h-screen w-full">
      <resizable-section class="layout-resizable-section">
        <div class="layout">
          <div class="layout-section layout__nav-1" />
          <div class="layout-section layout__nav-2" />
          <div class="layout-section layout__content" />
        </div>
      </resizable-section>
    </div>
  </div>
</template>


<script lang="ts" setup>
  import ResizableSection from '../components/ResizableSection.vue'
</script>

<style>
.layout-resizable-section { @apply
  h-[400px];
}

.layout-section { @apply
   w-full h-full bg-slate-300;
}

.layout--desktop {
  grid-template-areas: "nav-1 nav-2 content";
  grid-template-columns: 64px 200px 1fr;
  grid-template-rows: 1fr;
}

.layout--mobile {
  grid-template-areas:
    "nav-1"
    "nav-2"
    "content"
  ;
  grid-template-columns: 1fr;
  grid-template-rows: 64px 64px 1fr;
}

.layout__nav-1 {
  @apply bg-slate-900;
  grid-area: nav-1;
}

.layout__nav-2 {
  @apply bg-slate-700;
  grid-area: nav-2;
}

.layout__content {
  @apply min-h-[400px];
  grid-area: content;
}

.layout {
  @apply min-h-screen w-screen layout--mobile grid p-8;
}

@screen sm {
  .layout {
    @apply layout--desktop;
  }

  .layout__nav-1 {
    @apply w-[64px] h-full;
  }

  .layout__nav-2 {
    @apply w-[200px] h-full;
  }

  .layout__content {
    @apply w-full h-full;
  }
}
</style>
