<template>
  <div class="p-time-picker">
    <div class="p-time-picker__hours">
      <template v-for="option in hourOptions" :key="option">
        <p-button
          size="sm"
          :inset="hours !== option.toString()"
          class="p-time-picker__hour-option"
          @click="setHours(option)"
        >
          <span ref="hourElements" :data-hour="option">{{ option }}</span>
        </p-button>
      </template>
    </div>
    <div class="p-time-picker__minutes">
      <template v-for="option in minuteOptions" :key="option">
        <p-button
          size="sm"
          :inset="minutes !== padMinutes(option)"
          class="p-time-picker__minute-option"
          @click="setMinutes(option)"
        >
          <span ref="minuteElements" :data-minute="padMinutes(option)">{{ padMinutes(option) }}</span>
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
          <span ref="meridiemElements" :data-meridiem="option">{{ option }}</span>
        </p-button>
      </template>
    </div>

    <div class="p-time-picker__actions">
      <p-button class="p-time-picker__set-button" secondary size="sm" @click="handleSetClick">
        Set
      </p-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { format, startOfDay } from 'date-fns'
  import { computed, onMounted, ref } from 'vue'
  import PButton from '@/components/Button'

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

  const time = ref(new Date(selectedDate.value))
  const hourElements = ref<HTMLElement[]>([])
  const minuteElements = ref<HTMLElement[]>([])
  const meridiemElements = ref<HTMLElement[]>([])

  const hourOptions = new Array(12).fill(null).map((x, index) => index + 1)
  const minuteOptions = new Array(60).fill(null).map((x, index) => index)
  const meridiemOptions = ['AM', 'PM'] as const

  const hours = computed(() => format(time.value, 'h'))
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

  function padMinutes(minutes: number): string {
    return String(minutes).padStart(2, '0')
  }

  function handleSetClick(): void {
    selectedDate.value = time.value
  }

  onMounted(() => {
    const hourElement = hourElements.value.find(node => node.dataset.hour === hours.value.toString())
    const minuteElement = minuteElements.value.find(node => node.dataset.minute === minutes.value.toString())
    const meridiemElement = meridiemElements.value.find(node => node.dataset.meridiem === meridiem.value.toString())

    if (hourElement && minuteElement && meridiemElement) {
      hourElement.scrollIntoView({ block: 'center' })
      minuteElement.scrollIntoView({ block: 'center' })
      meridiemElement.scrollIntoView({ block: 'center' })
    }
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
.p-time-picker__meridiem,
.p-time-picker__actions { @apply
  h-full
  flex
  flex-col
  py-1
  px-3
  gap-2
  overflow-y-auto
}

.p-time-picker__hour-option,
.p-time-picker__minute-option,
.p-time-picker__meridiem-option,
.p-time-picker__set-button { @apply
  justify-center
}

.p-time-picker__meridiem,
.p-time-picker__actions { @apply
  justify-center
}
</style>