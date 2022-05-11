<template>
  <div class="p-time-picker">
    <div class="p-time-picker__hours">
      <template v-for="option in hourOptions" :key="option">
        <p-button
          size="sm"
          :inset="twelveHour !== option.label"
          class="p-time-picker__hour-option"
          @click="time = option.value"
        >
          {{ option.label }}
        </p-button>
      </template>
    </div>
    <div class="p-time-picker__minutes">
      <template v-for="option in minuteOptions" :key="option">
        <p-button
          size="sm"
          :inset="minutes !== option.label"
          class="p-time-picker__minute-option"
          @click="time = option.value"
        >
          {{ option.label }}
        </p-button>
      </template>
    </div>
    <div class="p-time-picker__meridiem">
      <template v-for="option in meridiemOptions" :key="option">
        <p-button
          size="sm"
          :inset="meridiem !== option.label"
          class="p-time-picker__meridiem-option"
          @click="time = option.value"
        >
          {{ option.label }}
        </p-button>
      </template>
    </div>

    <p-button icon="CheckIcon" flat @click="handleSetClick">
      Set
    </p-button>
  </div>
</template>

<script lang="ts" setup>
  import { format } from 'date-fns'
  import { computed, Ref, ref } from 'vue'
  import PButton from '@/components/Button'
  import { getStartOfDay } from '@/types/date'

  type DateOption = {
    value: Date,
    label: string,
  }

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
  const hourOptions = computed(() => new Array(12).fill(null).map((x, index) => getDateOptionAtHours(time, index)))
  const minuteOptions = computed(() => new Array(60).fill(null).map((x, index) => getDateOptionAtMinutes(time, index)))
  const meridiemOptions = computed(() => [getDateOptionAtMeridiem(time, 'AM'), getDateOptionAtMeridiem(time, 'PM')])

  const twelveHour = computed(() => format(time.value, 'h'))
  const minutes = computed(() => format(time.value, 'mm'))
  const meridiem = computed(() => format(time.value, 'a'))

  function getDateOptionAtHours(date: Ref<Date>, hours: number): DateOption {
    const value = new Date(date.value)

    value.setHours(hours)

    return {
      value,
      label: format(value, 'h'),
    }
  }

  function getDateOptionAtMinutes(date: Ref<Date>, minutes: number): DateOption {
    const value = new Date(date.value)

    value.setMinutes(minutes)

    return {
      value,
      label: format(value, 'mm'),
    }
  }

  function getDateOptionAtMeridiem(date: Ref<Date>, meridiem: 'AM' | 'PM'): DateOption {
    const value = new Date(date.value)
    const currentMeridiem = format(value, 'a')

    if (meridiem === 'AM' && currentMeridiem !== 'AM') {
      value.setHours(value.getHours() - 12)
    }

    if (meridiem === 'PM' && currentMeridiem !== 'PM') {
      value.setHours(value.getHours() + 12)
    }

    return {
      value,
      label: meridiem,
    }
  }

  function handleSetClick(): void {
    selectedDate.value = time.value
  }
</script>

<style>
.p-time-picker { @apply
  flex
  flex-auto
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