import { computed, inject, InjectionKey, WritableComputedRef } from 'vue'
import { CascadePanelId, CascadeValue, getInjectedCascadePanels, UseCascadePanels } from '@/compositions'

export function useCascadePanelKey<T extends Record<CascadePanelId, unknown>, K extends keyof T>(): InjectionKey<UseCascadePanel<T, K>> {
  return Symbol('UseCascadePanel')
}

export type UseCascadePanel<T extends CascadeValue, K extends keyof T> = {
  panels: UseCascadePanels,
  value: WritableComputedRef<CascadeValue[K]>,
  setValue: (newValue: unknown) => void,
  unsetValue: () => void,
  close: () => void,
  open: () => void,
  toggle: () => void,
}

function getInjectedPanel<T extends Record<CascadePanelId, unknown>, K extends keyof T>(): UseCascadePanel<T, K> {
  const cascadePanel = inject(useCascadePanelKey<T, K>())

  if (!cascadePanel) {
    throw new Error('Cascade panel not found. Are you sure the component calling getPanel() exists within a <p-cascade-panel> component context?')
  }

  return cascadePanel
}

export function useCascadePanel<T extends Record<CascadePanelId, unknown>, K extends keyof T>(id?: K): UseCascadePanel<T, K> {
  if (!id) {
    return getInjectedPanel<T, K>()
  }

  const panelId = id
  const panels = getInjectedCascadePanels()
  const panel = panels.getPanel(panelId)

  if (!panel) {
    throw new Error(`Panel with id ${String(panelId)} not found.`)
  }

  const value = computed({
    get: () => panels.value[panelId],
    set: (newValue: unknown) => panels.setValue(id, newValue),
  })

  function close(): void {
    panels.closePanel(panelId)
  }

  function open(): void {
    panels.openPanel(panelId)
  }

  function toggle(): void {
    panels.togglePanel(panelId)
  }

  function setValue(newValue: unknown): void {
    panels.setValue(panelId, newValue)
  }

  function unsetValue(): void {
    panels.unsetValue(panelId)
  }

  return {
    panels,
    value,
    close,
    open,
    toggle,
    setValue,
    unsetValue,
  }
}