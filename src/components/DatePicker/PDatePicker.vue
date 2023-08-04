<template>
  <div class="p-date-picker" :class="classes.picker">
    <div class="p-date-picker__top-bar">
      <template v-if="overlay">
        <p-button
          class="p-date-picker__close-icon"
          flat
          icon="XMarkIcon"
          small
          @click="closeOverlay"
        />
      </template>
      <template v-else>
        <p-button
          class="p-date-picker__previous-icon"
          flat
          icon="ChevronLeftIcon"
          small
          :disabled="previousDisabled"
          @click="internalViewingDate = addMonths(internalViewingDate, -1)"
        />
      </template>
      <div class="p-date-picker__title">
        <p-button class="p-date-picker__title-month" flat @click="setOverlay('month')">
          {{ viewingMonth }}
        </p-button>
        <p-button class="p-date-picker__title-year" flat @click="setOverlay('year')">
          {{ viewingYear }}
        </p-button>
      </div>
      <p-button
        class="p-date-picker__next-icon"
        flat
        icon="ChevronRightIcon"
        small
        :disabled="nextDisabled"
        @click="internalViewingDate = addMonths(internalViewingDate, 1)"
      />
    </div>

    <div class="p-date-picker__body">
      <PCalendar :month="internalViewingDate.getMonth()" :year="internalViewingDate.getFullYear()">
        <template #date="{ date }">
          <slot
            name="date"
            :date="date"
            :disabled="!!overlay || !isDateInRange(date, range, 'day')"
            :today="isToday(date)"
            :selected="isSameDayAsSelectedDate(date)"
            :out-of-month="!isSameMonth(date, internalViewingDate)"
            :select="() => updateSelectedDate(date)"
          >
            <p-button
              class="p-date-picker__date"
              :class="classes.date(date)"
              flat
              :selected="isSameDayAsSelectedDate(date)"
              :disabled="!!overlay || !isDateInRange(date, range, 'day')"
              small
              @click="updateSelectedDate(date)"
            >
              {{ date.getDate() }}
            </p-button>
          </slot>
        </template>
      </PCalendar>

      <div class="p-date-picker__bottom-bar">
        <template v-if="showTime && selectedDate">
          <p-button class="p-date-picker__time-button" small flat @click="setOverlay('time')">
            {{ time }}
          </p-button>
        </template>
        <div class="p-date-picker__actions">
          <template v-if="isDateInRange(new Date(), range, 'day')">
            <p-button class="p-date-picker__today-button" small flat :disabled="todayDisabled" @click="handleTodayClick">
              {{ showTime ? 'Now' : 'Today' }}
            </p-button>
          </template>
          <template v-if="clearable">
            <p-button class="p-date-picker__clear-button" small flat :disabled="selectedDate === null" @click="selectedDate = null">
              Clear
            </p-button>
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
              v-model="internalViewingDate"
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
  import { format, startOfDay, isSameDay, isSameMonth, isSameMinute, addMonths, set, startOfMonth, endOfMonth, isToday } from 'date-fns'
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
    viewingDate?: Date,
    showTime?: boolean,
    clearable?: boolean,
    min?: Date | null | undefined,
    max?: Date | null | undefined,
  }>()

  const emit = defineEmits<{
    (event: 'update:modelValue', value: Date | null): void,
    (event: 'update:viewingDate', value: Date): void,
  }>()

  const range = computed(() => ({ min: props.min, max: props.max }))

  const selectedDate = computed({
    get() {
      return props.modelValue ?? null
    },
    set(value) {
      emit('update:modelValue', keepDateInRange(value, range.value))
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

  const fallbackViewingDate = ref(new Date())
  const internalViewingDate = computed({
    get() {
      return props.viewingDate ?? fallbackViewingDate.value
    },
    set(value) {
      emit('update:viewingDate', value)
      fallbackViewingDate.value = value
    },
  })

  watchEffect(() => internalViewingDate.value = startOfDay(selectedDate.value ?? new Date()))

  const viewingMonth = computed(() => format(internalViewingDate.value, 'MMMM'))
  const viewingYear = computed(() => format(internalViewingDate.value, 'yyyy'))
  const time = computed(() => selectedDate.value ? format(selectedDate.value, 'h:mm a') : '')

  const todayDisabled = computed(() => {
    if (!selectedDate.value) {
      return false
    }

    return props.showTime ? isSameMinute(selectedDate.value, new Date()) : isSameDay(selectedDate.value, new Date())
  })

  const previousDisabled = computed(() => {
    const previousMonth = addMonths(internalViewingDate.value, -1)
    return !!range.value.min && isDateBefore(endOfMonth(previousMonth), range.value.min)
  })

  const nextDisabled = computed(() => {
    const nextMonth = addMonths(internalViewingDate.value, 1)
    return !!range.value.max && isDateAfter(startOfMonth(nextMonth), range.value.max)
  })

  const classes = computed(() => ({
    picker: {
      'p-date-picker__next-icon--overlay-open': !!overlay.value,
    },
    date: (date: Date) => ({
      'p-date-picker__date--today': isSameDay(date, new Date()),
      'p-date-picker__date--selected': isSameDayAsSelectedDate(date),
      'p-date-picker__date--out-of-month': !isSameMonth(date, internalViewingDate.value),
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
  bg-floating
}

.p-date-picker__date { @apply
  justify-center
  p-0
}

.p-date-picker__date--today,
.p-date-picker__date--today:not(:disabled):hover,
.p-date-picker__date--today:not(:disabled):active { @apply
  border-2
  border-live
}

.p-date-picker__date--out-of-month:not(:disabled) { @apply
  text-subdued
}

.p-date-picker__bottom-bar { @apply
  flex
  justify-between
}

.p-date-picker__actions:only-child {
  margin-left: auto;
}
</style>
