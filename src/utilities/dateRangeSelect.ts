import { addSeconds, differenceInSeconds, subSeconds } from 'date-fns'
import { DateRangeSelectAroundValue, DateRangeSelectRangeValue, DateRangeSelectSpanValue, DateRangeSelectValue } from '@/types/dateRange'

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

function mapDateRangeSelectAroundValueToDateRange({ date, seconds }: DateRangeSelectAroundValue): DateRangeWithTimeSpan {
  const startDate = subSeconds(date, Math.abs(seconds))
  const endDate = addSeconds(date, Math.abs(seconds))
  const timeSpanInSeconds = differenceInSeconds(endDate, startDate)

  return { startDate, endDate, timeSpanInSeconds }
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