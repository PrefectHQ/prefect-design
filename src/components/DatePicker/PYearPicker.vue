<template>
  <div class="p-year-picker">
    <div ref="topElement" class="p-year-picker__observer" data-target="top" />
    <div class="p-year-picker-years">
      <template v-for="(year, index) in years" :key="year">
        <button type="button" :tabindex="index" class="p-year-picker__year" :class="classes.year(year)" @click="setYear(year)">
          <span ref="yearElements" :data-year="year">{{ year }}</span>
        </button>
      </template>
    </div>
    <div ref="bottomElement" class="p-year-picker__observer" data-target="bottom" />
  </div>
</template>

<script lang="ts" setup>
  import { startOfDay } from 'date-fns'
  import { computed, onMounted, onUnmounted, ref, nextTick } from 'vue'

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
  const yearElements = ref<HTMLElement[]>([])
  const topElement = ref<HTMLElement>()
  const bottomElement = ref<HTMLElement>()

  const years = computed(() => {
    const values: number[] = []
    const minYear = viewingYear.value - viewingCount
    const maxYear = viewingYear.value + viewingCount

    for (let year=minYear; year<maxYear; year++) {
      values.push(year)
    }

    return values
  })

  const classes = computed(() => ({
    year:(year: number) => ({
      'p-year-picker__year--selected': selectedDate.value.getFullYear() === year,
    }),
  }))

  function setYear(year: number): void {
    const value = new Date(selectedDate.value)

    value.setFullYear(year)

    selectedDate.value = value
  }

  function handleIntersection([entry]: IntersectionObserverEntry[]): void {
    if (entry.isIntersecting) {
      const target = entry.target as HTMLElement

      if (target.dataset.target === 'top') {
        viewingYear.value = viewingYear.value - viewingCount
        nextTick(() => scrollToYear(viewingYear.value))
      } else {
        viewingYear.value = viewingYear.value + viewingCount
      }
    }
  }

  function scrollToYear(year: number): HTMLElement | undefined {
    const element = yearElements.value.find(node => node.dataset.year === year.toString())

    if (element) {
      element.scrollIntoView({ block: 'center' })
    }

    return element
  }

  let observer: IntersectionObserver | null = null

  onMounted(() => {
    observer = new IntersectionObserver(handleIntersection)

    const element = scrollToYear(selectedYear.value)

    if (topElement.value && bottomElement.value) {
      observer.observe(topElement.value)
      observer.observe(bottomElement.value)
    }

    if (element) {
      element.parentElement?.focus()
    }
  })

  onUnmounted(() => observer?.disconnect())
</script>

<style>
.p-year-picker { @apply
  h-full
}

.p-year-picker-years { @apply
  flex
  flex-col
  justify-center
  gap-2
}

.p-year-picker__year { @apply
  text-center
  py-1
  px-2
  text-sm
  cursor-pointer
  rounded
  hover:bg-gray-100
  focus:ring-prefect-600
  focus:outline-none
  focus:ring-2
  focus:ring-offset-2
}

.p-year-picker__year--selected { @apply
  text-white
  bg-prefect-600
  hover:bg-prefect-800
}
</style>