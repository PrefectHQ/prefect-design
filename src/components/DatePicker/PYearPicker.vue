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
  import { endOfYear, isAfter, isBefore, setYear, startOfDay, startOfYear } from 'date-fns'
  import { computed, ref, nextTick, onMounted, onUnmounted } from 'vue'
  import ScrollingPicker from '@/components/DatePicker/ScrollingPicker.vue'
  import { SelectModelValue, SelectOption } from '@/types/selectOption'

  const props = defineProps<{
    modelValue: Date | null | undefined,
    min?: Date | null | undefined,
    max?: Date | null | undefined,
  }>()

  const emits = defineEmits<{
    (event: 'update:modelValue', value: Date | null): void,
  }>()

  const selectedDate = computed({
    get() {
      return props.modelValue ?? startOfDay(new Date())
    },
    set(value: Date) {
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

    for (let year=minYear; year<maxYear; year++) {
      const dateValue = setYear(selectedDate.value, year)

      values.push({
        label: year.toString(),
        value: year,
        disabled: !isDateInRange(dateValue),
      })
    }

    return values
  })

  function isDateInRange(date: Date): boolean {
    if (props.min && isBefore(endOfYear(date), props.min)) {
      return false
    }

    if (props.max && isAfter(startOfYear(date), props.max)) {
      return false
    }

    return true
  }

  function updateSelectedDate(year: SelectModelValue): void {
    const value = setYear(selectedDate.value, year as number)

    if (props.min && isBefore(value, props.min)) {
      selectedDate.value = props.min
    } else if (props.max && isAfter(value, props.max)) {
      selectedDate.value = props.max
    } else {
      selectedDate.value = value
    }
  }

  function handleIntersection([entry]: IntersectionObserverEntry[]): void {
    if (entry.isIntersecting) {
      const target = entry.target as HTMLElement

      if (target.dataset.target === 'top') {
        viewingYear.value = viewingYear.value - viewingCount
        nextTick(() => scrollingPicker.value!.scrollToOption(viewingYear.value))
      } else {
        viewingYear.value = viewingYear.value + viewingCount
      }
    }
  }

  let observer: IntersectionObserver | null = null

  onMounted(() => {
    observer = new IntersectionObserver(handleIntersection)

    if (topElement.value && bottomElement.value) {
      observer.observe(topElement.value)
      observer.observe(bottomElement.value)
    }
  })

  onUnmounted(() => observer?.disconnect())
</script>