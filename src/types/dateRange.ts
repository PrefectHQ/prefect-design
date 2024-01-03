const dateRangeSelectType = ['span', 'range', 'period', 'around'] as const
export type DateRangeSelectType = typeof dateRangeSelectType[number]

type DateRangeValue<T extends DateRangeSelectType, U extends Record<string, unknown>> = U & {
  type: T,
}

export function isDateRangeSelectType(value: unknown): value is DateRangeSelectType {
  return dateRangeSelectType.includes(value as DateRangeSelectType)
}

export type DateRangeSelectSpanValue = DateRangeValue<'span', { seconds: number }>
export type DateRangeSelectRangeValue = DateRangeValue<'range', { startDate: Date, endDate: Date }>

const dateRangeSelectPeriod = ['Today'] as const
export type DateRangeSelectPeriod = typeof dateRangeSelectPeriod[number]
export type DateRangeSelectPeriodValue = DateRangeValue<'period', { period: DateRangeSelectPeriod }>

export function isDateRangeSelectPeriod(value: unknown): value is DateRangeSelectPeriod {
  return dateRangeSelectPeriod.includes(value as DateRangeSelectPeriod)
}

const dateRangeSelectAroundUnit = ['second', 'minute', 'hour', 'day'] as const
export type DateRangeSelectAroundUnit = typeof dateRangeSelectAroundUnit[number]
export type DateRangeSelectAroundValue = DateRangeValue<'around', { date: Date, quantity: number, unit: DateRangeSelectAroundUnit }>

export function isDateRangeSelectAroundUnit(value: unknown): value is DateRangeSelectAroundUnit {
  return dateRangeSelectAroundUnit.includes(value as DateRangeSelectAroundUnit)
}

export type DateRangeSelectValue = DateRangeSelectSpanValue | DateRangeSelectRangeValue | DateRangeSelectAroundValue | DateRangeSelectPeriodValue | null | undefined