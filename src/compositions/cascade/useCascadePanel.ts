import { computed, inject, InjectionKey, MaybeRefOrGetter, toRef, WritableComputedRef } from 'vue'
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

export function useCascadePanel<T extends Record<CascadePanelId, unknown>, K extends keyof T>(id?: MaybeRefOrGetter<K>): UseCascadePanel<T, K> {
  if (!id) {
    return getInjectedPanel<T, K>()
  }

  const panels = getInjectedCascadePanels()
  const panelId = toRef(id)

  const value = computed({
    get: () => panels.values[panelId.value],
    set: (newValue: unknown) => panels.setValue(panelId.value, newValue),
  })

  function close(): void {
    panels.closePanel(panelId.value)
  }

  function open(): void {
    panels.openPanel(panelId.value)
  }

  function toggle(): void {
    panels.togglePanel(panelId.value)
  }

  function setValue(newValue: unknown): void {
    panels.setValue(panelId.value, newValue)
  }

  function unsetValue(): void {
    panels.unsetValue(panelId.value)
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