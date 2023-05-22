export const layoutResizablePlacements = ['left', 'right', 'top', 'bottom'] as const
export type PLayoutResizablePlacement = typeof layoutResizablePlacements[number]

export function isResizablePlacement(placement: unknown): placement is PLayoutResizablePlacement {
  return layoutResizablePlacements.includes(placement as PLayoutResizablePlacement)
}