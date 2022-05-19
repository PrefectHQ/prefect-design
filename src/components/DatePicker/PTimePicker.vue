<template>
  <div class="p-time-picker">
    <scrolling-picker v-model="selectedHours" :options="hourOptions" class="p-time-picker__hours">
      <template #before>
        <div class="p-time-picker--gap" />
      </template>
      <template #after>
        <div class="p-time-picker--gap" />
      </template>
    </scrolling-picker>
    <scrolling-picker v-model="selectedMinutes" :options="minuteOptions" class="p-time-picker__minutes" prevent-focus>
      <template #before>
        <div class="p-time-picker--gap" />
      </template>
      <template #after>
        <div class="p-time-picker--gap" />
      </template>
    </scrolling-picker>
    <scrolling-picker v-model="selectedMeridiem" :options="meridiemOptions" class="p-time-picker__meridiem" prevent-focus>
      <template #before>
        <div class="p-time-picker--gap" />
      </template>
      <template #after>
        <div class="p-time-picker--gap" />
      </template>
    </scrolling-picker>
  </div>
</template>

<script lang="ts" setup>
  import { endOfDay, format, set, setHours, setMinutes, startOfDay } from 'date-fns'
  import { computed } from 'vue'
  import ScrollingPicker from '@/components/DatePicker/ScrollingPicker.vue'
  import { useDateModelValueWithRange } from '@/compositions/useDateModelValueWithRange'
  import { SelectModelValue } from '@/types/selectOption'

  const props = defineProps<{
    // eslint-disable-next-line vue/no-unused-properties
    modelValue: Date | null | undefined,
    // eslint-disable-next-line vue/no-unused-properties
    min?: Date | null | undefined,
    // eslint-disable-next-line vue/no-unused-properties
    max?: Date | null | undefined,
  }>()

  const emits = defineEmits<{
    (event: 'update:modelValue', value: Date | null): void,
  }>()

  const { selectedDate, isBeforeMin, isAfterMax, isDateInRange } = useDateModelValueWithRange(props, emits, new Date())

  const selectedHours = computed({
    get() {
      return parseInt(format(selectedDate.value, 'h'))
    },
    set(hours: SelectModelValue) {
      selectedDate.value = applyHours(selectedDate.value, hours as number)
    },
  })

  const selectedMinutes = computed({
    get() {
      return parseInt(format(selectedDate.value, 'mm'))
    },
    set(value: SelectModelValue) {
      selectedDate.value = setMinutes(selectedDate.value, value as number)
    },
  })

  const selectedMeridiem = computed({
    get() {
      return format(selectedDate.value, 'a')
    },
    set(meridiem: SelectModelValue) {
      selectedDate.value = applyMeridiem(selectedDate.value, meridiem as 'AM' | 'PM')
    },
  })

  function applyHours(date: Date, hours: number): Date {
    hours = hours % 12
    const meridiem = format(selectedDate.value, 'a')

    if (meridiem === 'AM') {
      return setHours(date, hours)
    }

    return setHours(date, hours + 12)
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
    return !isBeforeMin(interval.end) && !isAfterMax(interval.start)
  }

  const hourOptions = computed(() => [...new Array(12).keys()].map(hour => {
    hour += 1
    const dateValue = applyHours(selectedDate.value, hour)

    return {
      label: format(dateValue, 'h'),
      value: hour,
      disabled: !isDateInRange(dateValue, 'hour'),
    }
  }))

  const minuteOptions = computed(() => [...new Array(60).keys()].map(minute => {
    const dateValue = setMinutes(selectedDate.value, minute)

    return {
      label: format(dateValue, 'mm'),
      value: minute,
      disabled: !isDateInRange(dateValue),
    }
  }))

  const meridiemOptions = computed(() => {
    const beforeMeridiem = {
      start: startOfDay(selectedDate.value),
      end: set(selectedDate.value, { hours: 11, minutes: 59 }),
    }
    const afterMeridiem = {
      start: set(selectedDate.value, { hours: 12, minutes: 0 }),
      end: endOfDay(selectedDate.value),
    }

    return [
      {
        label:'AM',
        value:'AM',
        disabled: !isDateRangeOverlappingRange(beforeMeridiem),
      },
      {
        label:'PM',
        value:'PM',
        disabled: !isDateRangeOverlappingRange(afterMeridiem),
      },
    ]
  })
</script>

<style>
.p-time-picker {
  --row-height: 28px;
  --gap-height: 0.5rem;
}

.p-time-picker { @apply
  flex
  flex-auto
  items-start
  justify-center
  h-full
}

.p-time-picker__hours,
.p-time-picker__minutes,
.p-time-picker__meridiem { @apply
  h-full
}

.p-time-picker {
  height: calc((var(--row-height) + var(--gap-height)) * 7);
}

.p-time-picker--gap {
  min-height: calc(var(--row-height) * 3 + var(--gap-height));
}
</style>