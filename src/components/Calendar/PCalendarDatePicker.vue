<template>
  <div class="p-calendar-date-picker">
    <div class="p-calendar-date-picker__days-of-week">
      <template v-for="day in days" :key="day">
        <div class="p-calendar-date-picker__day-of-week">
          {{ day }}
        </div>
      </template>
    </div>
    <div class="p-calendar-date-picker__dates">
      <template v-for="date in dates" :key="date.getTime()">
        <slot name="date" :date="date" :select="() => setSelected(date)">
          <PButton small flat class="p-calendar-date-picker__date" :class="getDateClasses(date)" @click="setSelected(date)">
            {{ date.getDate() }}
          </PButton>
        </slot>
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { eachDayOfInterval, endOfMonth, endOfWeek, format, isSameDay, isSameMonth, isToday, startOfMonth, startOfWeek } from 'date-fns'
  import { computed } from 'vue'
  import { ClassValue } from '@/types/attributes'
  import { isNotNullish } from '@/utilities'

  type DateParams = {
    date: Date,
    today: boolean,
  }

  type Classes = {
    date: (params: DateParams) => ClassValue,
    button: (params: DateParams) => ClassValue,
  }

  const props = defineProps<{
    modelValue: Date | null | undefined,
    viewingDate: Date,
    classes?: Classes,
  }>()

  const emit = defineEmits<{
    'update:modelValue': [value: Date | null | undefined],
    'update:viewingDate': [value: Date | null | undefined],
    'mode': [mode: 'month' | 'year'],
  }>()

  const selected = computed({
    get() {
      return props.modelValue
    },
    set(value) {
      emit('update:modelValue', value)
    },
  })

  const viewingDate = computed({
    get() {
      return props.viewingDate
    },
    set(value) {
      emit('update:viewingDate', value)
    },
  })

  const days = eachDayOfInterval({ start: startOfWeek(new Date()), end: endOfWeek(new Date()) }).map(x => format(x, 'EEEEEE'))


  const dates = computed(() => {
    const monthStart = startOfMonth(viewingDate.value)
    const start = startOfWeek(monthStart)
    const monthEnd = endOfMonth(viewingDate.value)
    const end = endOfWeek(monthEnd)

    return eachDayOfInterval({ start, end })
  })

  function getDateClasses(date: Date): ClassValue {
    const today = isToday(date)
    const sameMonth = isNotNullish(viewingDate.value) && isSameMonth(date, viewingDate.value)
    const custom = props.classes?.button({ date, today })
    const isSelected = isNotNullish(selected.value) && isSameDay(date, selected.value)

    const builtIn: ClassValue = {
      'p-calendar-date-picker__date--today': today,
      'p-calendar-date-picker__date--selected': isSelected,
      'p-calendar-date-picker__date--in-month': sameMonth,
      'p-calendar-date-picker__date--out-of-month': !sameMonth,
    }

    return [builtIn, custom]
  }

  function setSelected(date: Date): void {
    selected.value = date
  }
</script>

<style>
.p-calendar-date-picker { @apply
  flex
  flex-col
  flex-grow
  gap-y-3
  select-none
}

.date-picker__header { @apply
  flex
  justify-between
  items-center
}

.p-calendar-date-picker__days-of-week { @apply
  grid
  grid-cols-7
  gap-x-3
  text-xs
  text-subdued
}

.p-calendar-date-picker__day-of-week { @apply
  text-center
}

.p-calendar-date-picker__dates { @apply
  grid
  grid-cols-7
  gap-y-2
  gap-x-3
  flex-grow;
  grid-auto-rows: minmax(0, 1fr)
}

.p-calendar-date-picker__date { @apply
  aspect-square
  text-center
}

.p-calendar-date-picker__date--out-of-month { @apply
  text-subdued
}

.p-calendar-date-picker__date--selected { @apply
  bg-[var(--p-color-input-checked-bg)]
}

.p-calendar-date-picker__date--today { @apply
  border-[1px]
  border-live
}
</style>