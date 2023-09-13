<template>
  <div class="p-time-picker">
    <scrolling-picker v-model="selectedHours" :options="hourOptions" class="p-time-picker__hours">
      <template #before>
        <div class="p-time-picker--gap" />
      </template>
      <template #after>
        <div class="p-time-picker--gap" />
      </template>
    </scrolling-picker>
    <scrolling-picker v-model="selectedMinutes" :options="minuteOptions" class="p-time-picker__minutes" prevent-focus>
      <template #before>
        <div class="p-time-picker--gap" />
      </template>
      <template #after>
        <div class="p-time-picker--gap" />
      </template>
    </scrolling-picker>
    <scrolling-picker v-model="selectedMeridiem" :options="meridiemOptions" class="p-time-picker__meridiem" prevent-focus>
      <template #before>
        <div class="p-time-picker--gap" />
      </template>
      <template #after>
        <div class="p-time-picker--gap" />
      </template>
    </scrolling-picker>
  </div>
</template>

<script lang="ts" setup>
  import { startOfMinute } from 'date-fns'
  import { computed } from 'vue'
  import ScrollingPicker from '@/components/DatePicker/ScrollingPicker.vue'
  import { useTimeParts } from '@/compositions/useTimeParts'
  import { keepDateInRange } from '@/utilities/dates'

  const props = defineProps<{
    modelValue: Date | null | undefined,
    min?: Date | null | undefined,
    max?: Date | null | undefined,
  }>()

  const emits = defineEmits<{
    (event: 'update:modelValue', value: Date | null): void,
  }>()

  const range = computed(() => ({ min: props.min, max: props.max }))

  const selectedDate = computed({
    get() {
      return props.modelValue ?? startOfMinute(new Date())
    },
    set(value) {
      const withoutSeconds = startOfMinute(value)

      emits('update:modelValue', keepDateInRange(withoutSeconds, range.value))
    },
  })

  const {
    selectedHours,
    selectedMinutes,
    selectedMeridiem,
    hourOptions,
    minuteOptions,
    meridiemOptions,
  } = useTimeParts(selectedDate, range)
</script>

<style>
.p-time-picker {
  --row-height: 28px;
  --gap-height: 0.5rem;
}

.p-time-picker { @apply
  grid
  grid-cols-3
  items-start
  justify-center
  h-full
  w-full
}

.p-time-picker__hours,
.p-time-picker__minutes,
.p-time-picker__meridiem { @apply
  h-full
}

.p-time-picker {
  height: calc((var(--row-height) + var(--gap-height)) * 7);
}

.p-time-picker--gap {
  min-height: calc(var(--row-height) * 3 + var(--gap-height));
}
</style>