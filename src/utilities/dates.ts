import { isAfter, isBefore, isSameDay, isSameHour, isSameMinute, isSameMonth, isSameSecond, isSameYear } from 'date-fns'

export type DateRange = {
  min?: Date | null | undefined,
  max?: Date | null | undefined,
}
export type Precision = 'second' | 'minute' | 'hour' | 'day' | 'month' | 'year'

export function keepDateInRange(date: Date | null, range: DateRange): Date | null {
  if (date && range.min && isBefore(date, range.min)) {
    return range.min
  }

  if (date && range.max && isAfter(date, range.max)) {
    return range.max
  }

  return date
}

export function isMatchingPrecision(dateLeft: Date, dateRight: Date, precision: Precision): boolean {
  switch (precision) {
    case 'second':
      return isSameSecond(dateLeft, dateRight)
    case 'minute':
      return isSameMinute(dateLeft, dateRight)
    case 'hour':
      return isSameHour(dateLeft, dateRight)
    case 'day':
      return isSameDay(dateLeft, dateRight)
    case 'month':
      return isSameMonth(dateLeft, dateRight)
    case 'year':
      return isSameYear(dateLeft, dateRight)
    default:
      throw new Error(`isMatchingPrecision missing case for ${precision}`)
  }
}

export function isDateInRange(date: Date, range: DateRange, precision: Precision = 'minute'): boolean {
  return (!range.min || isDateAfterOrEqual(date, range.min, precision)) && (!range.max || isDateBeforeOrEqual(date, range.max, precision))
}

export function isDateBefore(date: Date, target: Date): boolean {
  return isBefore(date, target)
}

export function isDateBeforeOrEqual(date: Date, target: Date, precision: Precision = 'minute'): boolean {
  return isBefore(date, target) || isMatchingPrecision(date, target, precision)
}

export function isDateAfter(date: Date, target: Date): boolean {
  return isAfter(date, target)
}

export function isDateAfterOrEqual(date: Date, target: Date, precision: Precision = 'minute'): boolean {
  return isAfter(date, target) || isMatchingPrecision(date, target, precision)
}