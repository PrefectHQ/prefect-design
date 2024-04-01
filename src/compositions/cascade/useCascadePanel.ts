import { computed, inject, InjectionKey, provide, Ref } from 'vue'
import { CascadePanelId, getInjectedCascadePanels } from '@/compositions'

export const cascadePanelKey: InjectionKey<UseCascadePanel> = Symbol('UseCascadePanel')

export type UseCascadePanel = {
  isOpen: Ref<boolean>,
  close: () => void,
  open: () => void,
  toggle: () => void,
}

function getInjectedPanel(): UseCascadePanel {
  const cascadePanel = inject(cascadePanelKey)

  if (!cascadePanel) {
    throw new Error('Cascade panel not found. Are you sure the component calling useCascadePanel() exists within a <p-cascade-panel> component context?')
  }

  return cascadePanel
}

export function useCascadePanel(id?: CascadePanelId): UseCascadePanel {
  if (!id) {
    return getInjectedPanel()
  }

  const { closePanelById, openPanelById, togglePanelById, panelIsOpen: globalPanelIsOpen } = getInjectedCascadePanels()
  const isOpen = computed(() => globalPanelIsOpen.value(panelId))
  const panelId = id

  function close(): void {
    closePanelById(panelId)
  }

  function open(): void {
    openPanelById(panelId)
  }

  function toggle(): void {
    togglePanelById(panelId)
  }

  const cascadePanel: UseCascadePanel = {
    isOpen,
    toggle,
    open,
    close,
  }

  provide(id, cascadePanel)
  return cascadePanel
}