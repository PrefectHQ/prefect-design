<template>
  <div class="min-h-full">
    <!-- TODO: Replace this nav with sidebar nav from the library -->
    <!-- TODO: Break out icons, typography, colors (new), compositions (new) into their own pages -->
    <nav class="max-w-7xl mx-auto px-4 pt-10 sm:px-6 lg:px-8 flex">
      <router-link to="components">
        Components
      </router-link>

      <router-link to="layouts" class="ml-2">
        Layouts
      </router-link>
    </nav>
    <router-view class="max-w-7xl mx-auto sm:px-6 lg:px-8" />
  </div>
</template>

<style>
.router-link-active {
  font-weight: bold;
}

a:hover {
  text-decoration: underline;
}
</style>