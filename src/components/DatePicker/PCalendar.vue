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
        <slot name="date" :date="date">
          <div class="p-calendar__date">
            {{ date.getDate() }}
          </div>
        </slot>
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { startOfDay } from 'date-fns'
  import { computed } from 'vue'
  import { dayNames } from '@/types/date'

  const props = defineProps<{
    month: number,
    year: number,
  }>()

  const selectedMonth = computed(() => {
    const value = startOfDay(new Date())

    value.setMonth(props.month)
    value.setFullYear(props.year)

    return value
  })

  const startOfMonth = computed(() => {
    const value = new Date(selectedMonth.value)

    value.setDate(1)

    return value
  })

  const endOfMonth = computed(() => {
    const value = new Date(selectedMonth.value)

    value.setDate(0)
    value.setMonth(value.getMonth() + 1)

    return value
  })

  const startOfRange = computed(() => {
    const start = new Date(startOfMonth.value)

    while (start.getDay() > 0) {
      start.setDate(start.getDate() - 1)
    }

    return start
  })

  const dates = computed(() => {
    const value: Date[] = []
    const endTime = endOfMonth.value.getTime()
    const date = new Date(startOfRange.value)

    while (date.getTime() < endTime || date.getDay() > 0) {
      value.push(new Date(date))
      date.setDate(date.getDate() + 1)
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

.p-calendar__date { @apply
  text-center
}
</style>