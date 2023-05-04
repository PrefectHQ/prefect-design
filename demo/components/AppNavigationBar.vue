<template>
  <p-navigation-bar class="app-navigation-bar" :class="classes.root" v-bind="{ horizontal }">
    <template #leading>
      <slot name="leading" v-bind="{ horizontal }">
        <AppNavigationBarLeading :show-heading="!horizontal" @logo-click="handleLogoClick" />
      </slot>
    </template>

    <template v-if="horizontal">
      <p-drawer v-model="showDrawer">
        <AppNavigationBar class="app-navigation-bar__drawer">
          <template #leading>
            <AppNavigationBarLeading show-heading horizontal @logo-click="handleLogoClick" />
          </template>
        </AppNavigationBar>
      </p-drawer>
    </template>

    <template v-else>
      <template v-for="record in routeRecords" :key="record.name">
        <component :is="getComponentForRecord(record)" v-bind="getContextProps(record)" />
      </template>
    </template>

    <template #trailing>
      <div class="app-navigation-bar__trailing">
        <p-theme-toggle />
      </div>
    </template>
  </p-navigation-bar>
</template>

<script lang="ts" setup>
  import { PContextAccordionItem, PContextNavItem } from '@/components'
  import { ContextAccordionChildItem } from '@/types/contextAccordionChildItem'
  import { computed, ref } from 'vue'
  import { RouteLocationRaw, RouteRecordRaw } from 'vue-router'
  import AppNavigationBarLeading from '@/demo/components/AppNavigationBarLeading.vue'
  import { routeRecords } from '@/demo/router'

  const props = defineProps<{
    horizontal?: boolean,
  }>()

  const showDrawer = ref(true)

  function getComponentForRecord(record: RouteRecordRaw): typeof PContextAccordionItem | typeof PContextNavItem {
    if (record.children) {
      return PContextAccordionItem
    }

    return PContextNavItem
  }

  function getContextProps(record: RouteRecordRaw): { title: string, children: ContextAccordionChildItem[] } | { title: string, to: RouteLocationRaw } {
    const title = record.name?.toString() ?? ''

    if (!record.children) {
      const to = { name: record.name }
      return {
        title,
        to,
      }
    }

    return {
      title,
      children: record.children.map(({ name, path }) => ({
        title: `p-${path}`,
        to: { name },
      })),
    }
  }


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
.app-navigation-bar { @apply
  py-4
  px-2
  w-full
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
  min-h-[36px]
  flex
  justify-center
  items-center
}
</style>