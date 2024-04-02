import { computed, ComputedRef, inject, InjectionKey, MaybeRefOrGetter, provide, reactive, readonly, Ref, ref, toRef } from 'vue'
import { CascadePanelsNotFound, PanelsNotProvided } from '@/models/cascade'
import { isDefined } from '@/utilities'

export const cascadePanelsKey: InjectionKey<UseCascadePanels> = Symbol('UseCascadePanels')

export type CascadePanelId = string | symbol | number
export type CascadeState = Record<CascadePanelId, boolean>

export type CascadePanel = {
  id: CascadePanelId,
  level?: number,
}

function getInjectedCascadePanels(): UseCascadePanels {
  const cascadePanels = inject(cascadePanelsKey)

  if (!cascadePanels) {
    throw new CascadePanelsNotFound()
  }

  return cascadePanels
}


export type UseCascadePanels = {
  openPanels: ComputedRef<CascadePanel[]>,
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
}

/**
 * Provides a mechanism to manage a cascade of panels, each identified by a unique id, with operations to open, close, and toggle their states.
 *
 * @param {CascadePanel[]} panelsRefOrGetter - Initial array of panel definitions.
 * @returns {UseCascadePanels} - An object including:
 *   - `openPanels`: Computed array of open panels.
 *   - `state`: Readonly object tracking the open/close state of each panel by id.
 *   - `isOpen`: Ref boolean indicating whether the cascade panel group is open.
 *   - `panelIsOpen`: Computed function to check if a panel is open by id.
 *   - `getPanelById`: Function to get a panel by id.
 *   - `openPanelById`: Function to open a panel by id.
 *   - `closePanelById`: Function to close a panel by id.
 *   - `togglePanelById`: Function to toggle the open state of a panel by id.
 *   - `closeAll`: Function to close all panels.
 *   - `close`, `open`, `toggle`: Functions to control the overall cascade state.
 */
export function useCascadePanels(panelsRefOrGetter?: MaybeRefOrGetter<CascadePanel[]>): UseCascadePanels {
  if (!panelsRefOrGetter) {
    try {
      return getInjectedCascadePanels()
    } catch {
      throw new PanelsNotProvided()
    }
  }

  const panels = toRef(panelsRefOrGetter)
  const state = reactive<CascadeState>({})
  const isOpen = ref(false)
  const openPanels = computed(() => panels.value.filter((panel) => state[panel.id]))
  const panelIsOpen = computed(() => (id: CascadePanelId) => state[id])

  function closePanelsAtOrAboveLevel(level?: number): void {
    const panelsAtLevel = panels.value.filter((panel) => panel.level === level)
    panelsAtLevel.map((panel) => panel.id).forEach(closePanelById)
  }

  function getPanelById(id: CascadePanelId): CascadePanel | undefined {
    return panels.value.find((panel) => panel.id === id)
  }

  function openPanelById(id: CascadePanelId): void {
    const panel = getPanelById(id)

    if (!panel) {
      console.warn(`Panel with id "${String(id)}" not found.`)
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
      console.warn(`Panel with id "${String(id)}" not found.`)
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

  function openFirstPanelAtLevel(level: number = 0): void {
    const panelsAtLevel = panels.value.filter((panel) => panel.level === level)

    if (panelsAtLevel.length === 0) {
      return
    }

    const [panel] = panelsAtLevel
    openPanelById(panel.id)
  }

  const cascadePanels: UseCascadePanels = {
    openPanels,
    isOpen,
    panelIsOpen,
    state: readonly(state),
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