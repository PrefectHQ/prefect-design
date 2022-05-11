<template>
  <div class="p-date-picker">
    <div class="p-date-picker__top-bar">
      <p-button
        class="p-date-picker__close-icon"
        :class="classes.close"
        size="sm"
        flat
        icon="XIcon"
        @click="closeOverlay"
      />
      <p-button
        class="p-date-picker__previous-icon"
        :class="classes.previous"
        size="sm"
        flat
        icon="ChevronLeftIcon"
        @click="handlePreviousClick"
      />
      <div class="p-date-picker__title">
        <p-button class="p-date-picker__title-month" flat @click="setMode('month')">
          {{ viewingMonth }}
        </p-button>
        <p-button class="p-date-picker__title-year" flat @click="setMode('year')">
          {{ viewingYear }}
        </p-button>
      </div>
      <p-button
        class="p-date-picker__next-icon"
        :class="classes.next"
        size="sm"
        flat
        icon="ChevronRightIcon"
        @click="handleNextClick"
      />
    </div>

    <div class="p-date-picker__body">
      <p-calendar :month="viewingDate.getMonth()" :year="viewingDate.getFullYear()">
        <template #date="{ date }">
          <p-button
            class="p-date-picker__date"
            :class="classes.date(date)"
            :flat="!isSameDay(date, selectedDate)"
            size="xs"
            :disabled="!!mode"
            @click="handleDateClick(date)"
          >
            {{ date.getDate() }}
          </p-button>
        </template>
      </p-calendar>

      <template v-if="modePickerComponent">
        <div class="p-date-picker__overlay">
          <component :is="modePickerComponent" v-model="selectedDate" @update:model-value="mode = null" />
        </div>
      </template>

      <div class="p-date-picker__bottom-bar" :class="classes.bottom">
        <template v-if="showTime">
          <p-button class="p-date-picker__time-button" size="sm" flat @click="setMode('time')">
            {{ time }}
          </p-button>
        </template>
        <p-button
          class="p-date-picker__today-button"
          size="sm"
          flat
          :disabled="todayDisabled"
          @click="handleTodayClick"
        >
          {{ showTime ? 'Now' : 'Today' }}
        </p-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { format, startOfDay, isSameDay, isSameMonth, isSameMinute } from 'date-fns'
  import { computed, ref, watch } from 'vue'
  import PButton from '@/components/Button'
  import PCalendar from '@/components/Calendar'
  import PMonthPicker from '@/components/DatePicker/PMonthPicker.vue'
  import PTimePicker from '@/components/DatePicker/PTimePicker.vue'
  import PYearPicker from '@/components/DatePicker/PYearPicker.vue'

  type Mode = 'year' | 'month' | 'time' | null

  const props = defineProps<{
    modelValue: Date | null | undefined,
    showTime?: boolean,
  }>()

  const emits = defineEmits<{
    (event: 'update:modelValue', value: Date | null): void,
  }>()

  const selectedDate = computed({
    get() {
      return props.modelValue ?? new Date(startOfDay(new Date()))
    },
    set(value: Date) {
      emits('update:modelValue', value)
    },
  })

  const mode = ref<Mode>(null)

  const modePickerComponent = computed(() => {
    switch (mode.value) {
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

  const viewingDate = ref(startOfDay(selectedDate.value))

  watch(selectedDate, (value) => viewingDate.value = startOfDay(value))

  const viewingMonth = computed(() => format(viewingDate.value, 'MMMM'))
  const viewingYear = computed(() => format(viewingDate.value, 'yyyy'))
  const time = computed(() => format(selectedDate.value, 'h:mm a'))

  const todayDisabled = computed(() => props.showTime ? isSameMinute(selectedDate.value, new Date()) : isSameDay(selectedDate.value, new Date()))

  const classes = computed(() => ({
    date: (date: Date) => ({
      'p-date-picker__date--today': isSameDay(date, new Date()),
      'p-date-picker__date--selected': isSameDay(date, selectedDate.value),
      'p-date-picker__date--out-of-month': !isSameMonth(date, viewingDate.value),
    }),
    close: {
      'p-date-picker__close-icon--hidden': !mode.value,
    },
    previous: {
      'p-date-picker__previous-icon--hidden': !!mode.value,
    },
    next: {
      'p-date-picker__next-icon--hidden': !!mode.value,
    },
    bottom: {
      'p-date-picker__bottom-bar--hidden': !!mode.value,
    },
  }))

  function handlePreviousClick(): void {
    const value = new Date(viewingDate.value)

    value.setMonth(value.getMonth() - 1)

    viewingDate.value = value
  }

  function handleNextClick(): void {
    const value = new Date(viewingDate.value)

    value.setMonth(value.getMonth() + 1)

    viewingDate.value = value
  }

  function closeOverlay(): void {
    mode.value = null
  }

  function handleDateClick(date: Date): void {
    const value = new Date(selectedDate.value)

    value.setFullYear(date.getFullYear())
    value.setMonth(date.getMonth())
    value.setDate(date.getDate())

    selectedDate.value = value
  }

  function handleTodayClick(): void {
    selectedDate.value = props.showTime ? new Date() : startOfDay(new Date())
  }

  function setMode(value: Mode): void {
    if (mode.value === value) {
      closeOverlay()
    } else {
      mode.value = value
    }
  }
</script>

<style>
.p-date-picker { @apply
  border
  p-2
  select-none
  w-80
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
  text-prefect-600
  text-lg
  py-0.5
  px-1
}

.p-date-picker__close-icon,
.p-date-picker__previous-icon,
.p-date-picker__next-icon { @apply
  p-1
}

.p-date-picker__previous-icon--hidden,
.p-date-picker__close-icon--hidden { @apply
  hidden
}

.p-date-picker__next-icon--hidden { @apply
  invisible
}

.p-date-picker__body { @apply
  relative
  my-2
}

.p-date-picker__overlay { @apply
  absolute
  top-0
  bottom-0
  w-full
  flex
  justify-center
  items-center
  bg-white/[.95]
  px-4
  py-3
  overflow-y-auto
}

.p-date-picker__date { @apply
  justify-center
  px-0
}

.p-date-picker__date--today:not(.p-date-picker__date--selected) { @apply
  text-prefect-600
}

.p-date-picker__date--out-of-month { @apply
  text-gray-300
  hover:text-gray-400
}

.p-date-picker__bottom-bar { @apply
  flex
  justify-between
}

.p-date-picker__bottom-bar--hidden { @apply
  invisible
}

.p-date-picker__today-button:only-child {
  margin-left: auto;
}
</style>
