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
          <layout-sidebar-section />

          <layout-default-section />

          <layout-well-section />

          <layout-full-section />
        </div>
      </main>
    </div>
  </div>
</template>


<script lang="ts" setup>
  import LayoutDefaultSection from '../sections/LayoutDefaultSection.vue'
  import LayoutFullSection from '../sections/LayoutFullSection.vue'
  import LayoutSidebarSection from '../sections/LayoutSidebarSection.vue'
  import LayoutWellSection from '../sections/LayoutWellSection.vue'
</script>