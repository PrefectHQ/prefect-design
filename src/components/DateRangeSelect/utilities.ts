import { addSeconds, endOfDay, format, intervalToDuration, isSameDay, startOfDay } from 'date-fns'
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
  if (isPickerSingleDayRange({ startDate, endDate })) {
    return format(startDate, dateFormat)
  }

  if (isPickerDateRange({ startDate, endDate })) {
    return `${format(startDate, dateFormat)} - ${format(endDate, dateFormat)}`
  }

  return `${format(startDate, dateTimeFormat)} - ${format(endDate, dateTimeFormat)}`
}

function isPickerSingleDayRange({ startDate, endDate }: DateRange): boolean {
  return isPickerDateRange({ startDate, endDate }) && isSameDay(startDate, endDate)
}

export function isPickerDateRange({ startDate, endDate }: DateRange): boolean {
  return startOfDay(startDate).getTime() === startDate.getTime() && endOfDay(endDate).getTime() === endDate.getTime()
}