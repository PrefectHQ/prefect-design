<template>
  <p-navigation-bar class="app-navigation-bar" :class="classes.root" v-bind="{ horizontal }">
    <template #leading>
      <slot name="leading" v-bind="{ horizontal }">
        <p-icon class="app-navigation-bar__logo" icon="PrefectLight" @click="handleLogoClick" />
        <span v-if="!horizontal" class="app-navigation-bar__heading">Prefect Design</span>
        <AppSearch />
      </slot>
    </template>

    <template v-if="horizontal">
      <p-drawer v-model="showDrawer" class="test-class" data-test="hello-attr">
        <AppNavigationBar class="app-navigation-bar__drawer">
          <template #leading>
            <p-icon class="app-navigation-bar__logo" icon="PrefectLight" @click="handleLogoClick" />
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

  const handleLogoClick = (): void => {
    console.log('logo clicked')
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
  py-4
  px-2
  w-full
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
  bg-black
  w-full
  max-w-[theme(screens.sm)]
}

.app-navigation-bar .p-context-accordion-item__title,
.app-navigation-bar .p-context-nav-item { @apply
  capitalize
}

.app-navigation-bar__trailing { @apply
  flex
  items-center
  py-4
}
</style>