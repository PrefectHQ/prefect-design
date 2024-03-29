<template>
  <ComponentPage title="Cascade Panels" :demos="[{ title: 'Cascade Panels' }]">
    <template #description>
      This is where we add a short description of <p-code inline>
        p-cascade-panels
      </p-code>. Describe the components intent, not hyper specific documentation that belongs on vitepress page.
    </template>

    <template #cascade-panels>
      {{ values }}

      <p-button small @click="toggle">
        Toggle Cascade Panels
      </p-button>

      <PCascadePanels :panels="panels">
        <template #level-0-content="{ close }">
          level 0

          <p-button small @click="openPanelById('level-1')">
            Open sub
          </p-button>

          <p-button small @click="close">
            Close
          </p-button>
        </template>

        <template #level-1-content="{ close }">
          level 1

          <p-button small @click="openPanelById('level-2')">
            Open sub
          </p-button>

          <p-button small @click="close">
            Close
          </p-button>
        </template>

        <template #level-2-content="{ close }">
          level 2

          <p-button small @click="close">
            Close
          </p-button>
        </template>
      </PCascadePanels>
    </template>
  </ComponentPage>
</template>

<script lang="ts" setup>
  import { PCascadePanels } from '@/components'
  import { CascadePanel, useCascadePanels } from '@/compositions'
  import ComponentPage from '@/demo/components/ComponentPage.vue'

  const panels: CascadePanel[] = [
    {
      id: 'level-0',
      level: 0,
    },
    {
      id: 'level-1',
      level: 1,
    },
    {
      id: 'level-2',
      level: 2,
    },
  ]

  const { values, toggle, openPanelById } = useCascadePanels(panels)
</script>