<template>
  <div class="p-calendar">
    <div class="p-calendar__days-of-week">
      <template v-for="day in days" :key="day">
        <div class="p-calendar__day-of-week">
          {{ day }}
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
  import { format, eachDayOfInterval, startOfWeek, endOfWeek, endOfMonth, startOfMonth, set } from 'date-fns'
  import { computed } from 'vue'

  const props = defineProps<{
    month: number,
    year: number,
  }>()

  const days = eachDayOfInterval({ start: startOfWeek(new Date()), end: endOfWeek(new Date()) }).map(x => format(x, 'EEEEEE'))

  const selectedDate = computed(() => set(new Date(), { year: props.year, month: props.month }))

  const dates = computed(() => {
    const monthStart = startOfMonth(selectedDate.value)
    const start = startOfWeek(monthStart)
    const monthEnd = endOfMonth(selectedDate.value)
    const end = endOfWeek(monthEnd)

    return eachDayOfInterval({ start, end })
  })
</script>

<style>
.p-calendar { @apply
  flex
  flex-col
  flex-grow
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
  text-center
}

.p-calendar__dates { @apply
  grid
  grid-cols-7
  gap-y-2
  gap-x-3
  flex-grow;
  grid-auto-rows: minmax(0, 1fr)
}

.p-calendar__date { @apply
  text-center
}
</style>