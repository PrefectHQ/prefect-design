<template>
  <scrolling-picker
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
  </scrolling-picker>
</template>

<script lang="ts" setup>
  import { useIntersectionObserver } from '@prefecthq/vue-compositions'
  import { isAfter, isBefore, setYear } from 'date-fns'
  import { computed, ref, nextTick, onMounted } from 'vue'
  import ScrollingPicker from '@/components/DatePicker/ScrollingPicker.vue'
  import { useDateModelValueWithRange } from '@/compositions/useDateModelValueWithRange'
  import { SelectModelValue, SelectOption } from '@/types/selectOption'

  const props = defineProps<{
    // eslint-disable-next-line vue/no-unused-properties
    modelValue: Date | null | undefined,
    // eslint-disable-next-line vue/no-unused-properties
    min?: Date | null | undefined,
    // eslint-disable-next-line vue/no-unused-properties
    max?: Date | null | undefined,
  }>()

  const emits = defineEmits<{
    (event: 'update:modelValue', value: Date | null): void,
  }>()

  const { isDateInRange } = useDateModelValueWithRange(props, emits)

  const selectedDate = computed({
    get() {
      return props.modelValue ?? new Date()
    },
    set(value: Date) {
      if (props.min && isBefore(value, props.min)) {
        return emits('update:modelValue', props.min)
      }

      if (props.max && isAfter(value, props.max)) {
        return emits('update:modelValue', props.max)
      }

      emits('update:modelValue', value)
    },
  })

  const topElement = ref<HTMLElement>()
  const bottomElement = ref<HTMLElement>()
  const selectedYear = computed(() => selectedDate.value.getFullYear())

  const viewingYear = ref(selectedYear.value)
  const viewingCount = 20
  const scrollingPicker = ref<typeof ScrollingPicker>()

  const years = computed(() => {
    const values: SelectOption[] = []
    const minYear = viewingYear.value - viewingCount
    const maxYear = viewingYear.value + viewingCount

    for (let year=minYear > 0 ? minYear : 0; year<maxYear; year++) {
      const dateValue = setYear(selectedDate.value, year)

      values.push({
        label: year.toString(),
        value: year,
        disabled: !isDateInRange(dateValue, 'year'),
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