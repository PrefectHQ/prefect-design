<template>
  <div ref="containerElement" class="p-year-picker">
    <div ref="topElement" class="p-year-picker__observer" data-target="top" />
    <div class="p-year-picker-years">
      <template v-for="year in years" :key="year">
        <div class="p-year-picker__year" :class="classes.year(year)" @click="setYear(year)">
          <span ref="yearElements">{{ year }}</span>
        </div>
      </template>
    </div>
    <div ref="bottomElement" class="p-year-picker__observer" data-target="bottom" />
  </div>
</template>

<script lang="ts" setup>
  import { computed, onMounted, onUnmounted, ref, nextTick } from 'vue'
  import { getStartOfDay } from '@/types/date'

  const props = defineProps<{
    modelValue: Date | null | undefined,
  }>()

  const emits = defineEmits<{
    (event: 'update:modelValue', value: Date | null): void,
  }>()

  const selectedDate = computed({
    get() {
      return props.modelValue ?? new Date(getStartOfDay())
    },
    set(value: Date) {
      emits('update:modelValue', value)
    },
  })

  const selectedYear = computed(() => selectedDate.value.getUTCFullYear())

  const years = ref([selectedYear.value])
  unshiftYears()
  pushYears()
  const yearElements = ref<HTMLElement[]>([])
  const containerElement = ref<HTMLElement>()
  const topElement = ref<HTMLElement>()
  const bottomElement = ref<HTMLElement>()

  const classes = computed(() => ({
    year:(year: number) => ({
      'p-year-picker__year--selected': selectedDate.value.getUTCFullYear() === year,
    }),
  }))

  function setYear(year: number): void {
    const value = new Date(selectedDate.value)

    value.setUTCFullYear(year)

    selectedDate.value = value
  }

  function handleIntersection([entry]: IntersectionObserverEntry[]): void {
    if (entry.isIntersecting) {
      const target = entry.target as HTMLElement

      if (target.dataset.target === 'top') {
        unshiftYears()
      } else {
        pushYears()
      }
    }
  }

  function unshiftYears(): void {

    // prevent going past year 0?
    const [minYear] = years.value

    years.value = [...new Array(40).fill(null).map((x, index) => minYear - (40 - index)), ...years.value]

    nextTick(() => scrollToYear(minYear))
  }

  function pushYears(): void {
    const maxYear = years.value[years.value.length - 1]

    years.value = [...years.value, ...new Array(54).fill(null).map((x, index) => maxYear + index + 1)]
  }

  function scrollToYear(year: number): void {
    const element = yearElements.value.find(node => node.innerText === year.toString())

    if (element) {
      element.scrollIntoView({ block: 'center' })
    }
  }

  let observer: IntersectionObserver | null = null

  onMounted(() => {
    observer = new IntersectionObserver(handleIntersection)

    scrollToYear(selectedYear.value)

    if (topElement.value && bottomElement.value) {
      observer.observe(topElement.value)
      observer.observe(bottomElement.value)
    }
  })

  onUnmounted(() => observer?.disconnect())
</script>

<style>
.p-year-picker { @apply
  h-full
}

.p-year-picker-years { @apply
  grid
  grid-cols-4
  justify-center
  gap-2
}

.p-year-picker__year { @apply
  text-center
  flex
  items-center
  py-1
  px-2
  text-sm
  cursor-pointer
  rounded
  hover:bg-gray-100
}

.p-year-picker__year--selected { @apply
  text-white
  bg-prefect-600
  hover:bg-prefect-800
}
</style>