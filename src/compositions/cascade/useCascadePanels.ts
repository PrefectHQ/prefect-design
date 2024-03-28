import { inject, InjectionKey, provide, reactive, readonly, Ref, ref, UnwrapNestedRefs } from 'vue'

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
  value: UnwrapNestedRefs<CascadeValue>,
  panels: Ref<(CascadePanel)[]>,
  addPanel: (panel: CascadePanel) => void,
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
  state: Readonly<CascadeState>,
}

/**
 * Provides a mechanism to manage a cascade of panels, each identified by a unique id, with operations to open, close, and toggle their states.
 *
 * @param {CascadeValue} [initialValue={}] - Initial values for panels, keyed by their ids.
 * @param {CascadePanel[]} initialPanels - Initial array of panel definitions.
 * @returns {UseCascadePanels} - An object including:
 *   - `value`: Object with panel values.
 *   - `setValue`: Function to set a value for a panel by id.
 *   - `unsetValue`: Function to unset a value for a panel by id.
 *   - `panels`: Reactive array of panel objects.
 *   - `addPanel`: Function to add a new panel.
 *   - `openPanel`: Function to open a panel by id.
 *   - `closePanel`: Function to close a panel by id.
 *   - `togglePanel`: Function to toggle the open state of a panel by id.
 *   - `closeAll`: Function to close all panels.
 *   - `close`, `open`, `toggle`: Functions to control the overall cascade state.
 *   - `state`: Readonly object tracking the open/close state of each panel by id.
 */
export function useCascadePanels(initialPanels: CascadePanel[], initialValue: CascadeValue = {}): UseCascadePanels {
  const value = reactive<CascadeValue>({ ...initialValue })
  const panels = ref<CascadePanel[]>([...initialPanels])
  const state = reactive<CascadeState>({})
  const isOpen = ref(false)

  function closePanelsAtOrBelow(level?: number): void {
    panels.value.forEach((panel) => {
      if (panel.level === undefined) {
        return
      }

      if (level === undefined || panel.level <= level) {
        closePanel(panel.id)
      }
    })
  }

  function getPanel(id: CascadePanelId): CascadePanel | undefined {
    return panels.value.find((panel) => panel.id === id)
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

  function addPanel(panel: CascadePanel): void {
    state[panel.id] = false
    panels.value.push(panel)
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

  function setValue(id: CascadePanelId, newValue: unknown): void {
    const panel = getPanel(id)

    if (!panel) {
      throw new Error(`Panel with id ${String(id)} not found`)
    }

    Object.assign(value, { [id]: newValue })
  }

  function unsetValue(id: CascadePanelId): void {
    const panel = getPanel(id)

    if (!panel) {
      throw new Error(`Panel with id ${String(id)} not found`)
    }

    Object.assign(value, { [id]: undefined })
  }

  const cascadePanels: UseCascadePanels = {
    value,
    setValue,
    unsetValue,
    panels,
    getPanel,
    openPanel,
    closePanel,
    addPanel,
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