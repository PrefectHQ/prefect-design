<template>
  <div v-show="isOpen" class="p-cascade-panels">
    {{ isOpen ? 'open' : 'closed' }}
    <template v-for="{ id } in panels" :key="id">
      <PCascadePanel v-show="panelIsOpen(id)" :panel-id="id">
        <template #default="panel">
          <slot :name="`${getBaseSlotName(id)}`" v-bind="panel">
            {{ getBaseSlotName(id) }}
          </slot>
        </template>
      </PCascadePanel>
    </template>
  </div>
</template>

<script setup lang="ts">
  import { inject } from 'vue'
  import { PCascadePanel } from '@/components'
  import { CascadePanel, CascadePanelId, cascadePanelsKey, useCascadePanels } from '@/compositions'
  import { kebabCase } from '@/utilities'

  const props = defineProps<{
    panels: CascadePanel[],
  }>()

  // Calling inject with a nullish coallescing operator while providing a default value of
  // undefined allows callers to use the `useCascadePanels` composition function while
  // ensuring that the composition state is the same.
  const {
    close,
    closeAll,
    closePanelById,
    empty,
    getPanelById,
    isOpen,
    open,
    openPanelById,
    openPanels,
    panelIsOpen,
    setValue,
    toggle,
    togglePanelById,
    unsetValue,
    values,
  } = inject(cascadePanelsKey, undefined) ?? useCascadePanels(() => props.panels)

  defineExpose({
    close,
    closeAll,
    closePanelById,
    empty,
    getPanelById,
    isOpen,
    open,
    openPanelById,
    openPanels,
    panelIsOpen,
    setValue,
    toggle,
    togglePanelById,
    unsetValue,
    values,
  })

  function getBaseSlotName(panelId: CascadePanelId): string {
    return `${kebabCase(panelId.toString())}`
  }
</script>