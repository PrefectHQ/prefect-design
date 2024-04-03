<template>
  <transition :name="transitionName">
    <div v-show="isOpen" class="p-cascade-panels">
      <template v-for="{ id } in panels" :key="id">
        <transition-group :name="panelTransitionName">
          <PCascadePanel v-show="getPanelIsOpenById(id)" :key="id" :panel-id="id" class="p-cascade-panels__panel">
            <slot :name="`${getBaseSlotName(id)}`">
              {{ getBaseSlotName(id) }}
            </slot>
          </PCascadePanel>
        </transition-group>
      </template>
    </div>
  </transition>
</template>

<script setup lang="ts">
  import { inject } from 'vue'
  import { PCascadePanel } from '@/components'
  import { CascadePanel, CascadePanelId, cascadePanelsKey, useCascadePanels } from '@/compositions'
  import { isDefined, kebabCase } from '@/utilities'

  const props = withDefaults(defineProps<{
    panels: CascadePanel[],
    panelTransitionName?: string,
    transitionName?: string,
  }>(), {
    panelTransitionName: 'p-cascade-panels__panel-transition',
    transitionName: 'p-cascade-panels__transition',
  })

  function getBaseSlotName(panelId: CascadePanelId): string {
    return `${kebabCase(panelId.toString())}`
  }

  // Calling inject while providing a default value of
  // undefined allows callers to use the `useCascadePanels` composition function while
  // ensuring that the composition state is the same.
  const injectedCascadePanels = inject(cascadePanelsKey, undefined)

  const useInjectedCascadePanels = isDefined(injectedCascadePanels)
    && injectedCascadePanels.panels.value.every((panel) => props.panels.find(({ id }) => id === panel.id))
    && props.panels.every((panel) => injectedCascadePanels.panels.value.find(({ id }) => id === panel.id))

  const {
    close,
    closeAll,
    closePanelById,
    getPanelById,
    getPanelIsOpenById,
    isOpen,
    open,
    openPanelById,
    openPanels,
    panels,
    toggle,
    togglePanelById,
  } = useInjectedCascadePanels ? injectedCascadePanels : useCascadePanels(() => props.panels)

  defineExpose({
    close,
    closeAll,
    closePanelById,
    getPanelById,
    getPanelIsOpenById,
    isOpen,
    open,
    openPanelById,
    openPanels,
    panels,
    toggle,
    togglePanelById,
  })
</script>

<style>
.p-cascade-panels { @apply
  flex
  flex-wrap
  gap-2
  pointer-events-none
  items-start
}

.p-cascade-panels__transition-enter-active,
.p-cascade-panels__transition-leave-active {
  transition: all 0.15s ease-in-out;
}

.p-cascade-panels__transition-enter-from,
.p-cascade-panels__transition-leave-to {
  opacity: 0;
  z-index: 0;
}

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