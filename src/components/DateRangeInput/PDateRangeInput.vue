<template>
  <PDateInput v-model="dummy" v-model:viewingDate="internalViewingDate" v-bind="{ showTime, min, max, clearable, disabled }" @update:model-value="update">
    <template #default="{ openPicker, isOpen, disabled: buttonDisabled }">
      <PDateButton
        :date="null"
        class="p-date-range-input__trigger"
        :class="classes.trigger(isOpen)"
        :disabled="buttonDisabled"
        @click="openPicker"
      >
        <div class="p-date-range-input__target">
          {{ displayValue }}
        </div>
      </PDateButton>
    </template>

    <template #date="{ date, disabled: dateDisabled, today, inMonth }">
      <div class="p-date-range-input__date-wrapper" :class="classes.dateWrapper(date)">
        <p-button
          class="p-date-range-input__date"
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
      <PContent>
        <PDateTimeInputGroup v-model="internalStartDate" show-time label="Start Date" />
        <PDateTimeInputGroup v-model="internalEndDate" show-time label="End Date" />
      </PContent>
    </template>
  </PDateInput>
</template>

<script lang="ts" setup>
  import { format, isSameDay, startOfDay, endOfDay } from 'date-fns'
  import { computed, ref } from 'vue'
  import PContent from '@/components/Content/PContent.vue'
  import PDateButton from '@/components/DateInput/PDateButton.vue'
  import PDateInput from '@/components/DateInput/PDateInput.vue'
  import PDateTimeInputGroup from '@/components/DateTimeInputGroup/PDateTimeInputGroup.vue'
  import { isDateBefore, isDateInRange } from '@/utilities'

  const props = defineProps<{
    startDate: Date | null | undefined,
    endDate: Date | null | undefined,
    viewingDate?: Date,
    showTime?: boolean,
    clearable?: boolean,
    disabled?: boolean,
    min?: Date | null | undefined,
    max?: Date | null | undefined,
  }>()

  const emit = defineEmits<{
    (event: 'update:startDate' | 'update:endDate', value: Date | null | undefined): void,
    (event: 'update:viewingDate', value: Date | undefined): void,
  }>()

  // this dummy ref is bound to PDatInput's v-model but isn't directly used for anything
  // this component tracks its own dates
  const dummy = ref()

  const dateFormat = 'MMM do, yyyy'
  const internalStartDate = ref(props.startDate)
  const internalEndDate = ref(props.endDate)

  const displayValue = computed(() => {
    if (props.startDate && props.endDate) {
      return `${format(props.startDate, dateFormat)} - ${format(props.endDate, dateFormat)}`
    }

    return 'Select dates'
  })

  const internalViewingDate = computed({
    get() {
      return props.viewingDate
    },
    set(value) {
      emit('update:viewingDate', value)
    },
  })

  const classes = computed(() => ({
    trigger: (isOpen: boolean) => ({
      'p-date-range-input__trigger--open': isOpen,
    }),
    dateWrapper: (date: Date) => ({
      'p-date-range-input__date-wrapper--selected': isSelectedDate(date),
      'p-date-range-input__date-wrapper--selected-start': isSelectedStartDate(date),
      'p-date-range-input__date-wrapper--selected-end': isSelectedEndDate(date),
      'p-date-range-input__date-wrapper--in-range': isDateInSelectedRange(date),
    }),
    date: (today: boolean, inMonth: boolean) => ({
      'p-date-range-input__date--today': today,
      'p-date-range-input__date--out-of-month': !inMonth,
    }),
  }))

  function isSelectedDate(date: Date): boolean {
    return isSelectedStartDate(date) || isSelectedEndDate(date)
  }

  function isSelectedStartDate(date: Date): boolean {
    return !!internalStartDate.value && isSameDay(date, internalStartDate.value)
  }

  function isSelectedEndDate(date: Date): boolean {
    return !!internalEndDate.value && isSameDay(date, internalEndDate.value)
  }

  function isDateInSelectedRange(date: Date): boolean {
    if (!internalStartDate.value || !internalEndDate.value) {
      return false
    }

    return isDateInRange(date, { min: internalStartDate.value, max: internalEndDate.value }, 'day')
  }

  function setDate(value: Date): void {
    if (internalStartDate.value && isDateBefore(value, internalStartDate.value)) {
      setEndDate(internalEndDate.value ? null : internalStartDate.value)
      setStartDate(value)

      return
    }

    if (!internalStartDate.value) {
      return setStartDate(value)
    }

    if (!internalEndDate.value) {
      return setEndDate(value)
    }

    setStartDate(value)
    setEndDate(null)
  }

  function setStartDate(value: Date | null): void {
    internalStartDate.value = value ? startOfDay(value) : value
  }

  function setEndDate(value: Date | null): void {
    internalEndDate.value = value ? endOfDay(value) : value
  }

  function update(): void {
    emit('update:startDate', internalStartDate.value)
    emit('update:endDate', internalEndDate.value)
  }
</script>

<style>
.p-date-range-input__date-wrapper { @apply
  grid
  grid-cols-1
  p-0
  aspect-square
}

.p-date-range-input__date { @apply
  justify-center
  p-0
}

.p-date-range-input__date--today,
.p-date-range-input__date--today:not(:disabled):hover,
.p-date-range-input__date--today:not(:disabled):active { @apply
  border-[1px]
  border-live
}

.p-date-range-input__date-wrapper--selected { @apply
  bg-[var(--p-color-input-checked-bg)]
}

.p-date-range-input__date-wrapper--selected-start { @apply
  rounded-l-sm
}

.p-date-range-input__date-wrapper--selected-start::before { @apply
  !hidden
}

.p-date-range-input__date-wrapper--selected-end::after { @apply
  !hidden
}

.p-date-range-input__date-wrapper--selected-end { @apply
  rounded-r-sm
}

.p-date-range-input__date-wrapper--in-range { @apply
  relative
}

.p-date-range-input__date-wrapper--in-range:not(.p-date-range-input__date-wrapper--selected) { @apply
  bg-selected
}

.p-date-range-input__date-wrapper--in-range::before,
.p-date-range-input__date-wrapper--in-range::after { @apply
  absolute
  content-['']
  block
  bg-selected
  top-0
  bottom-0
  w-1.5
}

.p-date-range-input__date-wrapper--in-range::before { @apply
  right-full
}

.p-date-range-input__date-wrapper--in-range::after { @apply
  left-full
}

.p-date-range-input__date:not(:disabled):hover { @apply
  bg-selectable-hover
}

.p-date-range-input__date--out-of-month:not(:disabled) { @apply
  text-subdued
}

.p-date-range-input__trigger--open { @apply
  ring-spacing-focus-ring
  ring-focus-ring
  ring-offset-focus-ring
  ring-offset-focus-ring-offset;
  background-color: var(--p-color-input-bg-focus);
  border-color: var(--p-color-input-border-focus);
}
</style>