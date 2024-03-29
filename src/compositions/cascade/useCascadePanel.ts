import { computed, inject, InjectionKey, MaybeRefOrGetter, provide, Ref, toRef } from 'vue'
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

export function useCascadePanel(id?: MaybeRefOrGetter<CascadePanelId>): UseCascadePanel {
  if (!id) {
    return getInjectedPanel()
  }

  const { closePanelById, openPanelById, togglePanelById, panelIsOpen: globalPanelIsOpen } = getInjectedCascadePanels()
  const panelId = toRef(id)
  const isOpen = computed(() => globalPanelIsOpen.value(panelId.value))

  function close(): void {
    closePanelById(panelId.value)
  }

  function open(): void {
    openPanelById(panelId.value)
  }

  function toggle(): void {
    togglePanelById(panelId.value)
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