import { endOfDay, format, set, setHours, setMinutes, startOfDay } from 'date-fns'
import { computed, ComputedRef, ref, WritableComputedRef } from 'vue'
import { SelectOption } from '@/types'
import { MaybeRef } from '@/types/ref'
import { DateRange, isDateAfter, isDateBefore, isDateInRange } from '@/utilities/dates'

export type UseTimeParts = {
  selectedHours: WritableComputedRef<number>,
  selectedMinutes: WritableComputedRef<number>,
  selectedMeridiem: WritableComputedRef<string>,
  hourOptions: ComputedRef<SelectOption[]>,
  minuteOptions: ComputedRef<SelectOption[]>,
  meridiemOptions: ComputedRef<SelectOption[]>,
}

export function useTimeParts(value: MaybeRef<Date>, range: MaybeRef<DateRange> = { min: undefined, max: undefined }): UseTimeParts {
  const valueRef = ref(value)
  const rangeRef = ref(range)

  const selectedHours = computed({
    get() {
      return parseInt(format(valueRef.value, 'h'))
    },
    set(hours) {
      valueRef.value = applyHours(valueRef.value, hours as number)
    },
  })

  const selectedMinutes = computed({
    get() {
      return parseInt(format(valueRef.value, 'mm'))
    },
    set(value) {
      valueRef.value = applyMinutes(valueRef.value, value as number)
    },
  })

  const selectedMeridiem = computed({
    get() {
      return format(valueRef.value, 'a')
    },
    set(meridiem) {
      valueRef.value = applyMeridiem(valueRef.value, meridiem as 'AM' | 'PM')
    },
  })

  function applyHours(date: Date, hours: number): Date {
    hours = hours % 12
    const meridiem = format(valueRef.value, 'a')

    if (meridiem === 'AM') {
      return setHours(date, hours)
    }

    return setHours(date, hours + 12)
  }

  function applyMinutes(date: Date, minutes: number): Date {
    return setMinutes(date, minutes)
  }

  function applyMeridiem(date: Date, meridiem: 'AM' | 'PM'): Date {
    const currentMeridiem = format(date, 'a')
    const currentHours = date.getHours()

    if (meridiem === 'AM' && currentMeridiem !== 'AM') {
      return setHours(date, currentHours - 12)
    }

    if (meridiem === 'PM' && currentMeridiem !== 'PM') {
      return setHours(date, currentHours + 12)
    }

    return date
  }

  function isDateRangeOverlappingRange(interval: { start: Date, end: Date }): boolean {
    return (!rangeRef.value.min || !isDateBefore(interval.end, rangeRef.value.min)) && (!rangeRef.value.max || !isDateAfter(interval.start, rangeRef.value.max))
  }

  const hourOptions = computed(() => [...new Array(12).keys()].map(hour => {
    hour += 1
    const dateValue = applyHours(valueRef.value, hour)

    return {
      label: format(dateValue, 'h'),
      value: hour,
      disabled: !isDateInRange(dateValue, rangeRef.value, 'hour'),
    }
  }))

  const minuteOptions = computed(() => [...new Array(60).keys()].map(minute => {
    const dateValue = setMinutes(valueRef.value, minute)

    return {
      label: format(dateValue, 'mm'),
      value: minute,
      disabled: !isDateInRange(dateValue, rangeRef.value),
    }
  }))

  const meridiemOptions = computed(() => {
    const beforeMeridiem = {
      start: startOfDay(valueRef.value),
      end: set(valueRef.value, { hours: 11, minutes: 59 }),
    }
    const afterMeridiem = {
      start: set(valueRef.value, { hours: 12, minutes: 0 }),
      end: endOfDay(valueRef.value),
    }

    return [
      {
        label: 'AM',
        value: 'AM',
        disabled: !isDateRangeOverlappingRange(beforeMeridiem),
      },
      {
        label: 'PM',
        value: 'PM',
        disabled: !isDateRangeOverlappingRange(afterMeridiem),
      },
    ]
  })

  return {
    selectedHours,
    selectedMinutes,
    selectedMeridiem,
    hourOptions,
    minuteOptions,
    meridiemOptions,
  }
}