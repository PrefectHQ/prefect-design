import { intervalToDuration, addSeconds, format, isSameDay, startOfDay, endOfDay } from 'date-fns'
import { DateRangeSelectAroundValue, DateRangeSelectPeriodValue, DateRangeSelectRangeValue, DateRangeSelectSpanValue, DateRangeSelectValue } from '@/types'
import { toPluralString } from '@/utilities'

type DateRange = {
  startDate: Date,
  endDate: Date,
}

const dateFormat = 'MMM do, yyyy'
const timeFormat = 'hh:mm a'
const dateTimeFormat = `${dateFormat} 'at' ${timeFormat}`

export function getDateRangeSelectValueLabel(value: DateRangeSelectValue): string | null {
  if (!value) {
    return null
  }
  const { type } = value

  switch (type) {
    case 'span':
      return getDateSpanLabel(value)
    case 'range':
      return getDateRangeLabel(value)
    case 'around':
      return getDateAroundLabel(value)
    case 'period':
      return getPeriodLabel(value)
    default:
      const exhaustive: never = type
      throw new Error(`Label not found for date range type: ${exhaustive}`)
  }
}

function getDateSpanLabel({ seconds }: DateRangeSelectSpanValue): string {
  const now = new Date()
  const duration = intervalToDuration({
    start: now,
    end: addSeconds(now, seconds),
  })

  const reduced = Object.entries(duration).reduce<string[]>((durations, [key, value]) => {
    if (value) {
      const unit = key.slice(0, -1)
      if (value === 1) {
        durations.push(unit)
        return durations
      }

      durations.push(`${value} ${toPluralString(unit, value)}`)
    }

    return durations
  }, [])

  const direction = seconds < 0 ? 'Past' : 'Next'

  return `${direction} ${reduced.join(' ')}`
}

function getDateRangeLabel({ startDate, endDate }: DateRangeSelectRangeValue): string {
  if (isPickerSingleDayRange({ startDate, endDate })) {
    return format(startDate, dateFormat)
  }

  if (isFullDateRange({ startDate, endDate })) {
    return `${format(startDate, dateFormat)} - ${format(endDate, dateFormat)}`
  }

  return `${format(startDate, dateTimeFormat)} - ${format(endDate, dateTimeFormat)}`
}

function getDateAroundLabel({ date, quantity, unit }: DateRangeSelectAroundValue): string {
  const dateString = isStartOfDay(date) ? format(date, dateFormat) : format(date, dateTimeFormat)

  return `${quantity} ${toPluralString(unit, quantity)} around ${dateString}`
}

function getPeriodLabel({ period }: DateRangeSelectPeriodValue): string {
  return period
}

function isStartOfDay(date: Date): boolean {
  return startOfDay(date).getTime() === date.getTime()
}

function isEndOfDay(date: Date): boolean {
  return endOfDay(date).getTime() === date.getTime()
}

function isPickerSingleDayRange({ startDate, endDate }: DateRange): boolean {
  return isFullDateRange({ startDate, endDate }) && isSameDay(startDate, endDate)
}

export function isFullDateRange({ startDate, endDate }: DateRange): boolean {
  return isStartOfDay(startDate) && isEndOfDay(endDate)
}