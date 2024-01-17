<template>
  <PDatePicker
    v-model:viewingDate="viewingDate"
    :model-value="startDate ?? endDate"
    v-bind="{ min, max }"
    class="p-date-range-picker"
    @update:model-value="update"
    @close="close"
  >
    <template #date="{ date, disabled: dateDisabled, today, inMonth }">
      <div class="p-date-range-picker__date-wrapper" :class="classes.dateWrapper(date)">
        <p-button
          class="p-date-range-picker__date"
          :class="classes.date(today, inMonth)"
          :disabled="dateDisabled"
          small
          flat
          @click="setDate(date)"
        >
          <slot
            name="date"
            :date="date"
            :is-selected="isSelectedDate(date)"
            :is-in-selected-range="isDateInSelectedRange(date)"
          >
            {{ date.getDate() }}
          </slot>
        </p-button>
      </div>
    </template>

    <template #controls>
      <PDateTimeInputGroup :model-value="selectedStartDate" :show-time="showTime" label="Start Date" @update:model-value="setStartDateAndTime" />
      <PDateTimeInputGroup :model-value="selectedEndDate" :show-time="showTime" label="End Date" @update:model-value="setEndDateAndTime" />
    </template>
  </PDatePicker>
</template>

<script lang="ts" setup>
  import { endOfDay, endOfMinute, isSameDay, startOfDay, startOfMinute } from 'date-fns'
  import { computed, ref } from 'vue'
  import PButton from '@/components/Button/PButton.vue'
  import PDatePicker from '@/components/DatePicker/PDatePicker.vue'
  import PDateTimeInputGroup from '@/components/DateTimeInputGroup/PDateTimeInputGroup.vue'
  import { isDateBefore, isDateInRange } from '@/utilities/dates'

  const props = defineProps<{
    startDate: Date | null | undefined,
    endDate: Date | null | undefined,
    viewingDate?: Date | null | undefined,
    showTime?: boolean,
    min?: Date | null | undefined,
    max?: Date | null | undefined,
  }>()

  const emit = defineEmits<{
    'update:startDate': [value: Date | null | undefined],
    'update:endDate': [value: Date | null | undefined],
    'update:viewingDate': [value: Date | null | undefined],
    'apply': [],
    'close': [],
  }>()

  const selectedStartDate = ref(props.startDate)
  const selectedEndDate = ref(props.endDate)

  const viewingDate = computed({
    get() {
      return props.viewingDate ?? null
    },
    set(value) {
      emit('update:viewingDate', value)
    },
  })

  const classes = computed(() => ({
    dateWrapper: (date: Date) => ({
      'p-date-range-picker__date-wrapper--selected': isSelectedDate(date),
      'p-date-range-picker__date-wrapper--selected-start': isSelectedStartDate(date),
      'p-date-range-picker__date-wrapper--selected-end': isSelectedEndDate(date),
      'p-date-range-picker__date-wrapper--in-range': isDateInSelectedRange(date),
    }),
    date: (today: boolean, inMonth: boolean) => ({
      'p-date-range-picker__date--today': today,
      'p-date-range-picker__date--out-of-month': !inMonth,
    }),
  }))

  function isSelectedDate(date: Date): boolean {
    return isSelectedStartDate(date) || isSelectedEndDate(date)
  }

  function isSelectedStartDate(date: Date): boolean {
    return !!selectedStartDate.value && isSameDay(date, selectedStartDate.value)
  }

  function isSelectedEndDate(date: Date): boolean {
    return !!selectedEndDate.value && isSameDay(date, selectedEndDate.value)
  }

  function isDateInSelectedRange(date: Date): boolean {
    if (!selectedStartDate.value || !selectedEndDate.value) {
      return false
    }

    return isDateInRange(date, { min: selectedStartDate.value, max: selectedEndDate.value }, 'day')
  }

  function setDate(value: Date): void {
    if (selectedStartDate.value && isDateBefore(value, selectedStartDate.value)) {
      setEndDate(selectedEndDate.value ? null : selectedStartDate.value)
      setStartDate(value)

      return
    }

    if (!selectedStartDate.value) {
      return setStartDate(value)
    }

    if (!selectedEndDate.value) {
      return setEndDate(value)
    }

    setStartDate(value)
    setEndDate(null)
  }

  function setStartDate(value: Date | null): void {
    selectedStartDate.value = value ? startOfDay(value) : value
  }

  function setEndDate(value: Date | null): void {
    selectedEndDate.value = value ? endOfDay(value) : value
  }

  function setStartDateAndTime(value: Date | null): void {
    selectedStartDate.value = value ? startOfMinute(value) : value
  }

  function setEndDateAndTime(value: Date | null): void {
    selectedEndDate.value = value ? endOfMinute(value) : value
  }

  function update(): void {
    emit('update:startDate', selectedStartDate.value)
    emit('update:endDate', selectedEndDate.value)
    emit('apply')
    close()
  }

  function close(): void {
    emit('close')
  }
</script>

<style>
.p-date-range-picker__date-wrapper { @apply
  grid
  grid-cols-1
  p-0
  aspect-square
}

.p-date-range-picker__date { @apply
  justify-center
  p-0
}

.p-date-range-picker__date--today,
.p-date-range-picker__date--today:not(:disabled):hover,
.p-date-range-picker__date--today:not(:disabled):active { @apply
  border-[1px]
  border-live
}

.p-date-range-picker__date-wrapper--selected { @apply
  bg-[var(--p-color-input-checked-bg)]
}

.p-date-range-picker__date-wrapper--selected-start { @apply
  rounded-l-default
}

.p-date-range-picker__date-wrapper--selected-start::before { @apply
  !hidden
}

.p-date-range-picker__date-wrapper--selected-end::after { @apply
  !hidden
}

.p-date-range-picker__date-wrapper--selected-end { @apply
  rounded-r-default
}

.p-date-range-picker__date-wrapper--in-range { @apply
  relative
}

.p-date-range-picker__date-wrapper--in-range:not(.p-date-range-picker__date-wrapper--selected) { @apply
  bg-selected
}

.p-date-range-picker__date-wrapper--in-range::before,
.p-date-range-picker__date-wrapper--in-range::after { @apply
  absolute
  content-['']
  block
  bg-selected
  top-0
  bottom-0
  w-1.5
}

.p-date-range-picker__date-wrapper--in-range::before { @apply
  right-full
}

.p-date-range-picker__date-wrapper--in-range::after { @apply
  left-full
}

.p-date-range-picker__date:not(:disabled):hover { @apply
  bg-selectable-hover
}

.p-date-range-picker__date--out-of-month:not(:disabled) { @apply
  text-subdued
}
</style>
