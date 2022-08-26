import { parse, format, differenceInSeconds, isAfter, isBefore, isSameDay, isSameHour, isSameMinute, isSameMonth, isSameYear } from 'date-fns'
import { useAdjustedDate } from '@/compositions/useAdjustedDate'
import { secondsToApproximateString } from '@/utilities/seconds'

export type DateRange = {
  min?: Date | null,
  max?: Date | null,
}
export type Precision = 'minute' | 'hour' | 'day' | 'month' | 'year'

const dateTimeNumericFormat = 'yyyy/MM/dd hh:mm:ss a'
const timeNumericFormat = 'hh:mm:ss a'
const dateFormat = 'MMM do, yyyy'

export function formatDate(date: Date | string): string {
  const parsed = new Date(date)
  const adjusted = useAdjustedDate(parsed)

  return format(adjusted, dateFormat)
}

export function parseDate(input: string, reference: Date = new Date()): Date {
  return parse(input, dateFormat, reference)
}

export function formatDateTimeNumeric(date: Date | string): string {
  const parsed = new Date(date)
  const adjusted = useAdjustedDate(parsed)

  return format(adjusted, dateTimeNumericFormat)
}

export function parseDateTimeNumeric(input: string, reference: Date = new Date()): Date {
  return parse(input, dateTimeNumericFormat, reference)
}

export function formatTimeNumeric(date: Date | string): string {
  const parsed = new Date(date)
  const adjusted = useAdjustedDate(parsed)

  return format(adjusted, timeNumericFormat)
}

export function parseTimeNumeric(input: string, reference: Date = new Date()): Date {
  return parse(input, timeNumericFormat, reference)
}

export function formatDateTimeRelative(date: Date | string): string {
  const parsed = new Date(date)
  const seconds = differenceInSeconds(new Date(), parsed)
  const past = seconds < 0
  const formatted = secondsToApproximateString(Math.abs(seconds))

  if (past) {
    return `${formatted} ago`
  }

  return `in ${formatted}`
}

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