<template>
  <div class="p-month-picker">
    <template v-for="(month, index) in monthNames" :key="month">
      <div class="p-month-picker__month">
        <span class="p-month-picker__month-name" :class="classes.month(index)" @click="setMonth(index)">
          {{ month }}
        </span>
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import { getStartOfDay, monthNames } from '@/types/date'

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

  const classes = computed(() => ({
    month:(month: number) => ({
      'p-month-picker__month-name--selected': selectedDate.value.getUTCMonth() === month,
    }),
  }))

  function setMonth(month: number): void {
    const value = new Date(selectedDate.value)

    value.setUTCMonth(month)

    selectedDate.value = value
  }
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

.p-month-picker__month-name { @apply
  py-1
  px-2
  capitalize
  cursor-pointer
  rounded
  hover:bg-gray-100
}

.p-month-picker__month-name--selected { @apply
  text-white
  bg-prefect-600
  hover:bg-prefect-800
}
</style>