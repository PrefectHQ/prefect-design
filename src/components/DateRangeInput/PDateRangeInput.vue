<template>
  <PDateInput v-model="rangeValue" v-model:viewingDate="internalViewingDate" :clearable="clearable">
    <template #default="{ openPicker, isOpen, disabled }">
      <template v-if="media.hover">
        <PDateButton
          :date="null"
          :class="classes.target(isOpen)"
          :disabled="disabled"
          @click="openPicker"
        >
          <div class="p-date-range-input__target">
            {{ displayValue }}
          </div>
        </PDateButton>
      </template>
      <template v-else>
        <div class="p-date-range-input__target">
          <p-label label="Start Date">
            <template #default="{ id }">
              <PNativeDateInput :id="id" v-model="internalStartDate" :max="internalEndDate" />
            </template>
          </p-label>
          <p-label label="End Date">
            <template #default="{ id }">
              <PNativeDateInput :id="id" v-model="internalEndDate" :min="internalStartDate" />
            </template>
          </p-label>
        </div>
      </template>
    </template>
    <template #date="{ date, disabled, today, outOfMonth, select }">
      <PButton
        class="p-date-range-input__date"
        :class="classes.date(date, today, outOfMonth)"
        :flat="!isDateSelected(date)"
        :disabled="disabled"
        size="xs"
        @click="select"
      >
        <slot
          name="date"
          :date="date"
          :is-selected="isDateSelected(date)"
          :is-in-selected-range="isDateInSelectedRange(date)"
        >
          {{ date.getDate() }}
        </slot>
      </PButton>
    </template>
  </PDateInput>
</template>

<script lang="ts" setup>
  import { format, isSameDay, startOfDay, endOfDay } from 'date-fns'
  import { computed } from 'vue'
  import PDateButton from '@/components/DateInput/PDateButton.vue'
  import PDateInput from '@/components/DateInput/PDateInput.vue'
  import { isDateBefore, isDateInRange } from '@/utilities'
  import { media } from '@/utilities/media'

  const props = defineProps<{
    startDate: Date | null | undefined,
    endDate: Date | null | undefined,
    viewingDate?: Date,
    clearable?: boolean,
  }>()

  const emit = defineEmits<{
    (event: 'update:startDate' | 'update:endDate', value: Date | null): void,
    (event: 'update:viewingDate', value: Date | undefined): void,
  }>()

  const dateFormat = 'MMM do, yyyy'

  const internalStartDate = computed({
    get() {
      return props.startDate ?? null
    },
    set(value) {
      emit('update:startDate', value)
    },
  })

  const internalEndDate = computed({
    get() {
      return props.endDate ?? null
    },
    set(value) {
      emit('update:endDate', value)
    },
  })

  const displayValue = computed(() => {
    if (internalStartDate.value && internalEndDate.value) {
      return `${format(internalStartDate.value, dateFormat)} - ${format(internalEndDate.value, dateFormat)}`
    }

    return 'Select dates'
  })

  const rangeValue = computed({
    get() {
      return internalEndDate.value ?? internalStartDate.value
    },
    set(value) {
      if (!value) {
        return clear()
      }

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
    },
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
    target: (isOpen: boolean) => ({ 'p-date-range-input__target--open': isOpen }),
    date: (date: Date, today: boolean, outOfMonth: boolean) => ({
      'p-date-range-input__date--today': today,
      'p-date-range-input__date--selected': isDateSelected(date),
      'p-date-range-input__date--in-range': isDateInSelectedRange(date),
      'p-date-range-input__date--out-of-month': outOfMonth,
    }),
  }))

  function isDateSelected(date: Date): boolean {
    return !!internalStartDate.value && isSameDay(date, internalStartDate.value)
      || !!internalEndDate.value && isSameDay(date, internalEndDate.value)
  }

  function isDateInSelectedRange(date: Date): boolean {
    if (!internalStartDate.value || !internalEndDate.value) {
      return false
    }

    return isDateInRange(date, { min: internalStartDate.value, max: internalEndDate.value })
  }

  function setStartDate(value: Date | null): void {
    internalStartDate.value = value ? startOfDay(value) : value
  }

  function setEndDate(value: Date | null): void {
    internalEndDate.value = value ? endOfDay(value) : value
  }

  function clear(): void {
    internalStartDate.value = null
    internalEndDate.value = null
  }
</script>

<style>
.p-date-range-input__date { @apply
  p-1
}

.p-date-range-input__target { @apply
  flex
  flex-wrap
  md:flex-nowrap
  gap-2
  items-center
}

.p-date-range-input__target--open { @apply
  outline-none
  ring-1
  ring-primary-500
  border-primary-500
}

.p-date-range-input__date--in-range:not(.p-date-range-input__date--selected) { @apply
  bg-primary-600/70
  text-white
}

.p-date-range-input__date--in-range:not(.p-date-range-input__date--selected):hover { @apply
  bg-primary-600/80
  text-white
}

.p-date-range-input__date--today:not(.p-date-range-input__date--selected):not(.p-date-range-input__date--in-range) { @apply
  text-primary-600
}

.p-date-range-input__date--out-of-month:not(.p-button--disabled) { @apply
  text-foreground-300
  hover:text-foreground-400
}
</style>