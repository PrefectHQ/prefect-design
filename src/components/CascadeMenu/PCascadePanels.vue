<template>
  <div class="p-cascade-panels">
    <template v-for="panelDefinition in panels" :key="panelDefinition.id">
      <slot :name="`${getBaseSlotName(panelDefinition.id)}`" v-bind="{ panel: panelDefinition }">
        <PCascadePanel :panel-id="panelDefinition.id">
          <template #default="panel">
            <slot :name="`${getBaseSlotName(panelDefinition.id)}-content`" v-bind="{ ...panel }" />
          </template>
        </PCascadePanel>
      </slot>
    </template>
  </div>
</template>

<script setup lang="ts">
  import { PCascadePanel } from '@/components'
  import { CascadePanel, CascadePanelId } from '@/compositions'
  import { kebabCase } from '@/utilities'

  defineProps<{
    panels: CascadePanel[],
  }>()

  function getBaseSlotName(panelId: CascadePanelId): string {
    return `${kebabCase(panelId.toString())}`
  }
</script>