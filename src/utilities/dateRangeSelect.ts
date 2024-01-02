import { addSeconds, differenceInSeconds, secondsInDay, secondsInHour, secondsInMinute, subSeconds } from 'date-fns'
import { DateRangeSelectAroundUnit, DateRangeSelectAroundValue, DateRangeSelectRangeValue, DateRangeSelectSpanValue, DateRangeSelectValue } from '@/types/dateRange'

function nowWithoutMilliseconds(): Date {
  const now = new Date()

  now.setMilliseconds(0)

  return now
}

export type DateRangeWithTimeSpan = {
  startDate: Date,
  endDate: Date,
  timeSpanInSeconds: number,
}

function mapDateRangeSelectRangeValueToDateRange({ startDate, endDate }: DateRangeSelectRangeValue): DateRangeWithTimeSpan {
  const timeSpanInSeconds = differenceInSeconds(endDate, startDate)

  return { startDate, endDate, timeSpanInSeconds }
}

function mapDateRangeSelectSpanValueToDateRange({ seconds }: DateRangeSelectSpanValue): DateRangeWithTimeSpan {
  const now = nowWithoutMilliseconds()
  const then = addSeconds(now, seconds)
  const [startDate, endDate] = [now, then].sort((dateA, dateB) => dateA.getTime() - dateB.getTime())

  return { startDate, endDate, timeSpanInSeconds: seconds }
}

function mapDateRangeSelectAroundValueToDateRange({ date, quantity, unit }: DateRangeSelectAroundValue): DateRangeWithTimeSpan {
  const multiplier = getMultiplierForUnit(unit)
  const seconds = Math.abs(quantity * multiplier)
  const startDate = subSeconds(date, seconds)
  const endDate = addSeconds(date, seconds)
  const timeSpanInSeconds = differenceInSeconds(endDate, startDate)

  return { startDate, endDate, timeSpanInSeconds }
}

function getMultiplierForUnit(unit: DateRangeSelectAroundUnit): number {
  switch (unit) {
    case 'second':
      return 1
    case 'minute':
      return secondsInMinute
    case 'hour':
      return secondsInHour
    case 'day':
      return secondsInDay
    default:
      const exhaustive: never = unit
      throw new Error(`Failed get multiplier for unit because unit is not supported: ${exhaustive}`)
  }
}

export function mapDateRangeSelectValueToDateRange(source: DateRangeSelectValue): DateRangeWithTimeSpan | null {
  if (!source) {
    return null
  }

  switch (source.type) {
    case 'range':
      return mapDateRangeSelectRangeValueToDateRange(source)
    case 'span':
      return mapDateRangeSelectSpanValueToDateRange(source)
    case 'around':
      return mapDateRangeSelectAroundValueToDateRange(source)
    default:
      const exhaustive: never = source
      throw new Error(`No handler for DateRangeSelectValue.type: ${exhaustive}`)
  }
}