<template>
  <div class="p-calendar">
    <div class="p-calendar__days-of-week">
      <template v-for="dayName in dayNames" :key="dayName">
        <div class="p-calendar__day-of-week">
          {{ dayName.slice(0, 2) }}
        </div>
      </template>
    </div>
    <div class="p-calendar__dates">
      <template v-for="date in dates" :key="date.getTime()">
        <div class="p-calendar-date">
          <slot name="date" :date="date">
            {{ date.getUTCDate() }}
          </slot>
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import { dayNames, getStartOfDay } from '@/types/date'

  const props = defineProps<{
    month: number,
    year: number,
  }>()

  const selectedMonth = computed(() => {
    const value = getStartOfDay()

    value.setUTCMonth(props.month)
    value.setUTCFullYear(props.year)

    return value
  })

  const startOfMonth = computed(() => {
    const value = new Date(selectedMonth.value)

    value.setUTCDate(1)

    return value
  })

  const endOfMonth = computed(() => {
    const value = new Date(selectedMonth.value)

    value.setUTCDate(0)
    value.setUTCMonth(value.getUTCMonth() + 1)

    return value
  })

  const startOfRange = computed(() => {
    const start = new Date(startOfMonth.value)

    while (start.getUTCDay() > 0) {
      start.setUTCDate(start.getUTCDate() - 1)
    }

    return start
  })

  const dates = computed(() => {
    const value: Date[] = []
    const endTime = endOfMonth.value.getTime()
    const date = new Date(startOfRange.value)

    while (date.getTime() < endTime || date.getUTCDay() > 0) {
      value.push(new Date(date))
      date.setUTCDate(date.getUTCDate() + 1)
    }

    return value
  })
</script>

<style>
.p-calendar { @apply
  flex
  flex-col
  gap-y-3
  px-4
  py-3
  select-none
}

.p-calendar__days-of-week { @apply
  grid
  grid-cols-7
  gap-x-3
  text-xs
  text-gray-500
}

.p-calendar__day-of-week { @apply
  capitalize
  text-center
}

.p-calendar__dates { @apply
  grid
  grid-cols-7
  gap-y-2
  gap-x-3
}

.p-calendar-date { @apply
  text-center
  rounded
}
</style>