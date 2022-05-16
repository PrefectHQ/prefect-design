<template>
  <div class="min-h-full grid sm:grid-cols-[320px_1fr]">
    <!-- TODO: Break out icons, typography, colors (new), compositions (new) into their own pages -->
    <SidebarsSection />
    <div>
      <router-view class="max-w-7xl mx-auto sm:px-6 lg:px-8" />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import SidebarsSection from './sections/SidebarsSection.vue'
</script>
