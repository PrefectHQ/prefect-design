export const LayoutResizablePlacements = ['left', 'right', 'top', 'bottom'] as const
export type LayoutResizablePlacement = typeof LayoutResizablePlacements[number]

export function isResizablePlacement(placement: unknown): placement is LayoutResizablePlacement {
  return LayoutResizablePlacements.includes(placement as LayoutResizablePlacement)
}

export function isHorizontalPlacement(placement: LayoutResizablePlacement): boolean {
  return placement === 'left' || placement === 'right'
}