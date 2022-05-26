import { isAfter, isBefore, isSameDay, isSameHour, isSameMinute, isSameMonth, isSameYear } from 'date-fns'

type DateRange = {
  min?: Date | null | undefined,
  max?: Date | null | undefined,
}
type DateRangeMethods = {
  keepDateInRange: (date: Date | null) => Date | null,
  isAfterMin: (date: Date, precision?: Precision) => boolean,
  isBeforeMin: (date: Date, precision?: Precision) => boolean,
  isBeforeMax: (date: Date, precision?: Precision) => boolean,
  isAfterMax: (date: Date, precision?: Precision) => boolean,
  isDateInRange: (date: Date, precision?: Precision) => boolean,
}
type Precision = 'minute' | 'hour' | 'day' | 'month' | 'year'

function useDateRangeMethods(range: DateRange): DateRangeMethods {
  function keepDateInRange(date: Date | null): Date | null {
    if (date && range.min && isBefore(date, range.min)) {
      return range.min
    }

    if (date && range.max && isAfter(date, range.max)) {
      return range.max
    }

    return date
  }

  function isMatchingPrecision(dateLeft: Date, dateRight: Date, precision: Precision): boolean {
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

  function isAfterMin(date: Date, precision: Precision = 'minute'): boolean {
    return !range.min || isAfter(date, range.min) || isMatchingPrecision(date, range.min, precision)
  }

  function isBeforeMin(date: Date): boolean {
    return !isAfterMin(date)
  }

  function isBeforeMax(date: Date, precision: Precision = 'minute'): boolean {
    return !range.max || isBefore(date, range.max) || isMatchingPrecision(date, range.max, precision)
  }

  function isAfterMax(date: Date): boolean {
    return !isBeforeMax(date)
  }

  function isDateInRange(date: Date, precision: Precision = 'minute'): boolean {
    return isAfterMin(date, precision) && isBeforeMax(date, precision)
  }

  return { keepDateInRange, isAfterMin, isBeforeMin, isBeforeMax, isAfterMax, isDateInRange }
}

export { useDateRangeMethods }
export type { Precision }