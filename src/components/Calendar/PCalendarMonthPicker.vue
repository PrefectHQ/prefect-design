<template>
  <div class="p-calendar-month-picker">
    <template v-for="(option) in monthOptions" :key="option.value">
      <div class="p-calendar-month-picker__month">
        <p-button
          small
          class="p-calendar-month-picker__month-button"
          :class="getSelectedClass(option.value)"
          :disabled="isDisabled(option.value)"
          @click="updateSelectedDate(option.value)"
        >
          <span ref="monthElements" :data-month="option.value">
            {{ option.label }}
          </span>
        </p-button>
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
  import { format, eachMonthOfInterval, startOfYear, endOfYear, setMonth, startOfMonth, endOfMonth } from 'date-fns'
  import { computed, nextTick, onMounted, ref } from 'vue'
  import PButton from '@/components/Button/PButton.vue'
  import { ClassValue } from '@/types'
  import { isDateAfter, isDateBefore, keepDateInRange } from '@/utilities/dates'

  const props = defineProps<{
    modelValue: Date | null | undefined,
    min?: Date | null | undefined,
    max?: Date | null | undefined,
  }>()

  const emits = defineEmits<{
    (event: 'update:modelValue', value: Date | null): void,
  }>()

  const monthElements = ref<HTMLElement[]>([])

  const range = computed(() => ({ min: props.min, max: props.max }))

  const selectedDate = computed({
    get() {
      return props.modelValue ?? new Date()
    },
    set(value) {
      emits('update:modelValue', keepDateInRange(value, range.value))
    },
  })

  const monthOptions = eachMonthOfInterval({ start: startOfYear(new Date()), end: endOfYear(new Date()) }).map(x => ({
    value: x.getMonth(),
    label: format(x, 'MMMM'),
  }))

  function getSelectedClass(month: number): ClassValue {
    return {
      'p-calendar-month-picker__month-button--selected': selectedDate.value.getMonth() === month,
    }
  }

  function isDisabled(month: number): boolean {
    const value = setMonth(selectedDate.value, month)

    return !!range.value.min && isDateBefore(endOfMonth(value), range.value.min) || !!range.value.max && isDateAfter(startOfMonth(value), range.value.max)
  }

  function updateSelectedDate(month: number): void {
    selectedDate.value = setMonth(selectedDate.value, month)
  }

  onMounted(() => {
    const selectedMonth = selectedDate.value.getMonth()
    const element = monthElements.value.find(node => node.dataset.month === selectedMonth.toString())

    if (element) {
      nextTick(() => element.parentElement?.focus())
    }
  })
</script>

<style>
.p-calendar-month-picker { @apply
  h-full
  grid
  grid-cols-3
  grid-rows-4
  gap-4
  justify-around
}

.p-calendar-month-picker__month { @apply
  flex
  items-center
  justify-center
}

.p-calendar-month-picker__month-button--selected,
.p-calendar-month-picker__month-button--selected:not(:disabled):hover,
.p-calendar-month-picker__month-button--selected:not(:disabled):active { @apply
  border-none
  cursor-default
  bg-[var(--p-color-input-checked-bg)]
}
</style>