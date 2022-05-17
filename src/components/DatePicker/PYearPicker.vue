<template>
  <scrolling-picker
    ref="scrollingPicker"
    :model-value="selectedYear"
    :options="years"
    @update:model-value="updateSelectedDate"
    @scroll-top="handleScrollTop"
    @scroll-bottom="handleScrollBottom"
  />
</template>

<script lang="ts" setup>
  import { setYear, startOfDay } from 'date-fns'
  import { computed, ref, nextTick } from 'vue'
  import ScrollingPicker from '@/components/DatePicker/ScrollingPicker.vue'
  import { SelectModelValue, SelectOption } from '@/types/selectOption'

  const props = defineProps<{
    modelValue: Date | null | undefined,
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

  const selectedYear = computed(() => selectedDate.value.getFullYear())

  const viewingYear = ref(selectedYear.value)
  const viewingCount = 20
  const scrollingPicker = ref<typeof ScrollingPicker>()

  const years = computed(() => {
    const values: SelectOption[] = []
    const minYear = viewingYear.value - viewingCount
    const maxYear = viewingYear.value + viewingCount

    for (let year=minYear; year<maxYear; year++) {
      values.push({ label: year.toString(), value: year })
    }

    return values
  })

  function updateSelectedDate(value: SelectModelValue): void {
    selectedDate.value = setYear(selectedDate.value, value as number)
  }

  function handleScrollTop(): void {
    viewingYear.value = viewingYear.value - viewingCount
    nextTick(() => scrollingPicker.value!.scrollToOption(viewingYear.value))
  }

  function handleScrollBottom(): void {
    viewingYear.value = viewingYear.value + viewingCount
  }
</script>