<template>
  <div class="p-calendar">
    <div class="p-calendar__month-bar">
      <slot
        name="month-bar"
        :month="selectedMonth"
        :month-name="monthNames[selectedMonth]"
      >
        <p-icon class="p-calendar__icon" icon="ChevronLeftIcon" @click="subtractMonth" />
        {{ monthNames[selectedMonth] }} {{ selectedYear }}
        <p-icon class="p-calendar__icon" icon="ChevronRightIcon" @click="addMonth" />
      </slot>
    </div>
    <div class="p-calendar__days-of-week">
      <template v-for="dayName in dayNames" :key="dayName">
        <div class="p-calendar__day-of-week">
          {{ dayName.slice(0, 2) }}
        </div>
      </template>
    </div>
    <div class="p-calendar__dates">
      <template v-for="date in dates" :key="date.getTime()">
        <slot
          name="date"
          :date="date"
          :is-today="isToday(date)"
          :is-selected="isSelected(date)"
          :is-in-month="isInMonth(date)"
        >
          <div class="p-calendar-date" :class="classes.date(date)" @click="selectedDate = date">
            {{ date.getUTCDate() }}
          </div>
        </slot>
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { computed, ref } from 'vue'
  import PIcon from '@/components/Icon'

  const dayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
  const monthNames = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december']
  const today = new Date()
  today.setUTCHours(0, 0, 0, 0)

  const selectedDate = ref(new Date(today))

  const selectedMonth = computed(() => selectedDate.value.getUTCMonth())
  const selectedYear = computed(() => selectedDate.value.getUTCFullYear())

  const startOfMonth = computed(() => {
    const value = new Date(selectedDate.value)

    value.setUTCDate(1)

    return value
  })

  const endOfMonth = computed(() => {
    const value = new Date(selectedDate.value)

    value.setUTCMonth(value.getUTCMonth() + 1)
    value.setUTCDate(0)

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

  const classes = computed(() => ({
    date: (date: Date) => ({
      'p-calendar-date--today': isToday(date),
      'p-calendar-date--selected': isSelected(date),
      'p-calendar-date--out-of-month': !isInMonth(date),
    }),
  }))

  function subtractMonth(): void {
    const value = new Date(selectedDate.value)

    value.setUTCMonth(value.getUTCMonth() - 1)

    selectedDate.value = value
  }

  function addMonth(): void {
    const value = new Date(selectedDate.value)

    value.setUTCMonth(value.getUTCMonth() + 1)

    selectedDate.value = value
  }

  function isToday(date: Date): boolean {
    return date.getTime() === today.getTime()
  }

  function isSelected(date: Date): boolean {
    return date.getTime() === selectedDate.value.getTime()
  }

  function isInMonth(date: Date): boolean {
    return date.getUTCMonth() === selectedMonth.value
  }
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

.p-calendar__month-bar { @apply
  text-center
  font-bold
  capitalize
  flex
  justify-between
  items-center
}

.p-calendar__icon { @apply
  h-4
  w-4
  cursor-pointer
  text-gray-500
  hover:text-black
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
  hover:bg-gray-100
  cursor-pointer
  rounded
}

.p-calendar-date--today { @apply
  text-prefect-600
}

.p-calendar-date--selected { @apply
  text-white
  bg-prefect-600
  hover:bg-prefect-800
}

.p-calendar-date--out-of-month { @apply
  text-gray-300
}
</style>