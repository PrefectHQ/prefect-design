<template>
  <div class="max-w-full min-h-full app">
    <template v-if="!media.lg">
      <PGlobalSidebar class="app__mobile-menu">
        <template #upper-links>
          <p-icon icon="Prefect" class="app__prefect-icon" />
          <span class="text-slate-200">Prefect</span>
        </template>
        <template #bottom-links>
          <PIcon icon="Bars3Icon" class="app__menu-icon" @click="toggle" />
        </template>
      </PGlobalSidebar>
    </template>

    <p-layout-resizable :disabled="!media.sm" class="app__layout">
      <template v-if="media.lg" #aside>
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
  import { computed, watchEffect } from 'vue'
  import AppNavigationBar from '@/demo/components/AppNavigationBar.vue'
  import { mobileMenuOpen, toggle } from '@/demo/router/menu'

  const showMenu = computed(() => media.lg || mobileMenuOpen.value)

  watchEffect(() => document.body.classList.toggle('body-scrolling-disabled', showMenu.value && !media.lg))

  useColorTheme()
</script>

<style>
.body-scrolling-disabled { @apply
  overflow-hidden
}

.app { @apply
  text-foreground
  bg-background-600
  dark:bg-background-400
}

.app__layout {
  --p-layout-resizable-aside-width: 256px;
  --p-layout-resizable-aside-max-width: 50vw;
  --p-layout-resizable-aside-min-width: 256px;
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
  max-h-screen
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

@screen lg {
  .app {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>