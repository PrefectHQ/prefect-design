<template>
  <div class="p-time-picker">
    <scrolling-picker v-model="selectedHours" :options="hourOptions" class="p-time-picker__hours" />
    <scrolling-picker v-model="selectedMinutes" :options="minuteOptions" class="p-time-picker__minutes" prevent-focus />
    <scrolling-picker v-model="selectedMeridiem" :options="['AM', 'PM']" class="p-time-picker__meridiem" prevent-focus />
  </div>
</template>

<script lang="ts" setup>
  import { format, setHours, setMinutes, startOfDay } from 'date-fns'
  import { computed } from 'vue'
  import ScrollingPicker from '@/components/DatePicker/ScrollingPicker.vue'
  import { SelectModelValue } from '@/types/selectOption'

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

  const selectedHours = computed({
    get() {
      return parseInt(format(selectedDate.value, 'h'))
    },
    set(value: SelectModelValue) {
      const selectedHours = value as number % 12

      if (selectedMeridiem.value === 'AM') {
        selectedDate.value = setHours(selectedDate.value, selectedHours)
      } else {
        selectedDate.value = setHours(selectedDate.value, selectedHours + 12)
      }
    },
  })

  const selectedMinutes = computed({
    get() {
      return parseInt(format(selectedDate.value, 'mm'))
    },
    set(value: SelectModelValue) {
      selectedDate.value = setMinutes(selectedDate.value, value as number)
    },
  })

  const selectedMeridiem = computed({
    get() {
      return format(selectedDate.value, 'a')
    },
    set(value: SelectModelValue) {
      const currentMeridiem = format(selectedDate.value, 'a')
      const currentHours = selectedDate.value.getHours()

      if (value === 'AM' && currentMeridiem !== 'AM') {
        selectedDate.value = setHours(selectedDate.value, currentHours - 12)
      }

      if (value === 'PM' && currentMeridiem !== 'PM') {
        selectedDate.value = setHours(selectedDate.value, currentHours + 12)
      }
    },
  })

  const hourOptions = [...new Array(12).keys()].map(index => index + 1)
  const minuteOptions = [...new Array(60).keys()].map(minute => ({ label:String(minute).padStart(2, '0'), value: minute }))
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