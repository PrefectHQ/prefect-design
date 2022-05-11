<template>
  <div class="p-month-picker">
    <template v-for="(month, index) in monthNames" :key="month">
      <div class="p-month-picker__month">
        <p-button
          size="xs"
          class="p-month-picker__month-button"
          :flat="!isSelected(index)"
          @click="selectedMonth = index"
        >
          <span ref="monthElements" :data-month="index">
            {{ month }}
          </span>
        </p-button>
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
  import { computed, nextTick, onMounted, ref } from 'vue'
  import PButton from '@/components/Button'
  import { getStartOfDay, monthNames } from '@/types/date'

  const props = defineProps<{
    modelValue: Date | null | undefined,
  }>()

  const emits = defineEmits<{
    (event: 'update:modelValue', value: Date | null): void,
  }>()

  const monthElements = ref<HTMLElement[]>([])

  const selectedDate = computed({
    get() {
      return props.modelValue ?? new Date(getStartOfDay())
    },
    set(value: Date) {
      emits('update:modelValue', value)
    },
  })

  const selectedMonth = computed({
    get() {
      return selectedDate.value.getUTCMonth()
    },
    set(month: number) {
      const value = new Date(selectedDate.value)

      value.setUTCMonth(month)

      selectedDate.value = value
    },
  })

  function isSelected(month: number): boolean {
    return selectedMonth.value === month
  }

  onMounted(() => {
    const element = monthElements.value.find(node => node.dataset.month === selectedMonth.value.toString())

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