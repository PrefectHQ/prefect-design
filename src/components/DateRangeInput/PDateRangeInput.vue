<template>
  <PDateInput v-model="rangeValue" :clearable="clearable">
    <template #target="{ hover }">
      <template v-if="hover">
        <div class="p-date-range-input__target">
          {{ displayStartDate }}
          <p-icon icon="ArrowSmRightIcon" class="p-date-range-input__target-icon" />
          {{ displayEndDate }}
        </div>
      </template>
      <template v-else>
        <div class="p-date-range-input__target">
          <p-label label="Start">
            <template #default="{ id }">
              <PNativeDateInput :id="id" v-model="internalStartDate" :max="internalEndDate" />
            </template>
          </p-label>
          <p-label label="End">
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
        :class="getClasses(date, today, outOfMonth)"
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
  import { closestTo, format, isSameDay } from 'date-fns'
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

  const displayStartDate = computed(() => {
    if (internalStartDate.value) {
      return format(internalStartDate.value, 'MM/dd/yyyy')
    }

    return 'mm/dd/yyyy'
  })

  const internalEndDate = computed({
    get() {
      return props.endDate ?? null
    },
    set(value: Date | null) {
      emits('update:endDate', value)
    },
  })

  const displayEndDate = computed(() => {
    if (internalEndDate.value) {
      return format(internalEndDate.value, 'MM/dd/yyyy')
    }

    return 'mm/dd/yyyy'
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
      'p-date-range-input__date--today': today,
      'p-date-range-input__date--selected': isDateSelected(date),
      'p-date-range-input__date--in-range': isDateInSelectedRange(date),
      'p-date-range-input__date--out-of-month': outOfMonth,
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
.p-date-range-input__date { @apply
  p-1
}

.p-date-range-input__target { @apply
  flex
  gap-2
  items-center
}

.p-date-range-input__target-icon { @apply
  text-gray-400
}

.p-date-range-input__date--in-range:not(.p-date-range-input__date--selected) { @apply
  bg-prefect-600/70
  text-white
}

.p-date-range-input__date--in-range:not(.p-date-range-input__date--selected):hover { @apply
  bg-prefect-600/80
  text-white
}

.p-date-range-input__date--today:not(.p-date-range-input__date--selected):not(.p-date-range-input__date--in-range) { @apply
  text-prefect-600
}

.p-date-range-input__date--out-of-month:not(.p-button--disabled) { @apply
  text-gray-300
  hover:text-gray-400
}
</style>