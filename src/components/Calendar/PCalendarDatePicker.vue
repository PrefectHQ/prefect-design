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
        <slot name="date" v-bind="scope(date)">
          <PButton
            small
            flat
            class="p-calendar-date-picker__date"
            :class="getDateClasses(date)"
            :disabled="isDateDisabled(date)"
            @click="setSelected(date)"
          >
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
  import { isDateAfter, isDateBefore, isNotNullish } from '@/utilities'

  type DateSlotScope = {
    date: Date,
    today: boolean,
    disabled: boolean,
    selected: boolean,
    inMonth: boolean,
    select: () => void,
  }

  const props = defineProps<{
    modelValue: Date | null | undefined,
    viewingDate: Date,
    min?: Date | null | undefined,
    max?: Date | null | undefined,
  }>()

  const emit = defineEmits<{
    'update:modelValue': [value: Date | null | undefined],
    'update:viewingDate': [value: Date | null | undefined],
    'mode': [mode: 'month' | 'year'],
  }>()

  defineSlots<{
    date: (props: DateSlotScope) => any,
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

  function isDateDisabled(date: Date): boolean {
    if (props.min && isDateBefore(date, props.min)) {
      return true
    }

    if (props.max && isDateAfter(date, props.max)) {
      return true
    }

    return false
  }

  function scope(date: Date): DateSlotScope {
    const today = isToday(date)
    const disabled = isDateDisabled(date)
    const select = (): void => setSelected(date)
    const inMonth = isNotNullish(viewingDate.value) && isSameMonth(date, viewingDate.value)
    const isSelected = isNotNullish(selected.value) && isSameDay(date, selected.value)

    return {
      date,
      today,
      disabled,
      select,
      selected: isSelected,
      inMonth,
    }
  }

  function getDateClasses(date: Date): ClassValue {
    const { today, selected, inMonth } = scope(date)

    return {
      'p-calendar-date-picker__date--today': today,
      'p-calendar-date-picker__date--selected': selected,
      'p-calendar-date-picker__date--in-month': inMonth,
      'p-calendar-date-picker__date--out-of-month': !inMonth,
    }
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