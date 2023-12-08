import { addSeconds, format, intervalToDuration, isSameDay } from 'date-fns'
import { toPluralString } from '@/utilities'

type DateRange = {
  startDate: Date,
  endDate: Date,
}

const dateFormat = 'MMM do, yyyy'
const timeFormat = 'hh:mm a'
const dateTimeFormat = `${dateFormat} 'at' ${timeFormat}`

export function getDateSpanLabel(seconds: number): string {

  const now = new Date()
  const duration = intervalToDuration({
    start: now,
    end: addSeconds(now, seconds),
  })

  const reduced = Object.entries(duration).reduce<string[]>((durations, [key, value]) => {
    if (value) {
      const unit = key.slice(0, -1)
      durations.push(`${value} ${toPluralString(unit, value)}`)
    }

    return durations
  }, [])

  const direction = seconds < 0 ? 'Past' : 'Next'

  return `${direction} ${reduced.join(' ')}`
}

export function getDateRangeLabel({ startDate, endDate }: DateRange): string {
  if (isSingleDay({ startDate, endDate })) {
    return format(startDate, dateFormat)
  }

  if (isDateRange({ startDate, endDate })) {
    return `${format(startDate, dateFormat)} - ${format(endDate, dateFormat)}`
  }

  return `${format(startDate, dateTimeFormat)} - ${format(endDate, dateTimeFormat)}`
}

function isSingleDay({ startDate, endDate }: DateRange): boolean {
  return isDateRange({ startDate, endDate }) && isSameDay(startDate, endDate)
}

function isDateRange({ startDate, endDate }: DateRange): boolean {
  return startDate.getMinutes() === 0 && endDate.getMinutes() === 59
}