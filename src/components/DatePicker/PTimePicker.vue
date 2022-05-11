<template>
  <div class="p-time-picker">
    <div class="p-time-picker__hours">
      <template v-for="option in hourOptions" :key="option">
        <p-button
          size="sm"
          :inset="twelveHour !== option.toString()"
          class="p-time-picker__hour-option"
          @click="setHours(option)"
        >
          {{ option }}
        </p-button>
      </template>
    </div>
    <div class="p-time-picker__minutes">
      <template v-for="option in minuteOptions" :key="option">
        <p-button
          size="sm"
          :inset="minutes !== String(option).padStart(2, '0')"
          class="p-time-picker__minute-option"
          @click="setMinutes(option)"
        >
          {{ String(option).padStart(2, '0') }}
        </p-button>
      </template>
    </div>
    <div class="p-time-picker__meridiem">
      <template v-for="option in meridiemOptions" :key="option">
        <p-button
          size="sm"
          :inset="meridiem !== option"
          class="p-time-picker__meridiem-option"
          @click="setMeridiem(option)"
        >
          {{ option }}
        </p-button>
      </template>
    </div>

    <p-button secondary size="sm" @click="handleSetClick">
      Set
    </p-button>
  </div>
</template>

<script lang="ts" setup>
  import { format } from 'date-fns'
  import { computed, ref } from 'vue'
  import PButton from '@/components/Button'
  import { getStartOfDay } from '@/types/date'

  const props = defineProps<{
    modelValue: Date | null | undefined,
  }>()

  const emits = defineEmits<{
    (event: 'update:modelValue', value: Date | null): void,
  }>()

  const selectedDate = computed({
    get() {
      return props.modelValue ?? new Date(today)
    },
    set(value: Date) {
      emits('update:modelValue', value)
    },
  })

  const today = getStartOfDay()
  const time = ref(new Date(selectedDate.value))

  const hourOptions = new Array(12).fill(null).map((x, index) => index + 1)
  const minuteOptions = new Array(60).fill(null).map((x, index) => index)
  const meridiemOptions = ['AM', 'PM'] as const

  const twelveHour = computed(() => format(time.value, 'h'))
  const minutes = computed(() => format(time.value, 'mm'))
  const meridiem = computed(() => format(time.value, 'a'))

  function setHours(hours: number): void {
    const value = new Date(time.value)
    const selectedHours = hours % 12

    if (meridiem.value === 'AM') {
      value.setHours(selectedHours)
    } else {
      value.setHours(selectedHours + 12)
    }

    time.value = value
  }

  function setMinutes(minutes: number): void {
    const value = new Date(time.value)

    value.setMinutes(minutes)

    time.value = value
  }

  function setMeridiem(meridiem: typeof meridiemOptions[number]): void {
    const value = new Date(time.value)
    const currentMeridiem = format(value, 'a')

    if (meridiem === 'AM' && currentMeridiem !== 'AM') {
      value.setHours(value.getHours() - 12)
    }

    if (meridiem === 'PM' && currentMeridiem !== 'PM') {
      value.setHours(value.getHours() + 12)
    }

    time.value = value
  }

  function handleSetClick(): void {
    selectedDate.value = time.value
  }
</script>

<style>
.p-time-picker { @apply
  flex
  flex-auto
  items-start
  gap-1
  h-full
}

.p-time-picker__hours,
.p-time-picker__minutes,
.p-time-picker__meridiem { @apply
  h-full
  flex
  flex-col
  p-1
  gap-2
  overflow-y-auto
}

.p-time-picker__hour-option,
.p-time-picker__minute-option,
.p-time-picker__meridiem-option { @apply
  justify-center
}
</style>