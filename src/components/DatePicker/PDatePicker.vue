<template>
  <div class="p-date-picker" :class="classes.picker">
    <div class="p-date-picker__top-bar">
      <template v-if="overlay">
        <PButton
          class="p-date-picker__close-icon"
          flat
          icon="XIcon"
          size="sm"
          @click="closeOverlay"
        />
      </template>
      <template v-else>
        <PButton
          class="p-date-picker__previous-icon"
          flat
          icon="ChevronLeftIcon"
          size="sm"
          :disabled="previousDisabled"
          @click="viewingDate = addMonths(viewingDate, -1)"
        />
      </template>
      <div class="p-date-picker__title">
        <PButton class="p-date-picker__title-month" flat @click="setOverlay('month')">
          {{ viewingMonth }}
        </PButton>
        <PButton class="p-date-picker__title-year" flat @click="setOverlay('year')">
          {{ viewingYear }}
        </PButton>
      </div>
      <PButton
        class="p-date-picker__next-icon"
        flat
        icon="ChevronRightIcon"
        size="sm"
        :disabled="nextDisabled"
        @click="viewingDate = addMonths(viewingDate, 1)"
      />
    </div>

    <div class="p-date-picker__body">
      <PCalendar :month="viewingDate.getMonth()" :year="viewingDate.getFullYear()">
        <template #date="{ date }">
          <slot
            name="date"
            :date="date"
            :disabled="!!overlay || !isDateInRange(date, range, 'day')"
            :today="isSameDay(date, new Date())"
            :selected="isSameDayAsSelectedDate(date)"
            :out-of-month="!isSameMonth(date, viewingDate)"
            :select="() => updateSelectedDate(date)"
          >
            <PButton
              class="p-date-picker__date"
              :class="classes.date(date)"
              :flat="!isSameDayAsSelectedDate(date)"
              :disabled="!!overlay || !isDateInRange(date, range, 'day')"
              size="xs"
              @click="updateSelectedDate(date)"
            >
              {{ date.getDate() }}
            </PButton>
          </slot>
        </template>
      </PCalendar>

      <div class="p-date-picker__bottom-bar">
        <template v-if="showTime && selectedDate">
          <PButton class="p-date-picker__time-button" size="sm" flat @click="setOverlay('time')">
            {{ time }}
          </PButton>
        </template>
        <div class="p-date-picker__actions">
          <template v-if="isDateInRange(new Date(), range, 'day')">
            <PButton class="p-date-picker__today-button" size="sm" flat :disabled="todayDisabled" @click="handleTodayClick">
              {{ showTime ? 'Now' : 'Today' }}
            </PButton>
          </template>
          <template v-if="clearable">
            <PButton class="p-date-picker__clear-button" size="sm" flat :disabled="selectedDate === null" @click="selectedDate = null">
              Clear
            </PButton>
          </template>
        </div>
      </div>

      <template v-if="overlayComponent">
        <div class="p-date-picker__overlay">
          <template v-if="overlay === 'time'">
            <component
              :is="overlayComponent"
              v-model="selectedDate"
              :min="min"
              :max="max"
            />
          </template>
          <template v-else>
            <component
              :is="overlayComponent"
              v-model="viewingDate"
              :min="min"
              :max="max"
              @update:model-value="closeOverlay"
            />
          </template>
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { format, startOfDay, isSameDay, isSameMonth, isSameMinute, addMonths, set, startOfMonth, endOfMonth } from 'date-fns'
  import { computed, ref, watchEffect } from 'vue'
  import PButton from '@/components/Button/PButton.vue'
  import PCalendar from '@/components/Calendar/PCalendar.vue'
  import PMonthPicker from '@/components/DatePicker/PMonthPicker.vue'
  import PTimePicker from '@/components/DatePicker/PTimePicker.vue'
  import PYearPicker from '@/components/DatePicker/PYearPicker.vue'
  import { keepDateInRange, isDateInRange, isDateBefore, isDateAfter } from '@/utilities/dates'

  type Overlay = 'year' | 'month' | 'time' | null

  const props = defineProps<{
    modelValue: Date | null | undefined,
    showTime?: boolean,
    clearable?: boolean,
    min?: Date | null | undefined,
    max?: Date | null | undefined,
  }>()

  const emits = defineEmits<{
    (event: 'update:modelValue', value: Date | null): void,
  }>()

  const range = computed(() => ({ min: props.min, max: props.max }))

  const selectedDate = computed({
    get() {
      return props.modelValue ?? null
    },
    set(value: Date | null) {
      emits('update:modelValue', keepDateInRange(value, range.value))
    },
  })

  const overlay = ref<Overlay>(null)
  const overlayComponent = computed(() => {
    switch (overlay.value) {
      case 'year':
        return PYearPicker
      case 'month':
        return PMonthPicker
      case 'time':
        return PTimePicker
      default:
        return null
    }
  })

  const viewingDate = ref(new Date())

  watchEffect(() => viewingDate.value = startOfDay(selectedDate.value ?? new Date()))

  const viewingMonth = computed(() => format(viewingDate.value, 'MMMM'))
  const viewingYear = computed(() => format(viewingDate.value, 'yyyy'))
  const time = computed(() => selectedDate.value ? format(selectedDate.value, 'h:mm a') : '')

  const todayDisabled = computed(() => {
    if (!selectedDate.value) {
      return false
    }

    return props.showTime ? isSameMinute(selectedDate.value, new Date()) : isSameDay(selectedDate.value, new Date())
  })

  const previousDisabled = computed(() => {
    const previousMonth = addMonths(viewingDate.value, -1)
    return !!range.value.min && isDateBefore(endOfMonth(previousMonth), range.value.min)
  })

  const nextDisabled = computed(() => {
    const nextMonth = addMonths(viewingDate.value, 1)
    return !!range.value.max && isDateAfter(startOfMonth(nextMonth), range.value.max)
  })

  const classes = computed(() => ({
    picker: {
      'p-date-picker__next-icon--overlay-open': !!overlay.value,
    },
    date: (date: Date) => ({
      'p-date-picker__date--today': isSameDay(date, new Date()),
      'p-date-picker__date--selected': isSameDayAsSelectedDate(date),
      'p-date-picker__date--out-of-month': !isSameMonth(date, viewingDate.value),
    }),
  }))

  function isSameDayAsSelectedDate(date: Date): boolean {
    return !!selectedDate.value && isSameDay(date, selectedDate.value)
  }

  function closeOverlay(): void {
    overlay.value = null
  }

  function updateSelectedDate(date: Date): void {
    selectedDate.value = set(selectedDate.value ?? startOfDay(new Date()), {
      year: date.getFullYear(),
      month: date.getMonth(),
      date: date.getDate(),
    })
  }

  function handleTodayClick(): void {
    selectedDate.value = props.showTime ? new Date() : startOfDay(new Date())
  }

  function setOverlay(value: Overlay): void {
    if (overlay.value === value) {
      closeOverlay()
    } else {
      overlay.value = value
    }
  }
