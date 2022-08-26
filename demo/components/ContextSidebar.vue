<template>
  <p-context-sidebar>
    <template #header>
      <div class="flex flex-col pt-3 sm:pt-0">
        <span class="font-normal text-sm mx-3">Prefect Design</span>
        <span class="font-bold text-base mx-3">UI Team Demo Collection</span>
      </div>
    </template>

    <p-context-accordion-item title="Components" icon="PuzzleIcon" :children="components" />
    <p-context-nav-item title="Icons" icon="AdjustmentsIcon" to="/icons" />
    <p-context-accordion-item title="Layouts" icon="TemplateIcon" :children="layouts" />
  </p-context-sidebar>
</template>

<script lang="ts" setup>
  import { routes as componentRoutes } from '../pages/components'
  import { routes as layoutRoutes } from '../pages/layouts'
  import { ContextAccordionChildItem } from '@/types/contextAccordionChildItem'

  const components: ContextAccordionChildItem[] = componentRoutes.map(route => ({
    title: `p-${route.path}`,
    to: { name: route.name },
  }))

  const layouts: ContextAccordionChildItem[] = layoutRoutes.map(route => ({
    title: `p-${route.path}`,
    to: { name: route.name },
  }))
</script>