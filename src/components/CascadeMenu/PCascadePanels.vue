<template>
  <!-- <transition name="p-cascade-panels__transition" :duration="{ enter: 150, leave: 300 }"> -->
  <div v-show="isOpen" class="p-cascade-panels">
    <template v-for="{ id } in panels" :key="id">
      <transition name="p-cascade-panels__panel-transition" tag="keep-alive">
        <PCascadePanel v-show="panelIsOpen(id)" :panel-id="id" class="p-cascade-panels__panel">
          <template #default="panel">
            <slot :name="`${getBaseSlotName(id)}`" v-bind="panel">
              {{ getBaseSlotName(id) }}
            </slot>
          </template>
        </PCascadePanel>
      </transition>
    </template>
  </div>
  <!-- </transition> -->
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
    getPanelById,
    isOpen,
    open,
    openPanelById,
    openPanels,
    panelIsOpen,
    toggle,
    togglePanelById,
  } = inject(cascadePanelsKey, undefined) ?? useCascadePanels(() => props.panels)

  defineExpose({
    close,
    closeAll,
    closePanelById,
    getPanelById,
    isOpen,
    open,
    openPanelById,
    openPanels,
    panelIsOpen,
    toggle,
    togglePanelById,
  })

  function getBaseSlotName(panelId: CascadePanelId): string {
    return `${kebabCase(panelId.toString())}`
  }
</script>

<style>
.p-cascade-panels { @apply
  flex
  gap-2
  pointer-events-none
  items-start
}

.p-cascade-panels__transition-move,
.p-cascade-panels__transition-enter-active,
.p-cascade-panels__transition-leave-active {
  transition: all 0.15s ease-in;
  transform-origin: center;
}

.p-cascade-panels__transition-leave-active {
  transition-delay: 0.15s;
}

.p-cascade-panels__transition-enter-from,
.p-cascade-panels__transition-leave-to {
  opacity: 0;
  transform: scale3d(0.9, 0.9, 1);
  z-index: 0;
}

.p-cascade-panels__transition-move .p-cascade-panels__panel,
.p-cascade-panels__transition-enter-active .p-cascade-panels__panel,
.p-cascade-panels__transition-leave-active .p-cascade-panels__panel {
  transition: all 0.15s ease-in;
  transform-origin: 50% 0;
}

.p-cascade-panels__transition-enter-from .p-cascade-panels__panel,
.p-cascade-panels__transition-leave-to .p-cascade-panels__panel {
  transform: scale3d(0.1, 0.1, 0.1);
  opacity: 0;
}

.p-cascade-panels__panel-transition-move,
.p-cascade-panels__panel-transition-enter-active,
.p-cascade-panels__panel-transition-leave-active {
  transition: all 0.15s ease-in;
  transform-origin: center;
}

.p-cascade-panels__panel-transition-enter-from,
.p-cascade-panels__panel-transition-leave-to {
  opacity: 0;
  transform: scale3d(0.9, 0.9, 1);
  z-index: 0;
}
</style>