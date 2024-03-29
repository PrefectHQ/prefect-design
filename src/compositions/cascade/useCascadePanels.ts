import { computed, ComputedRef, inject, InjectionKey, MaybeRefOrGetter, provide, reactive, readonly, Ref, ref, toRef, UnwrapNestedRefs } from 'vue'
import { isDefined } from '@/utilities'

export const cascadePanelsKey: InjectionKey<UseCascadePanels> = Symbol('UseCascadePanels')

export type CascadePanelId = string | symbol | number
export type CascadeValue = Partial<{ [key in CascadePanelId]: unknown }>
export type CascadeState = Record<CascadePanelId, boolean>

export type CascadePanel = {
  id: CascadePanelId,
  level?: number,
}

export function getInjectedCascadePanels(): UseCascadePanels {
  const cascadePanels = inject(cascadePanelsKey)

  if (!cascadePanels) {
    throw new Error('Cascade panels not found. Are you sure the component calling useCascadePanels() exists within a <p-cascade> component context?')
  }

  return cascadePanels
}

export type UseCascadePanels = {
  values: UnwrapNestedRefs<CascadeValue>,
  openPanels: ComputedRef<CascadePanel[]>,
  empty: ComputedRef<boolean>,
  state: Readonly<CascadeState>,
  isOpen: Ref<boolean>,
  panelIsOpen: ComputedRef<(id: CascadePanelId) => boolean>,
  getPanelById: (id: CascadePanelId) => CascadePanel | undefined,
  openPanelById: (id: CascadePanelId) => void,
  closePanelById: (id: CascadePanelId) => void,
  togglePanelById: (id: CascadePanelId) => void,
  closeAll: () => void,
  close: () => void,
  open: () => void,
  toggle: () => void,
  setValue: (id: CascadePanelId, newValue: unknown) => void,
  unsetValue: (id: CascadePanelId) => void,
}

/**
 * Provides a mechanism to manage a cascade of panels, each identified by a unique id, with operations to open, close, and toggle their states.
 *
 * @param {CascadeValue} [initialValues={}] - Initial values for panels, keyed by their ids.
 * @param {CascadePanel[]} panelsRefOrGetter - Initial array of panel definitions.
 * @returns {UseCascadePanels} - An object including:
 *   - `values`: Object with panel values.
 *   - `empty`: Computed boolean indicating whether all values are undefined.
 *   - `openPanels`: Computed array of open panels.
 *   - `isOpen`: Ref boolean indicating whether the cascade panel group is open.
 *   - `getPanelById`: Function to get a panel by id.
 *   - `state`: Readonly object tracking the open/close state of each panel by id.
 *   - `setValue`: Function to set a value for a panel by id.
 *   - `unsetValue`: Function to unset a value for a panel by id.
 *   - `openPanelById`: Function to open a panel by id.
 *   - `closePanelById`: Function to close a panel by id.
 *   - `togglePanelById`: Function to toggle the open state of a panel by id.
 *   - `closeAll`: Function to close all panels.
 *   - `close`, `open`, `toggle`: Functions to control the overall cascade state.
 */
export function useCascadePanels(panelsRefOrGetter?: MaybeRefOrGetter<CascadePanel[]>, initialValues?: CascadeValue): UseCascadePanels {
  if (!panelsRefOrGetter) {
    try {
      return getInjectedCascadePanels()
    } catch {
      throw new Error('No panels were provided; and no cascade panel context was found. Are you sure the component calling useCascadePanels() exists within a <p-cascade> component context?')
    }
  }

  const panels = toRef(panelsRefOrGetter)
  const values = reactive<CascadeValue>({ ...initialValues })
  const state = reactive<CascadeState>(Object.fromEntries(panels.value.map((panel) => [panel.id, false])))
  const isOpen = ref(false)
  const empty = computed(() => Object.values(values).every((value) => !isDefined(value)))
  const openPanels = computed(() => panels.value.filter((panel) => state[panel.id]))
  const panelIsOpen = computed(() => (id: CascadePanelId) => state[id])

  function closePanelsAtOrAboveLevel(level?: number): void {
    const panelsAtLevel = panels.value.filter((panel) => panel.level === level)

    if (panelsAtLevel.length === 0) {
      return
    }

    panelsAtLevel.map((panel) => panel.id).forEach(closePanelById)
  }

  function getPanelById(id: CascadePanelId): CascadePanel | undefined {
    return panels.value.find((panel) => panel.id === id)
  }

  function openPanelById(id: CascadePanelId): void {
    const panel = getPanelById(id)

    if (!panel) {
      return
    }

    closePanelsAtOrAboveLevel(panel.level)
    state[id] = true

    if (!isOpen.value) {
      open()
    }
  }

  function closePanelById(id: CascadePanelId): void {
    const panel = getPanelById(id)

    if (!panel) {
      return
    }

    state[id] = false

    if (isDefined(panel.level)) {
      closePanelsAtOrAboveLevel(panel.level + 1)
    }

    if (openPanels.value.length === 0) {
      close()
    }
  }

  function togglePanelById(id: CascadePanelId): void {
    if (state[id]) {
      closePanelById(id)
    } else {
      openPanelById(id)
    }
  }

  function close(): void {
    isOpen.value = false
  }

  function open(): void {
    if (openPanels.value.length === 0) {
      openFirstPanelAtLevel()
    }

    isOpen.value = true
  }

  function toggle(): void {
    if (isOpen.value) {
      close()
    } else {
      open()
    }
  }

  function closeAll(): void {
    closePanelsAtOrAboveLevel()
  }

  function setValue(id: CascadePanelId, value: unknown): void {
    const panel = getPanelById(id)

    if (!panel) {
      throw new Error(`Panel with id ${String(id)} not found`)
    }

    Object.assign(values, { [id]: value })
  }

  function unsetValue(id: CascadePanelId): void {
    const panel = getPanelById(id)

    if (!panel) {
      throw new Error(`Panel with id ${String(id)} not found`)
    }

    Object.assign(values, { [id]: undefined })
  }

  function openFirstPanelAtLevel(level: number = 0): void {
    const panelsAtLevel = panels.value.filter((panel) => panel.level === level)

    if (panelsAtLevel.length === 0) {
      return
    }

    const [panel] = panelsAtLevel
    openPanelById(panel.id)
  }

  const cascadePanels: UseCascadePanels = {
    values,
    empty,
    openPanels,
    isOpen,
    panelIsOpen,
    state: readonly(state),
    setValue,
    unsetValue,
    getPanelById,
    openPanelById,
    closePanelById,
    togglePanelById,
    closeAll,
    close,
    open,
    toggle,
  }

  provide(cascadePanelsKey, cascadePanels)

  return cascadePanels
}