</script>

<style>
.p-date-picker { @apply
  flex
  flex-col
  border
  p-2
  select-none
  min-w-[20rem]
  min-h-[20rem]
}

.p-date-picker__top-bar { @apply
  flex
  justify-between
  items-center
}

.p-date-picker__title { @apply
  flex
  gap-1.5
}

.p-date-picker__title-month { @apply
  font-bold
  text-lg
  py-0.5
  px-1
}

.p-date-picker__title-year { @apply
  text-lg
  py-0.5
  px-1
}

.p-date-picker__close-icon,
.p-date-picker__previous-icon,
.p-date-picker__next-icon { @apply
  p-1
}

.p-date-picker__next-icon--overlay-open .p-date-picker__next-icon,
.p-date-picker__next-icon--overlay-open .p-date-picker__bottom-bar { @apply
  invisible
}

.p-date-picker__body { @apply
  relative
  flex
  flex-col
  flex-grow
  my-2
}

.p-date-picker__overlay { @apply
  absolute
  left-0
  top-0
  right-0
  bottom-0
  flex
  justify-center
  bg-white/[.95]
}

.p-date-picker__date { @apply
  justify-center
  p-0
}

.p-date-picker__date--today:not(.p-date-picker__date--selected) { @apply
  text-prefect-600
}

.p-date-picker__date--out-of-month:not(.p-button--disabled) { @apply
  text-gray-300
  hover:text-gray-400
}

.p-date-picker__bottom-bar { @apply
  flex
  justify-between
}

.p-date-picker__actions:only-child {
  margin-left: auto;
}
</style>
