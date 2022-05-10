<template>
  <div class="p-month-picker">
    <template v-for="(month, index) in monthNames" :key="month">
      <p-button class="p-month-picker__month" size="xs" :inset="!isSelected(index)" @click="setMonth(index)">
        {{ month }}
      </p-button>
    </template>
  </div>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import PButton from '@/components/Button'
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

  function isSelected(month: number): boolean {
    return selectedDate.value.getUTCMonth() === month
  }

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
  justify-center
}
</style>