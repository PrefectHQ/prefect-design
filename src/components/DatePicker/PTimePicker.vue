<template>
  <div class="p-time-picker">
    <p-hour-picker v-model="selectedDate" class="p-time-picker__hours" />
    <p-minute-picker v-model="selectedDate" class="p-time-picker__minutes" />
    <p-meridiem-picker v-model="selectedDate" class="p-time-picker__meridiem" />
  </div>
</template>

<script lang="ts" setup>
  import { startOfDay } from 'date-fns'
  import { computed } from 'vue'
  import PHourPicker from '@/components/DatePicker/PHourPicker.vue'
  import PMeridiemPicker from '@/components/DatePicker/PMeridiemPicker.vue'
  import PMinutePicker from '@/components/DatePicker/PMinutePicker.vue'

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
</script>

<style>
.p-time-picker { @apply
  flex
  flex-auto
  items-start
  justify-center
  h-full
}

.p-time-picker__hours,
.p-time-picker__minutes,
.p-time-picker__meridiem { @apply
  h-full
}
</style>