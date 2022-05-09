<template>
  <div class="p-year-picker">
    <template v-for="year in years" :key="year">
      <div class="p-year-picker__year">
        <span class="p-year-picker__year-name" :class="classes.year(year)" @click="setYear(year)">
          {{ year }}
        </span>
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
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

  const years = computed(() => new Array(25).fill(null).map((placeholder, index) => selectedYear.value + (-12 + index)))

  const classes = computed(() => ({
    year:(year: number) => ({
      'p-year-picker__year-name--selected': selectedDate.value.getUTCFullYear() === year,
    }),
  }))

  function setYear(year: number): void {
    const value = new Date(selectedDate.value)

    value.setUTCFullYear(year)

    selectedDate.value = value
  }
</script>

<style>
.p-year-picker { @apply
  h-full
  grid
  grid-cols-5
  grid-rows-5
  gap-4
}

.p-year-picker__year { @apply
  text-center
}

.p-year-picker__year-name { @apply
  py-1
  px-2
  capitalize
  cursor-pointer
  rounded
  hover:bg-gray-100
}

.p-year-picker__year-name--selected { @apply
  text-white
  bg-prefect-600
  hover:bg-prefect-800
}
</style>