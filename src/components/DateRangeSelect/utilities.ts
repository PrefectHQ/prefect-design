import { format, isSameDay, startOfDay, endOfDay, Duration, isSameYear } from 'date-fns'
import { secondsInDay, secondsInHour, secondsInMinute, secondsInMonth, secondsInWeek } from 'date-fns/constants'
import { DateRangeSelectAroundValue, DateRangeSelectPeriodValue, DateRangeSelectRangeValue, DateRangeSelectSpanValue, DateRangeSelectValue } from '@/types'
import { toPluralString } from '@/utilities'


type DateRange = {
  startDate: Date,
  endDate: Date,
}

const dateFormat = 'MMM do'
const dateAndYearFormat = 'MMM do, yyyy'
const timeFormat = 'hh:mm a'
const dateTimeFormat = `${dateFormat} 'at' ${timeFormat}`
const dateTimeAndYearFormat = `${dateAndYearFormat} 'at' ${timeFormat}`

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
  const absSeconds = Math.abs(seconds)

  // nb: Because secondsInMonth is an average, just return Past month label when option is selected
  if (absSeconds === secondsInMonth) {
    return 'Past month'
  }

  const duration: Duration = {
    months: Math.floor(absSeconds / secondsInMonth),
    weeks: Math.floor(absSeconds % secondsInMonth / secondsInWeek),
    days: Math.floor(absSeconds % secondsInWeek / secondsInDay),
    hours: Math.floor(absSeconds % secondsInDay / secondsInHour),
    minutes: Math.floor(absSeconds % secondsInHour / secondsInMinute),
    seconds: Math.floor(absSeconds % secondsInMinute),
  }

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
    const startDateFormat = isSameYear(startDate, new Date()) ? dateFormat : dateAndYearFormat

    return format(startDate, startDateFormat)
  }

  if (isFullDateRange({ startDate, endDate })) {
    const startDateFormat = isSameYear(startDate, new Date()) ? dateFormat : dateAndYearFormat
    const endDateFormat = isSameYear(endDate, new Date()) ? dateFormat : dateAndYearFormat

    return `${format(startDate, startDateFormat)} - ${format(endDate, endDateFormat)}`
  }

  const startDateFormat = isSameYear(startDate, new Date()) ? dateTimeFormat : dateTimeAndYearFormat
  const endDateFormat = isSameYear(endDate, new Date()) ? dateTimeFormat : dateTimeAndYearFormat

  return `${format(startDate, startDateFormat)} - ${format(endDate, endDateFormat)}`
}

function getDateAroundLabel({ date, quantity, unit }: DateRangeSelectAroundValue): string {
  const dateString = isStartOfDay(date) ? format(date, dateAndYearFormat) : format(date, dateTimeAndYearFormat)

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