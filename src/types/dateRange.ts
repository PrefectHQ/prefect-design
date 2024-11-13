import { isDate } from 'date-fns'
import { isDefined, isNumber } from '@/utilities'
import { isRecord } from '@/utilities/objects'

const dateRangeSelectType = ['span', 'range', 'period', 'around'] as const
export type DateRangeSelectType = typeof dateRangeSelectType[number]

export function isDateRangeSelectType(value: unknown): value is DateRangeSelectType {
  return dateRangeSelectType.includes(value as DateRangeSelectType)
}

type DateRangeValue<T extends DateRangeSelectType, U extends Record<string, unknown>> = U & {
  type: T,
}

export type DateRangeSelectSpanValue = DateRangeValue<'span', { seconds: number }>

export function isDateRangeSelectSpanValue(value: unknown): value is DateRangeSelectSpanValue {
  return isRecord(value) && value.type === 'span' && isNumber(value.seconds)
}

export type DateRangeSelectRangeValue = DateRangeValue<'range', { startDate: Date, endDate: Date }>

export function isDateRangeSelectRangeValue(value: unknown): value is DateRangeSelectRangeValue {
  return isRecord(value) && value.type === 'range' && isDate(value.startDate) && isDate(value.endDate)
}

const dateRangeSelectPeriod = ['Today'] as const
export type DateRangeSelectPeriod = typeof dateRangeSelectPeriod[number]

export function isDateRangeSelectPeriod(value: unknown): value is DateRangeSelectPeriod {
  return dateRangeSelectPeriod.includes(value as DateRangeSelectPeriod)
}

export type DateRangeSelectPeriodValue = DateRangeValue<'period', { period: DateRangeSelectPeriod }>

export function isDateRangeSelectPeriodValue(value: unknown): value is DateRangeSelectPeriodValue {
  return isRecord(value) && value.type === 'period' && isDateRangeSelectPeriod(value.period)
}

const dateRangeSelectAroundUnit = ['second', 'minute', 'hour', 'day'] as const
export type DateRangeSelectAroundUnit = typeof dateRangeSelectAroundUnit[number]

export function isDateRangeSelectAroundUnit(value: unknown): value is DateRangeSelectAroundUnit {
  return dateRangeSelectAroundUnit.includes(value as DateRangeSelectAroundUnit)
}

export type DateRangeSelectAroundValue = DateRangeValue<'around', { date: Date, quantity: number, unit: DateRangeSelectAroundUnit }>

export function isDateRangeSelectAroundValue(value: unknown): value is DateRangeSelectAroundValue {
  return isRecord(value) && value.type === 'around' && isDate(value.date) && isNumber(value.quantity) && isDateRangeSelectAroundUnit(value.unit)
}

export type DateRangeSelectValue = DateRangeSelectSpanValue | DateRangeSelectRangeValue | DateRangeSelectAroundValue | DateRangeSelectPeriodValue | null | undefined

export function isDateRangeSelectValue(value: unknown): value is DateRangeSelectValue {
  if (value === null || value === undefined) {
    return true
  }

  return isDateRangeSelectSpanValue(value) || isDateRangeSelectRangeValue(value) || isDateRangeSelectAroundValue(value) || isDateRangeSelectPeriodValue(value)
}