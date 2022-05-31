<template>
  <div class="p-month-picker">
    <template v-for="(option) in monthOptions" :key="option.value">
      <div class="p-month-picker__month">
        <p-button
          size="xs"
          class="p-month-picker__month-button"
          :disabled="isDisabled(option.value)"
          :flat="!isSelected(option.value)"
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
  import PButton from '@/components/Button'
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
    set(value: Date) {
      emits('update:modelValue', keepDateInRange(value, range.value))
    },
  })

  const monthOptions = eachMonthOfInterval({ start:startOfYear(new Date()), end: endOfYear(new Date()) }).map(x => ({
    value: x.getMonth(),
    label: format(x, 'MMMM'),
  }))

  function isSelected(month: number): boolean {
    return selectedDate.value.getMonth() === month
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
.p-month-picker { @apply
  h-full
  grid
  grid-cols-3
  grid-rows-4
  gap-4
}

.p-month-picker__month { @apply
  text-center
}

.p-month-picker__month-button { @apply
  justify-center
}
</style>