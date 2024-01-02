<template>
  <PDatePicker v-model="date" show-time class="p-date-range-select-around" @close="close" @apply="apply">
    <template #after-controls>
      <PLabel label="Duration">
        <template #default="{ id }">
          <PDateRangeDurationInput :id="id" v-model:quantity="quantity" v-model:unit="unit" />
        </template>
      </PLabel>
    </template>
  </PDatePicker>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import PDatePicker from '@/components/DatePicker/PDatePicker.vue'
  import PDateRangeDurationInput from '@/components/DateRangeSelect/PDateRangeDurationInput.vue'
  import PLabel from '@/components/Label/PLabel.vue'
  import { DateRangeSelectAroundUnit, DateRangeSelectAroundValue } from '@/types'

  const emit = defineEmits<{
    apply: [DateRangeSelectAroundValue | null],
    close: [],
  }>()

  const date = ref<Date | null>(null)
  const quantity = ref(15)
  const unit = ref<DateRangeSelectAroundUnit>('second')

  function apply(): void {
    if (date.value && quantity.value) {
      emit('apply', { type: 'around', date: date.value, quantity: quantity.value, unit: unit.value })
      return
    }

    emit('apply', null)
  }

  function close(): void {
    emit('close')
  }
</script>