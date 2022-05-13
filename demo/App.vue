<template>
  <div class="min-h-full">
    <!-- TODO: Replace this nav with sidebar nav from the library -->
    <!-- TODO: Break out icons, typography, colors (new), compositions (new) into their own pages -->
    <nav class="max-w-7xl mx-auto px-4 pt-10 sm:px-6 lg:px-8">
      <router-link to="/components">
        Components
      </router-link>
    </nav>
    <router-view class="max-w-7xl mx-auto sm:px-6 lg:px-8" />
  </div>
</template>

<style>
a {
  text-decoration: underline;
}
</style>
