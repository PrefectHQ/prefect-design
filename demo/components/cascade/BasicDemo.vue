<template>
  <p-button small @click="toggle">
    Toggle Cascade Panels
  </p-button>

  <PCascadePanels :panels="panels">
    <template #level-0>
      <Level0 />
    </template>

    <template #level-1>
      <Level1 />
    </template>

    <template #level-2="{ close }">
      No component for level-2 but we can still access the panel state

      <p-button small @click="close">
        Close
      </p-button>
    </template>
  </PCascadePanels>
</template>

<script lang="ts" setup>
  import { PCascadePanels } from '@/components'
  import { CascadePanel, useCascadePanels } from '@/compositions'
  import Level0 from '@/demo/components/cascade/Level0.vue'
  import Level1 from '@/demo/components/cascade/Level1.vue'

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

  const { toggle } = useCascadePanels(panels)
</script>