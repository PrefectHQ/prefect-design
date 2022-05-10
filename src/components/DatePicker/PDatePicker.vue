<template>
  <div class="p-date-picker">
    <div class="p-date-picker__top-bar">
      <p-icon class="p-date-picker__icon" :class="classes.icon" icon="ChevronLeftIcon" @click="handlePreviousClick" />
      <div class="p-date-picker__title">
        <span class="p-date-picker__title-month" @click="handleMonthClick">
          {{ monthNames[viewingDate.getUTCMonth()] }}
        </span>
        <span class="p-date-picker__title-year" @click="handleYearClick">
          {{ viewingDate.getUTCFullYear() }}
        </span>
      </div>
      <p-icon class="p-date-picker__icon" :class="classes.icon" icon="ChevronRightIcon" @click="handleNextClick" />
    </div>
    <div class="p-date-picker__body">
      <p-calendar :month="viewingDate.getUTCMonth()" :year="viewingDate.getUTCFullYear()">
        <template #date="{ date }">
          <div class="p-date-picker__date" :class="classes.date(date)" @click="selectedDate = date">
            {{ date.getUTCDate() }}
          </div>
        </template>
      </p-calendar>
      <template v-if="modePickerComponent">
        <div class="p-date-picker__overlay">
          <component :is="modePickerComponent" v-model="selectedDate" @update:model-value="mode = null" />
        </div>
      </template>
    </div>
    <div class="p-date-picker__bottom-bar" />
  </div>
</template>

<script lang="ts" setup>
  import { computed, ref, watch } from 'vue'
  import PCalendar from '@/components/DatePicker/PCalendar.vue'
  import PMonthPicker from '@/components/DatePicker/PMonthPicker.vue'
  import PTimePicker from '@/components/DatePicker/PTimePicker.vue'
  import PYearPicker from '@/components/DatePicker/PYearPicker.vue'
  import PIcon from '@/components/Icon'
  import { getStartOfDay, monthNames } from '@/types/date'

  type Mode = 'year' | 'month' | 'time' | null

  const props = defineProps<{
    modelValue: Date | null | undefined,
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

  const classes = computed(() => ({
    date: (date: Date) => ({
      'p-date-picker__date--today': isToday(date),
      'p-date-picker__date--selected': isSelected(date),
      'p-date-picker__date--out-of-month': !isInViewingMonth(date),
    }),
    icon: {
      'p-date-picker__icon--hidden': !!mode.value,
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

  function handleMonthClick(): void {
    if (mode.value === 'month') {
      mode.value = null
    } else {
      mode.value = 'month'
    }
  }

  function handleYearClick(): void {
    if (mode.value === 'year') {
      mode.value = null
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
  capitalize
  flex
  justify-between
  items-center
}

.p-date-picker__title { @apply
  flex
  gap-1
}

.p-date-picker__title-month { @apply
  font-bold
  cursor-pointer
}

.p-date-picker__title-year { @apply
  text-prefect-600
  cursor-pointer
}

.p-date-picker__icon { @apply
  h-4
  w-4
  cursor-pointer
  text-gray-500
  hover:text-black
}

.p-date-picker__icon--hidden { @apply
  invisible
}

.p-date-picker__body { @apply
  relative
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
  text-center
  hover:bg-gray-100
  cursor-pointer
  rounded
}

.p-date-picker__date--today { @apply
  text-prefect-600
}

.p-date-picker__date--selected { @apply
  text-white
  bg-prefect-600
  hover:bg-prefect-800
}

.p-date-picker__date--out-of-month { @apply
  text-gray-300
}
</style>
