export const navigationBarLayouts = ['horizontal', 'vertical'] as const
export type NavigationBarLayout = typeof navigationBarLayouts[number]