<template>
  <div class="min-h-full">
    <div class="py-10 px-10">
      <header>
        <div>
          <h1 class="text-3xl font-bold leading-tight text-gray-900">
            Layouts
          </h1>
        </div>
      </header>
      <main>
        <div class="">
          <sidebar-layout-section />

          <default-layout-section />

          <well-layout-section />

          <full-layout-section />
        </div>
      </main>
    </div>
  </div>
</template>


<script lang="ts" setup>
  import DefaultLayoutSection from '../sections/DefaultLayoutSection.vue'
  import FullLayoutSection from '../sections/FullLayoutSection.vue'
  import SidebarLayoutSection from '../sections/SidebarLayoutSection.vue'
  import WellLayoutSection from '../sections/WellLayoutSection.vue'
</script>


  <style>
  .layout-resizable-section { @apply
  h-[400px];
  }
  </style>