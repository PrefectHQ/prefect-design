export const layoutResizablePlacements = ['left', 'right', 'top', 'bottom'] as const
export type PLayoutResizablePlacement = typeof layoutResizablePlacements[number]

export function isResizablePlacement(placement: unknown): placement is PLayoutResizablePlacement {
  return layoutResizablePlacements.includes(placement as PLayoutResizablePlacement)
}

export function isHorizontalPlacement(placement: PLayoutResizablePlacement): boolean {
  return placement === 'left' || placement === 'right'
}