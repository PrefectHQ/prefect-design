<template>
  <Section heading="Sidebar Layout">
    <resizable-section class="h-[400px]">
      <div class="layout">
        <p-global-sidebar class="layout__nav-1" />
        <p-context-sidebar class="layout__nav-2" />
        <div class="layout__content" />
      </div>
    </resizable-section>
  </Section>
</template>

<script lang="ts" setup>
  import ResizableSection from './ResizableSection.vue'
  import Section from './Section.vue'
</script>


  <style>
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
  grid-area: nav-1;
  }

  .layout__nav-2 {
  grid-area: nav-2;
  }

  .layout__content {
  @apply min-h-[400px] bg-slate-100;
  grid-area: content;
  }

  .layout {
  @apply min-h-screen w-screen layout--mobile grid;
  }

  @screen lg {
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

