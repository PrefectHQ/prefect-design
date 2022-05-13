<template>
  <div class="min-h-full grid sm:grid-cols-[80px_1fr] grid-cols-1">
    <!-- TODO: Break out icons, typography, colors (new), compositions (new) into their own pages -->
    <div class="h-16">
      <GlobalSidebarSection />
    </div>
    <div>
      <nav class="max-w-7xl mx-auto px-4 pt-10 sm:px-6 lg:px-8">
        <router-link to="/components">
          Components
        </router-link>
      </nav>
      <router-view class="max-w-7xl mx-auto sm:px-6 lg:px-8" />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import GlobalSidebarSection from './sections/GlobalSidebarSection.vue'
</script>

<style>
a {
  text-decoration: underline;
}
</style>
