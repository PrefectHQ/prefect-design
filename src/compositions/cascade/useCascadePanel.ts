import { computed, inject, InjectionKey, MaybeRefOrGetter, provide, Ref, toValue } from 'vue'
import { CascadePanelId, cascadePanelsKey, UseCascadePanels } from '@/compositions'
import { CascadePanelNotFound, CascadePanelsNotFound } from '@/models/cascade'

export const cascadePanelKey: InjectionKey<UseCascadePanel> = Symbol('UseCascadePanel')

export type UseCascadePanel = {
  isOpen: Ref<boolean>,
  close: () => void,
  open: () => void,
  toggle: () => void,
}

function getInjectedCascadePanels(): UseCascadePanels {
  const cascadePanels = inject(cascadePanelsKey)

  if (!cascadePanels) {
    throw new CascadePanelsNotFound()
  }

  return cascadePanels
}

function getInjectedCascadePanel(): UseCascadePanel {
  const cascadePanels = inject(cascadePanelKey)

  if (!cascadePanels) {
    throw new CascadePanelNotFound()
  }

  return cascadePanels
}

export function useCascadePanel(id?: MaybeRefOrGetter<CascadePanelId>): UseCascadePanel {
  if (!id) {
    return getInjectedCascadePanel()
  }

  const panelId = toValue(id)
  const { closePanelById, openPanelById, togglePanelById, getPanelIsOpenById } = getInjectedCascadePanels()
  const isOpen = computed(() => getPanelIsOpenById(panelId))

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

  if (panelId) {
    provide(cascadePanelKey, cascadePanel)
  }

  return cascadePanel
}