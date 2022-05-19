<template>
  <div class="max-w-full min-h-full app">
    <!-- TODO: Break out icons, typography, colors (new), compositions (new) into their own pages -->
    <SidebarsSection />
    <router-view class="w-full mx-auto py-10 sm:px-6 lg:px-8" />
  </div>
</template>

<script lang="ts" setup>
  import SidebarsSection from './sections/SidebarsSection.vue'
</script>

<style>
.app {
  display: grid;
  grid-template-columns: 256px minmax(0, 1fr);
}
</style>