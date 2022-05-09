<template>
  <div class="p-date-picker">
    <div class="p-date-picker__top-bar" />
    <div class="p-date-picker__calendar">
      <p-calendar />
    </div>
    <div class="p-date-picker__bottom-bar" />
  </div>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import PCalendar from '@/components/DatePicker/PCalendar.vue'
  import PMonthPicker from '@/components/DatePicker/PMonthPicker.vue'
  import PTimePicker from '@/components/DatePicker/PTimePicker.vue'
  import PYearPicker from '@/components/DatePicker/PYearPicker.vue'
  import { useAdjustedDate, useBrowserDate, utcOffsetMinutes } from '@/compositions/UseAdjustedDates'

  // dates from server are correct UTC
  // build custom version as simple as possible
  // entered date gets translated to UTC by applying offset
  // displaying date gets translated to component time by applying negative offset
  // technically the component.value toString would be UTC to browser time, but that's ok

  const props = defineProps<{
    modelValue: Date | null | undefined,
    min?: Date,
    max?: Date,
  }>()

  const emits = defineEmits<{
    (event: 'update:modelValue', value: Date | null): void,
  }>()

  const adjustedValue = computed({
    get() {
      return props.modelValue ? useAdjustedDate(props.modelValue) : null
    },
    set(value: Date | null) {
      emits('update:modelValue', value ? useBrowserDate(value) : null)
    },
  })

  const adjustedMin = computed(() => props.min ? useAdjustedDate(props.min) : undefined)
  const adjustedMax = computed(() => props.max ? useAdjustedDate(props.max) : undefined)
</script>

<style>
.p-date-picker { @apply
  border
  w-80
}
</style>
