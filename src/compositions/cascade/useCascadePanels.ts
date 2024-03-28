import { computed, ComputedRef, inject, InjectionKey, MaybeRefOrGetter, provide, reactive, readonly, ref, toValue, UnwrapNestedRefs } from 'vue'
import { isDefined } from '@/utilities'

export function useCascadePanelsKey(): InjectionKey<UseCascadePanels> {
  return Symbol('UseCascadePanels')
}

export type CascadePanelId = string | symbol | number
export type CascadeValue = Partial<{ [key in CascadePanelId]: unknown }>
export type CascadeState = Record<CascadePanelId, boolean>

export type CascadePanel = {
  id: CascadePanelId,
  level?: number,
}

export function getInjectedCascadePanels(): UseCascadePanels {
  const cascadePanels = inject(useCascadePanelsKey())

  if (!cascadePanels) {
    throw new Error('Cascade panels not found. Are you sure the component calling useCascadePanels() exists within a <p-cascade> component context?')
  }

  return cascadePanels
}

export type UseCascadePanels = {
  values: UnwrapNestedRefs<CascadeValue>,
  getPanel: (id: CascadePanelId) => CascadePanel | undefined,
  openPanel: (id: CascadePanelId) => void,
  closePanel: (id: CascadePanelId) => void,
  togglePanel: (id: CascadePanelId) => void,
  closeAll: () => void,
  close: () => void,
  open: () => void,
  toggle: () => void,
  setValue: (id: CascadePanelId, newValue: unknown) => void,
  unsetValue: (id: CascadePanelId) => void,
  empty: ComputedRef<boolean>,
  state: Readonly<CascadeState>,
}

/**
 * Provides a mechanism to manage a cascade of panels, each identified by a unique id, with operations to open, close, and toggle their states.
 *
 * @param {CascadeValue} [initialValues={}] - Initial values for panels, keyed by their ids.
 * @param {CascadePanel[]} panelsRefOrGetter - Initial array of panel definitions.
 * @returns {UseCascadePanels} - An object including:
 *   - `values`: Object with panel values.
 *   - `empty`: Computed boolean indicating whether all values are undefined.
 *   - `setValue`: Function to set a value for a panel by id.
 *   - `unsetValue`: Function to unset a value for a panel by id.
 *   - `openPanel`: Function to open a panel by id.
 *   - `closePanel`: Function to close a panel by id.
 *   - `togglePanel`: Function to toggle the open state of a panel by id.
 *   - `closeAll`: Function to close all panels.
 *   - `close`, `open`, `toggle`: Functions to control the overall cascade state.
 *   - `state`: Readonly object tracking the open/close state of each panel by id.
 */
export function useCascadePanels(panelsRefOrGetter?: MaybeRefOrGetter<CascadePanel[]>, initialValues?: CascadeValue): UseCascadePanels {
  const values = reactive<CascadeValue>({ ...initialValues })
  const state = reactive<CascadeState>({})
  const isOpen = ref(false)
  const empty = computed(() => Object.values(values).every((value) => !isDefined(value)))

  function closePanelsAtOrBelow(level?: number): void {
    const panels = getPanels()
    panels.forEach((panel) => {
      if (panel.level === undefined) {
        return
      }

      if (level === undefined || panel.level <= level) {
        closePanel(panel.id)
      }
    })
  }

  function getPanels(): CascadePanel[] {
    return toValue(panelsRefOrGetter) ?? []
  }

  function getPanel(id: CascadePanelId): CascadePanel | undefined {
    const panels = getPanels()
    return panels.find((panel) => panel.id === id)
  }

  function openPanel(id: CascadePanelId): void {
    const panel = getPanel(id)

    if (!panel) {
      return
    }

    closePanelsAtOrBelow(panel.level)
    state[id] = true
  }

  function closePanel(id: CascadePanelId): void {
    const panel = getPanel(id)

    if (!panel) {
      return
    }

    closePanelsAtOrBelow(panel.level)
    state[id] = false
  }

  function togglePanel(id: CascadePanelId): void {
    if (state[id]) {
      closePanel(id)
    } else {
      openPanel(id)
    }
  }

  function close(): void {
    isOpen.value = false
  }

  function open(): void {
    isOpen.value = true
  }

  function toggle(): void {
    isOpen.value = !isOpen.value
  }

  function closeAll(): void {
    closePanelsAtOrBelow()
  }

  function setValue(id: CascadePanelId, value: unknown): void {
    const panel = getPanel(id)

    if (!panel) {
      throw new Error(`Panel with id ${String(id)} not found`)
    }

    Object.assign(values, { [id]: value })
  }

  function unsetValue(id: CascadePanelId): void {
    const panel = getPanel(id)

    if (!panel) {
      throw new Error(`Panel with id ${String(id)} not found`)
    }

    Object.assign(values, { [id]: undefined })
  }

  const cascadePanels: UseCascadePanels = {
    values,
    empty,
    setValue,
    unsetValue,
    getPanel,
    openPanel,
    closePanel,
    closeAll,
    togglePanel,
    state: readonly(state),
    close,
    open,
    toggle,
  }

  provide(useCascadePanelsKey(), cascadePanels)

  return cascadePanels
}