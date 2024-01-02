export type DateRangeSelectSpanValue = { type: 'span', seconds: number }
export type DateRangeSelectRangeValue = { type: 'range', startDate: Date, endDate: Date }

const dateRangeSelectPeriod = ['Today', 'This week'] as const
export type DateRangeSelectPeriod = typeof dateRangeSelectPeriod[number]
export type DateRangeSelectPeriodValue = { type: 'period', period: DateRangeSelectPeriod }

export function isDateRangeSelectPeriod(value: unknown): value is DateRangeSelectPeriod {
  return dateRangeSelectPeriod.includes(value as DateRangeSelectPeriod)
}

export type DateRangeSelectAroundUnit = 'second' | 'minute' | 'hour' | 'day'
export type DateRangeSelectAroundValue = { type: 'around', date: Date, quantity: number, unit: DateRangeSelectAroundUnit }

export type DateRangeSelectValue = DateRangeSelectSpanValue | DateRangeSelectRangeValue | DateRangeSelectAroundValue | DateRangeSelectPeriodValue | null | undefined