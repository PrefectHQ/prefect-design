import { parse, format } from 'date-fns'
import { useAdjustedDate } from '@/compositions/useAdjustedDate'

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