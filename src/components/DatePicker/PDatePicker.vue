<template>
  <div class="p-date-picker">
    <div class="p-date-picker__top-bar">
      <p-button class="p-date-picker__close-icon" :class="classes.close" size="xs" inset @click="closeOverlay">
        <p-icon icon="XIcon" />
      </p-button>
      <p-button class="p-date-picker__previous-icon" :class="classes.previous" size="xs" inset @click="handlePreviousClick">
        <p-icon icon="ChevronLeftIcon" />
      </p-button>
      <div class="p-date-picker__title">
        <p-button class="p-date-picker__title-month" inset size="sm" @click="handleMonthClick">
          {{ monthNames[viewingDate.getUTCMonth()] }}
        </p-button>
        <p-button class="p-date-picker__title-year" inset size="sm" @click="handleYearClick">
          {{ viewingDate.getUTCFullYear() }}
        </p-button>
      </div>
      <p-button class="p-date-picker__next-icon" :class="classes.next" size="xs" inset @click="handleNextClick">
        <p-icon icon="ChevronRightIcon" />
      </p-button>
    </div>

    <div class="p-date-picker__body">
      <p-calendar :month="viewingDate.getUTCMonth()" :year="viewingDate.getUTCFullYear()">
        <template #date="{ date }">
          <p-button
            class="p-date-picker__date"
            :class="classes.date(date)"
            :inset="!isSelected(date)"
            size="xs"
            @click="selectedDate = date"
          >
            {{ date.getUTCDate() }}
          </p-button>
        </template>
      </p-calendar>
      <template v-if="modePickerComponent">
        <div class="p-date-picker__overlay">
          <component :is="modePickerComponent" v-model="selectedDate" @update:model-value="mode = null" />
        </div>
      </template>
    </div>

    <div class="p-date-picker__bottom-bar">
      <p-button size="xs" inset @click="handleTimeClick">
        {{ time }}
      </p-button>
      <p-button size="xs" inset @click="handleTodayClick">
        Today
      </p-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { format } from 'date-fns'
  import { computed, ref, watch } from 'vue'
  import PButton from '@/components/Button/PButton.vue'
  import PCalendar from '@/components/DatePicker/PCalendar.vue'
  import PMonthPicker from '@/components/DatePicker/PMonthPicker.vue'
  import PTimePicker from '@/components/DatePicker/PTimePicker.vue'
  import PYearPicker from '@/components/DatePicker/PYearPicker.vue'
  import PIcon from '@/components/Icon'
  import { getStartOfDay, monthNames } from '@/types/date'

  type Mode = 'year' | 'month' | 'time' | null

  const props = defineProps<{
    modelValue: Date | null | undefined,
    showTime?: boolean,
  }>()

  const emits = defineEmits<{
    (event: 'update:modelValue', value: Date | null): void,
  }>()

  const today = getStartOfDay()

  const selectedDate = computed({
    get() {
      return props.modelValue ?? new Date(today)
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

  const viewingDate = ref(getStartOfDay(selectedDate.value))

  watch(selectedDate, (value) => viewingDate.value = getStartOfDay(value))

  const time = computed(() => {
    return format(selectedDate.value, 'h:mm a')
  })

  const classes = computed(() => ({
    date: (date: Date) => ({
      'p-date-picker__date--today': isToday(date),
      'p-date-picker__date--selected': isSelected(date),
      'p-date-picker__date--out-of-month': !isInViewingMonth(date),
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
  }))

  function handlePreviousClick(): void {
    const value = new Date(viewingDate.value)

    value.setUTCMonth(value.getUTCMonth() - 1)

    viewingDate.value = value
  }

  function handleNextClick(): void {
    const value = new Date(viewingDate.value)

    value.setUTCMonth(value.getUTCMonth() + 1)

    viewingDate.value = value
  }

  function handleTodayClick(): void {
    selectedDate.value = today
    closeOverlay()
  }

  function closeOverlay(): void {
    mode.value = null
  }

  function handleTimeClick(): void {
    if (mode.value === 'time') {
      closeOverlay()
    } else {
      mode.value = 'time'
    }
  }

  function handleMonthClick(): void {
    if (mode.value === 'month') {
      closeOverlay()
    } else {
      mode.value = 'month'
    }
  }

  function handleYearClick(): void {
    if (mode.value === 'year') {
      closeOverlay()
    } else {
      mode.value = 'year'
    }
  }

  function isToday(date: Date): boolean {
    return date.getTime() === today.getTime()
  }

  function isSelected(date: Date): boolean {
    return date.getTime() === selectedDate.value.getTime()
  }

  function isInViewingMonth(date: Date): boolean {
    return date.getUTCMonth() === viewingDate.value.getUTCMonth() && date.getUTCFullYear() === viewingDate.value.getUTCFullYear()
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
  capitalize
}

.p-date-picker__title-year { @apply
  text-prefect-600
}

.p-date-picker__close-icon,
.p-date-picker__previous-icon,
.p-date-picker__next-icon { @apply
  p-1
}

.p-date-picker__close-icon svg,
.p-date-picker__previous-icon svg,
.p-date-picker__next-icon svg { @apply
  h-4
  w-4
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
</style>
