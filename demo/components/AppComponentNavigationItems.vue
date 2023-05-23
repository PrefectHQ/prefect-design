<template>
  <template v-for="record in routeRecords" :key="record.name">
    <component :is="getComponentForRecord(record)" v-bind="getContextProps(record)" />
  </template>
</template>

<script lang="ts" setup>
  import { PContextAccordionItem, PContextNavItem } from '@/components'
  import { ContextAccordionChildItem } from '@/types/contextAccordionChildItem'
  import { RouteLocationRaw, RouteRecordRaw } from 'vue-router'
  import { routeRecords } from '@/demo/router'

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
</script>