<template>
  <PDateInput v-model="rangeValue" :clearable="clearable">
    <template #target="{ hover }">
      <template v-if="hover">
        noice
      </template>
      <template v-else>
        todo: a native solution (on mobile)
      </template>
    </template>
    <template #date="{ date, disabled, today, outOfMonth, select }">
      <PButton
        class="p-date-range__date"
        :class="getClasses(date, today, outOfMonth)"
        :flat="!isDateSelected(date)"
        :disabled="disabled"
        size="xs"
        @click="select"
      >
        <slot name="date" :date="date">
          {{ date.getDate() }}
        </slot>
      </PButton>
    </template>
  </PDateInput>
</template>

<script lang="ts" setup>
  import { closestTo, isSameDay } from 'date-fns'
  import { computed } from 'vue'
  import PDateInput from '@/components/DateInput/PDateInput.vue'
  import { ClassValue } from '@/types/attributes'
  import { isDateAfter, isDateBefore, isDateInRange } from '@/utilities'

  const props = defineProps<{
    startDate: Date | null | undefined,
    endDate: Date | null | undefined,
    clearable?: boolean,
  }>()

  const emits = defineEmits<{
    (event: 'update:startDate' | 'update:endDate', value: Date | null): void,
  }>()

  const internalStartDate = computed({
    get() {
      return props.startDate ?? null
    },
    set(value: Date | null) {
      emits('update:startDate', value)
    },
  })

  const internalEndDate = computed({
    get() {
      return props.endDate ?? null
    },
    set(value: Date | null) {
      emits('update:endDate', value)
    },
  })

  const rangeValue = computed({
    get() {
      return internalEndDate.value ?? internalStartDate.value
    },
    set(value: Date | null) {
      if (!value) {
        return clear()
      }

      if (props.clearable && internalStartDate.value && isSameDay(value, internalStartDate.value)) {
        return internalStartDate.value = null
      }

      if (props.clearable && internalEndDate.value && isSameDay(value, internalEndDate.value)) {
        return internalEndDate.value = null
      }

      if (!internalStartDate.value) {
        if (isDateSelected(value)) {
          return
        }
        if (isDateAfterRange(value)) {
          internalStartDate.value = internalEndDate.value
          return internalEndDate.value = value
        }

        return internalStartDate.value = value
      }

      if (!internalEndDate.value) {
        if (isDateSelected(value)) {
          return
        }
        if (isDateBeforeRange(value)) {
          internalEndDate.value = internalStartDate.value
          return internalStartDate.value = value
        }

        return internalEndDate.value = value
      }

      if (isDateCloserToEnd(value)) {
        return internalEndDate.value = value
      }

      internalStartDate.value = value
    },
  })

  function getClasses(date: Date, today: boolean, outOfMonth: boolean): ClassValue {
    return {
      'p-date-range__date--today': today,
      'p-date-range__date--selected': isDateSelected(date),
      'p-date-range__date--in-range': isDateInSelectedRange(date),
      'p-date-range__date--out-of-month': outOfMonth,
    }
  }

  function isDateSelected(date: Date): boolean {
    return !!internalStartDate.value && isSameDay(date, internalStartDate.value)
      || !!internalEndDate.value && isSameDay(date, internalEndDate.value)
  }

  function isDateInSelectedRange(date: Date): boolean {
    if (!internalStartDate.value || !internalEndDate.value) {
      return false
    }

    return isDateInRange(date, { min:internalStartDate.value, max: internalEndDate.value })
  }

  function isDateBeforeRange(date: Date): boolean {
    if (!internalStartDate.value) {
      return false
    }

    return isDateBefore(date, internalStartDate.value)
  }

  function isDateAfterRange(date: Date): boolean {
    if (!internalEndDate.value) {
      return false
    }

    return isDateAfter(date, internalEndDate.value)
  }

  function isDateCloserToEnd(date: Date): boolean {
    if (!internalStartDate.value || !internalEndDate.value) {
      return false
    }

    const closestDate = closestTo(date, [ internalStartDate.value, internalEndDate.value])

    return !!closestDate && isSameDay(closestDate, internalEndDate.value)
  }

  function clear(): void {
    internalStartDate.value = null
    internalEndDate.value = null
  }
</script>

<style>
.p-date-range__date { @apply
  p-1
}

.p-date-range__date--in-range:not(.p-date-range__date--selected) { @apply
  bg-prefect-200
}

.p-date-range__date--in-range:not(.p-date-range__date--selected):hover { @apply
  bg-prefect-300
}

.p-date-range__date--today:not(.p-date-range__date--selected):not(.p-date-range__date--in-range) { @apply
  text-prefect-600
}

.p-date-range__date--out-of-month:not(.p-button--disabled) { @apply
  text-gray-300
  hover:text-gray-400
}
</style>