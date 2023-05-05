<template>
  <div class="max-w-full min-h-full app">
    <template v-if="mobileNav">
      <AppNavigationBar horizontal class="app__sidebar" />
    </template>

    <p-layout-resizable class="app__layout">
      <template v-if="!mobileNav" #aside>
        <AppNavigationBar class="app__sidebar" />
      </template>

      <suspense>
        <router-view class="app__router-view" />
      </suspense>
    </p-layout-resizable>
  </div>
</template>

<script lang="ts" setup>
  import { useColorTheme } from '@/compositions'
  import { media } from '@/utilities/media'
  import { computed } from 'vue'
  import AppNavigationBar from '@/demo/components/AppNavigationBar.vue'

  useColorTheme()

  const mobileNav = computed(() => !media.lg)
</script>

<style>
.body-scrolling-disabled { @apply
  overflow-hidden
}

.app { @apply
  text-foreground
  bg-background-900
  dark:bg-background-50
  grid
  max-h-screen
}

.app__layout {
  --p-layout-resizable-aside-size: 256px;
  --p-layout-resizable-aside-max-size: 50vw;
  --p-layout-resizable-aside-min-size: 256px;
}

.app {
  grid-template-columns: auto;
  grid-template-rows: auto 1fr;
}

@screen lg {
  .app {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
  }
}

.app__prefect-icon { @apply
  w-6
  h-6
}

.app__menu-icon { @apply
  text-foreground-500
  w-6
  h-6
  cursor-pointer
}

.app__sidebar { @apply
  w-full
}

.app__router-view { @apply
  relative
  h-full
  pb-4
  overflow-auto
  w-full
  z-0
}

.app__router-view-fade-enter-active,
.app__router-view-fade-leave-active {
  transition: opacity 0.25s ease;
}

.app__router-view-fade-enter-from,
.app__router-view-fade-leave-to {
  opacity: 0;
}
</style>