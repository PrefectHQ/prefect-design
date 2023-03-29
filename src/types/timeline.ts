import { Icon } from '@/types/icon'

export type TimelineItem = {
  icon?: Icon,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any,
}

export const timelineLayouts = ['date-left', 'date-right', 'stacked-left', 'stacked-right', 'stacked-center'] as const
export type TimelineLayout = typeof timelineLayouts[number]
export type TimelineLayoutFunction = (item: TimelineItem, index: number) => TimelineLayout