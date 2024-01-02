<template>
  <PSelectOptions v-model="selected" :options="options" class="p-date-range-select-options" />
</template>

<script lang="ts" setup>
  import { secondsInDay, secondsInHour, secondsInWeek } from 'date-fns'
  import { computed } from 'vue'
  import { DateRangeSelectMode } from '@/components/DateRangeSelect/PDateRangeSelect.vue'
  import PSelectOptions from '@/components/Select/PSelectOptions.vue'
  import { DateRangeSelectPeriod, DateRangeSelectPeriodValue, DateRangeSelectSpanValue, SelectOption, isDateRangeSelectPeriod } from '@/types'

  const props = defineProps<{
    mode: DateRangeSelectMode,
  }>()

  const emit = defineEmits<{
    'update:mode': [DateRangeSelectMode],
    'apply': [DateRangeSelectPeriodValue | DateRangeSelectSpanValue | null],
  }>()

  const selected = computed<DateRangeSelectMode | DateRangeSelectPeriod>({
    get() {
      return props.mode
    },
    set(selected) {
      if (isDateRangeSelectPeriod(selected)) {
        emit('apply', { type: 'period', period: selected })
        return
      }

      if (typeof selected === 'number') {
        emit('apply', { type: 'span', seconds: selected })
        return
      }

      emit('update:mode', selected)
    },
  })

  const options: (SelectOption & { value: DateRangeSelectMode | DateRangeSelectPeriod | number })[] = [
    { label: 'Past hour', value: secondsInHour * -1 },
    { label: 'Past day', value: secondsInDay * -1 },
    { label: 'Past week', value: secondsInWeek * -1 },
    { label: 'Today', value: 'Today' },
    { label: 'Relative time', value: 'span' },
    { label: 'Around a time', value: 'around' },
    { label: 'Date range', value: 'range' },
  ]
</script>

<style>
.p-date-range-select-options {
  min-width: 300px;
}

.p-date-range-select-options .p-select-option:nth-of-type(4) { @apply
  border-b
  border-b-divider
}
</style>