<template>
  <p-navigation-bar class="app-navigation-bar" :class="classes.root" v-bind="{ horizontal }">
    <template #leading>
      <slot name="leading" v-bind="{ horizontal }">
        <template v-if="horizontal">
          <p-button class="app-navigation-bar__drawer-button" inset size="sm" icon="Bars3Icon" @click="toggleDrawer" />
        </template>
        <template v-else>
          <p-icon class="app-navigation-bar__logo" icon="Prefect" @click="toggleDrawer" />
          <span class="app-navigation-bar__heading">Prefect Design</span>
        </template>

        <AppSearch />
      </slot>
    </template>

    <template v-if="horizontal">
      <p-drawer v-model="showDrawer" resizable>
        <AppNavigationBar class="app-navigation-bar__drawer">
          <template #leading>
            <p-icon class="app-navigation-bar__logo" icon="PrefectLight" @click="toggleDrawer" />
            <span class="app-navigation-bar__heading">Prefect Design</span>
          </template>
        </AppNavigationBar>
      </p-drawer>
    </template>

    <template v-else>
      <AppComponentNavigationItems />
    </template>

    <template v-if="!horizontal" #trailing>
      <div class="app-navigation-bar__trailing">
        <p-divider />
        <p-theme-toggle />
      </div>
    </template>
  </p-navigation-bar>
</template>

<script lang="ts" setup>
  import { computed, ref } from 'vue'
  import AppComponentNavigationItems from '@/demo/components/AppComponentNavigationItems.vue'
  import AppSearch from '@/demo/components/AppSearch.vue'

  const props = defineProps<{
    horizontal?: boolean,
  }>()

  const showDrawer = ref(false)


  const classes = computed(() => ({
    root: {
      'app-navigation-bar--horizontal': props.horizontal,
    },
  }))

  const toggleDrawer = (): void => {
    showDrawer.value = !showDrawer.value
  }
</script>

<style>
.app-navigation-bar {
  --p-layout-resizable-aside-width: 256px;
  --p-layout-resizable-aside-max-width: 512px;
  --p-layout-resizable-aside-min-width: 256px;
}

.app-navigation-bar { @apply
  pt-4
  px-2
  w-full
}

.app-navigation-bar__drawer-button { @apply
  shadow-none
}

.app-navigation-bar__drawer-button .p-icon { @apply
  h-5
  w-5
}

.app-navigation-bar__logo { @apply
  h-10
  w-10
}

.app-navigation-bar__heading { @apply
  font-normal
  text-xl
}

.app-navigation-bar--horizontal { @apply
  py-2
  px-4
}

.app-navigation-bar__drawer { @apply
  w-full
  max-w-[theme(screens.sm)]
}

.app-navigation-bar .p-context-accordion-item__title,
.app-navigation-bar .p-context-nav-item { @apply
  capitalize
}

.app-navigation-bar__trailing { @apply
  flex
  flex-col
  items-center
  w-full
  py-4
}
</style>