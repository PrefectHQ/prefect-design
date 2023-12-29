<template>
  <PDateRangePicker
    v-model:start-date="startDate"
    v-model:end-date="endDate"
    class="p-date-range-select-range"
    v-bind="{ min, max }"
    show-time
    @close="close"
    @apply="apply"
  />
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import { DateRangeSelectRangeValue } from '@/types'

  defineProps<{
    min?: Date,
    max?: Date,
  }>()

  const emit = defineEmits<{
    apply: [DateRangeSelectRangeValue | null],
    close: [],
  }>()

  const startDate = ref<Date | null>(null)
  const endDate = ref<Date | null>(null)

  function apply(): void {
    if (startDate.value && endDate.value) {
      emit('apply', { type: 'range', startDate: startDate.value, endDate: endDate.value })
      return
    }

    emit('apply', null)
  }

  function close(): void {
    emit('close')
  }
</script>