import { computed, ComputedRef, inject, InjectionKey, MaybeRefOrGetter, toRef, WritableComputedRef } from 'vue'
import { CascadePanelId, CascadeValue, getInjectedCascadePanels } from '@/compositions'

export function useCascadePanelKey<T extends Record<CascadePanelId, unknown>, K extends keyof T>(): InjectionKey<UseCascadePanel<T, K>> {
  return Symbol('UseCascadePanel')
}

export type UseCascadePanel<T extends CascadeValue, K extends keyof T> = {
  value: WritableComputedRef<CascadeValue[K]>,
  isOpen: ComputedRef<boolean>,
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

  const { values, state, setValue, unsetValue, openPanelById, closePanelById, togglePanelById } = getInjectedCascadePanels()

  const panelId = toRef(id)
  const isOpen = computed(() => state[panelId.value])

  const value = computed({
    get: () => values[panelId.value],
    set: (newValue: unknown) => setValue(panelId.value, newValue),
  })

  function close(): void {
    closePanelById(panelId.value)
  }

  function open(): void {
    openPanelById(panelId.value)
  }

  function toggle(): void {
    togglePanelById(panelId.value)
  }

  return {
    value,
    isOpen,
    toggle,
    open,
    close,
    setValue: (newValue: unknown) => setValue(panelId.value, newValue),
    unsetValue: () => unsetValue(panelId.value),
  }
}