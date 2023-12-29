<template>
  <PDatePicker v-model="date" show-time class="p-date-range-select-around" @close="close" @apply="apply">
    <template #after-controls>
      <PLabel label="Duration">
        <template #default="{ id }">
          <PNumberInput :id="id" v-model="seconds" min="1" append="Seconds" />
        </template>
      </PLabel>
    </template>
  </PDatePicker>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import PDatePicker from '@/components/DatePicker/PDatePicker.vue'
  import PLabel from '@/components/Label/PLabel.vue'
  import PNumberInput from '@/components/NumberInput/PNumberInput.vue'
  import { DateRangeSelectAroundValue } from '@/types'

  const emit = defineEmits<{
    apply: [DateRangeSelectAroundValue | null],
    close: [],
  }>()

  const date = ref<Date | null>(null)
  const seconds = ref(15)

  function apply(): void {
    if (date.value && seconds.value) {
      emit('apply', { type: 'around', date: date.value, seconds: seconds.value })
      return
    }

    emit('apply', null)
  }

  function close(): void {
    emit('close')
  }
</script>