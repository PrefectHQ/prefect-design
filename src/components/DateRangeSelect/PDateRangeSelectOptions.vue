<template>
  <PSelectOptions v-model="value" :options="options" class="p-date-range-select-options">
    <template #pre-options>
      <div class="p-1">
        <PTextInput ref="input" v-model="search" placeholder="Relative time(15m, 1h, 1d, 1w)" />
      </div>
    </template>
  </PSelectOptions>
</template>

<script lang="ts" setup>
  import { addSeconds, isAfter, isBefore, secondsInDay, secondsInHour, secondsInMinute, secondsInMonth, secondsInWeek } from 'date-fns'
  import { computed, onMounted, ref } from 'vue'
  import PSelectOptions from '@/components/Select/PSelectOptions.vue'
  import PTextInput from '@/components/TextInput/PTextInput.vue'
  import { SelectOption } from '@/types'
  import { toPluralString } from '@/utilities'

  export type DateRangeSelectOptionsValue = number | 'range' | null | undefined

  const props = defineProps<{
    modelValue: DateRangeSelectOptionsValue,
    maxSpanInSeconds?: number,
    min?: Date,
    max?: Date,
  }>()

  const emit = defineEmits<{
    'update:modelValue': [DateRangeSelectOptionsValue],
  }>()

  onMounted(() => {
    input.value?.el?.focus()
  })

  const value = computed({
    get() {
      return props.modelValue
    },
    set(value) {
      emit('update:modelValue', value)
    },
  })

  const input = ref<InstanceType<typeof PTextInput>>()
  const search = ref('')

  const options = computed<SelectOption[]>(() => {
    const parsed = parseInt(search.value || '1')
    const unit = isNaN(parsed) ? 1 : parsed

    const spans = [
      { label: `Past ${unit} ${toPluralString('minute', unit)}`, value: unit * secondsInMinute * -1 },
      { label: `Past ${unit} ${toPluralString('hour', unit)}`, value: unit * secondsInHour * -1 },
      { label: `Past ${unit} ${toPluralString('day', unit)}`, value: unit * secondsInDay * -1 },
      { label: `Past ${unit} ${toPluralString('week', unit)}`, value: unit * secondsInWeek * -1 },
      { label: `Next ${unit} ${toPluralString('minute', unit)}`, value: unit * secondsInMinute },
      { label: `Next ${unit} ${toPluralString('hour', unit)}`, value: unit * secondsInHour },
      { label: `Next ${unit} ${toPluralString('day', unit)}`, value: unit * secondsInDay },
      { label: `Next ${unit} ${toPluralString('week', unit)}`, value: unit * secondsInWeek },
    ]

    const now = new Date()
    const maxSpanInSeconds = props.maxSpanInSeconds ?? secondsInMonth * 2

    const filteredSpans = spans.filter(option => {
      const time = addSeconds(now, option.value)

      if (props.min && isBefore(time, props.min)) {
        return false
      }

      if (props.max && isAfter(time, props.max)) {
        return false
      }

      if (maxSpanInSeconds) {
        return Math.abs(option.value) < maxSpanInSeconds
      }

      return true
    })

    return [
      ...filteredSpans,
      { label: 'Select from calendar', value: 'range' },
    ]
  })
</script>

<style>
.p-date-range-select-options {
  min-width: 300px;
}

.p-date-range-select-options,
.p-date-range-select-options .p-select-options__options {
  max-height: 400px;
}
</style>