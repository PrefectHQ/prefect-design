/* eslint-disable no-redeclare */
import { computed } from '@vue/reactivity'
import { isAfter, isBefore, isSameDay, isSameHour, isSameMinute, isSameMonth, isSameYear } from 'date-fns'
import { WritableComputedRef } from 'vue'

type DateProps = Readonly<{
  modelValue: Date | null | undefined,
  min?: Date | null | undefined,
  max?: Date | null | undefined,
}>
type DateEmits = (event: 'update:modelValue', value: Date | null) => void
type DateRangeMethods = {
  isAfterMin: (date: Date, precision?: Precision) => boolean,
  isBeforeMin: (date: Date, precision?: Precision) => boolean,
  isBeforeMax: (date: Date, precision?: Precision) => boolean,
  isAfterMax: (date: Date, precision?: Precision) => boolean,
  isDateInRange: (date: Date, precision?: Precision) => boolean,
}
type Precision = 'minute' | 'hour' | 'day' | 'month' | 'year'

function useDateModelValueWithRange(props: DateProps, emits: DateEmits): DateRangeMethods & {
  selectedDate: WritableComputedRef<Date | null>,
}
function useDateModelValueWithRange(props: DateProps, emits: DateEmits, defaultValue: Date): DateRangeMethods &{
  selectedDate: WritableComputedRef<Date>,
}
function useDateModelValueWithRange(props: DateProps, emits: DateEmits, defaultValue?: Date): DateRangeMethods &{
  selectedDate: WritableComputedRef<Date | null> | WritableComputedRef<Date>,
} {
  const selectedDate = computed({
    get() {
      return props.modelValue ?? defaultValue ?? null
    },
    set(value: Date | null) {
      if (value && props.min && isBefore(value, props.min)) {
        return emits('update:modelValue', props.min)
      }

      if (value && props.max && isAfter(value, props.max)) {
        return emits('update:modelValue', props.max)
      }

      emits('update:modelValue', value)
    },
  })

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
    return !props.min || isAfter(date, props.min) || isMatchingPrecision(date, props.min, precision)
  }

  function isBeforeMin(date: Date): boolean {
    return !isAfterMin(date)
  }

  function isBeforeMax(date: Date, precision: Precision = 'minute'): boolean {
    return !props.max || isBefore(date, props.max) || isMatchingPrecision(date, props.max, precision)
  }

  function isAfterMax(date: Date): boolean {
    return !isBeforeMax(date)
  }

  function isDateInRange(date: Date, precision: Precision = 'minute'): boolean {
    return isAfterMin(date, precision) && isBeforeMax(date, precision)
  }

  return { selectedDate, isAfterMin, isBeforeMin, isBeforeMax, isAfterMax, isDateInRange }
}

export { useDateModelValueWithRange }
export type { Precision }