<template>
  <p-navigation-bar class="app-navigation-bar" :class="classes.root" v-bind="{ horizontal }">
    <template #leading>
      <div class="app-navigation-bar__leading" :class="classes.leading">
        <p-icon class="app-navigation-bar__icon" icon="PrefectLight" />
        <span v-if="!horizontal" class="app-navigation-bar__heading">Prefect Design</span>

        <p-type-ahead
          v-model="searchTerm"
          class="app-navigation-bar__search-box"
          placeholder="Search"
          :options="Object.keys(routeRecordsFlat)"
          @selected="selectedSearchTerm"
        >
          <template #append>
            <p-icon icon="MagnifyingGlassIcon" class="mr-2" />
          </template>
        </p-type-ahead>
      </div>
    </template>

    <template v-for="record in routeRecords" :key="record.name">
      <component :is="getComponentForRecord(record)" v-bind="getContextProps(record)" />
    </template>

    <template #trailing>
      <div class="app-navigation-bar__trailing" :class="classes.trailing">
        <p-theme-toggle />
      </div>
    </template>
  </p-navigation-bar>
</template>

<script lang="ts" setup>
  import { PContextAccordionItem, PContextNavItem } from '@/components'
  import { ContextAccordionChildItem } from '@/types/contextAccordionChildItem'
  import { computed, ref } from 'vue'
  import { RouteLocationRaw, RouteRecordRaw, useRouter } from 'vue-router'
  import { routeRecords } from '@/demo/router'
  import { routeRecordsFlat } from '@/demo/router/routeRecordsFlat'

  const props = defineProps<{
    horizontal?: boolean,
  }>()

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

  const router = useRouter()
  const searchTerm = ref('')

  function selectedSearchTerm(value: string | null): void {
    searchTerm.value = ''

    if (value && routeRecordsFlat[value]) {
      router.push(routeRecordsFlat[value])
    }
  }

  const classes = computed(() => ({
    root: {
      'app-navigation-bar--horizontal': props.horizontal,
    },
    leading: {
      'app-navigation-bar__leading--horizontal': props.horizontal,
    },
    trailing: {
      'app-navigation-bar__trailing--horizontal': props.horizontal,
    },
  }))
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

.app-navigation-bar__leading { @apply
  flex
  flex-col
  gap-1
  items-center
  mb-5
}

.app-navigation-bar__leading--horizontal { @apply
  flex-row
  items-start
  mb-0
}

.app-navigation-bar__icon { @apply
  h-10
  w-10
}

.app-navigation-bar__heading { @apply
  font-normal
  text-xl
}

.app-navigation-bar__search-box { @apply
  text-foreground-600
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