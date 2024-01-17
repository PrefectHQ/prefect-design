<template>
  <ScrollingPicker
    ref="scrollingPicker"
    :model-value="selectedYear"
    :options="years"
    @update:model-value="updateSelectedDate"
  >
    <template #before>
      <div ref="topElement" class="scrolling-picker__observer" data-target="top" />
    </template>
    <template #after>
      <div ref="bottomElement" class="scrolling-picker__observer" data-target="bottom" />
    </template>
  </ScrollingPicker>
</template>

<script lang="ts" setup>
  import { useIntersectionObserver } from '@prefecthq/vue-compositions'
  import { setYear } from 'date-fns'
  import { computed, ref, nextTick, onMounted } from 'vue'
  import ScrollingPicker from '@/components/Calendar/ScrollingPicker.vue'
  import { SelectModelValue, SelectOptionNormalized } from '@/types/selectOption'
  import { isDateInRange, keepDateInRange } from '@/utilities/dates'

  const props = defineProps<{
    modelValue: Date | null | undefined,
    min?: Date | null | undefined,
    max?: Date | null | undefined,
  }>()

  const emits = defineEmits<{
    (event: 'update:modelValue', value: Date | null): void,
  }>()

  const range = computed(() => ({ min: props.min, max: props.max }))

  const selectedDate = computed({
    get() {
      return props.modelValue ?? new Date()
    },
    set(value) {
      emits('update:modelValue', keepDateInRange(value, range.value))
    },
  })

  const topElement = ref<HTMLElement>()
  const bottomElement = ref<HTMLElement>()
  const selectedYear = computed(() => selectedDate.value.getFullYear())

  const viewingYear = ref(selectedYear.value)
  const viewingCount = 20
  const scrollingPicker = ref<typeof ScrollingPicker>()

  const years = computed(() => {
    const values: SelectOptionNormalized[] = []
    const minYear = viewingYear.value - viewingCount
    const maxYear = viewingYear.value + viewingCount

    for (let year = minYear > 0 ? minYear : 0; year < maxYear; year++) {
      const dateValue = setYear(selectedDate.value, year)

      values.push({
        label: year.toString(),
        value: year,
        disabled: !isDateInRange(dateValue, range.value, 'year'),
      })
    }

    return values
  })

  function viewingYearWouldHaveNegativeNumbers(year: number): boolean {
    return year - viewingCount < 0
  }

  function updateSelectedDate(year: SelectModelValue): void {
    selectedDate.value = setYear(selectedDate.value, year as number)
  }

  function handleIntersection([entry]: IntersectionObserverEntry[]): void {
    if (entry.isIntersecting) {
      const target = entry.target as HTMLElement

      if (target.dataset.target === 'top') {
        if (viewingYearWouldHaveNegativeNumbers(viewingYear.value - viewingCount)) {
          viewingYear.value = viewingCount
          return
        }
        viewingYear.value = viewingYear.value - viewingCount
        nextTick(() => scrollingPicker.value!.scrollToOption(viewingYear.value))
      } else {
        viewingYear.value = viewingYear.value + viewingCount
      }
    }
  }

  const observer = useIntersectionObserver(handleIntersection, {})

  onMounted(() => {
    observer.observe(topElement)
    observer.observe(bottomElement)
  })
</script>