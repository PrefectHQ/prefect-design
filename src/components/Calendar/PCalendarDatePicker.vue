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
        <PButton small flat class="p-calendar-date-picker__date" :class="getDateClasses(date)" @click="setSelected(date)">
          <slot name="date" :date="date">
            {{ date.getDate() }}
          </slot>
        </PButton>
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { eachDayOfInterval, endOfMonth, endOfWeek, format, isSameDay, isSameMonth, isToday, startOfMonth, startOfWeek } from 'date-fns'
  import { computed, ref } from 'vue'
  import { ClassValue } from '@/types/attributes'

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
    classes?: Classes,
  }>()

  const emit = defineEmits<{
    'update:modelValue': [selected: Date | null | undefined],
    'mode': [mode: 'month' | 'year'],
  }>()

  const fallbackSelected = ref(new Date())
  const selected = computed({
    get() {
      return props.modelValue ?? fallbackSelected.value
    },
    set(value) {
      emit('update:modelValue', value)
      fallbackSelected.value = value
    },
  })

  const days = eachDayOfInterval({ start: startOfWeek(new Date()), end: endOfWeek(new Date()) }).map(x => format(x, 'EEEEEE'))


  const dates = computed(() => {
    const monthStart = startOfMonth(selected.value)
    const start = startOfWeek(monthStart)
    const monthEnd = endOfMonth(selected.value)
    const end = endOfWeek(monthEnd)

    return eachDayOfInterval({ start, end })
  })

  function getDateClasses(date: Date): ClassValue {
    const today = isToday(date)
    const sameMonth = isSameMonth(date, selected.value)
    const custom = props.classes?.button({ date, today })
    const isSelected = isSameDay(date, selected.value)

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