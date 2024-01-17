<template>
  <PSelectOptions v-model="selected" :options="options" class="p-date-range-select-relative" @update:model-value="apply">
    <template #pre-options>
      <div class="p-1">
        <PTextInput ref="input" v-model="search" placeholder="Relative time (15m, 1h, 1d, 1w)" />
      </div>
    </template>
    <template #option="{ option }">
      <div class="p-date-range-select-relative__option">
        <span>{{ option.label }}</span>
        <span class="text-subdued font-mono">{{ getOptionShorthand(option as RelativeSelectOption) }}</span>
      </div>
    </template>
  </PSelectOptions>
</template>

<script lang="ts" setup>
  import { secondsInMinute, secondsInHour, secondsInDay, secondsInWeek, secondsInMonth, addSeconds, isBefore, isAfter } from 'date-fns'
  import { computed, onMounted, ref } from 'vue'
  import PSelectOptions from '@/components/Select/PSelectOptions.vue'
  import PTextInput from '@/components/TextInput/PTextInput.vue'
  import { DateRangeSelectSpanValue } from '@/types'
  import { toPluralString } from '@/utilities'

  const props = defineProps<{
    maxSpanInSeconds?: number,
    min?: Date,
    max?: Date,
  }>()

  const emit = defineEmits<{
    'apply': [DateRangeSelectSpanValue | null],
  }>()

  type RelativeSelectOption = {
    label: string,
    unit: string,
    quantity: number,
    value: number,
  }

  const input = ref<InstanceType<typeof PTextInput>>()
  const selected = ref()
  const search = ref('')

  const options = computed<RelativeSelectOption[]>(() => {
    const [quantitySearch = ''] = search.value.match(/\d+/) ?? []
    const [unitSearch = ''] = search.value.match(/[a-zA-Z]+/) ?? []
    const [directionSearch = ''] = search.value.match(/[+-]+/) ?? []
    const parsed = parseInt(quantitySearch)
    const quantity = isNaN(parsed) ? 1 : parsed

    const spans = [
      { label: `Past ${quantity} ${toPluralString('minute', quantity)}`, unit: 'minute', quantity, value: quantity * secondsInMinute * -1 },
      { label: `Past ${quantity} ${toPluralString('hour', quantity)}`, unit: 'hour', quantity, value: quantity * secondsInHour * -1 },
      { label: `Past ${quantity} ${toPluralString('day', quantity)}`, unit: 'day', quantity, value: quantity * secondsInDay * -1 },
      { label: `Past ${quantity} ${toPluralString('week', quantity)}`, unit: 'week', quantity, value: quantity * secondsInWeek * -1 },
      { label: `Next ${quantity} ${toPluralString('minute', quantity)}`, unit: 'minute', quantity, value: quantity * secondsInMinute },
      { label: `Next ${quantity} ${toPluralString('hour', quantity)}`, unit: 'hour', quantity, value: quantity * secondsInHour },
      { label: `Next ${quantity} ${toPluralString('day', quantity)}`, unit: 'day', quantity, value: quantity * secondsInDay },
      { label: `Next ${quantity} ${toPluralString('week', quantity)}`, unit: 'week', quantity, value: quantity * secondsInWeek },
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

      const withinSpan = Math.abs(option.value) < maxSpanInSeconds
      const unitMatches = toPluralString(option.unit, quantity).includes(unitSearch)
      const directionMatches = getOptionDirection(option).includes(directionSearch)

      return withinSpan && unitMatches && directionMatches
    })

    return filteredSpans
  })

  onMounted(() => {
    input.value?.el?.focus()
  })

  function getOptionShorthand(option: RelativeSelectOption): string {
    const direction = getOptionDirection(option)
    const unit = option.unit.slice(0, 1)
    const label = `${option.quantity}${unit}`

    if (direction === '-') {
      return label
    }

    return `${direction}${label}`
  }

  function getOptionDirection(option: RelativeSelectOption): '+' | '-' {
    return option.value > 0 ? '+' : '-'
  }

  function apply(): void {
    if (selected.value) {
      emit('apply', { type: 'span', seconds: selected.value })
      return
    }

    emit('apply', null)
  }
</script>

<style>
.p-date-range-select-relative {
  min-width: 300px;
}

.p-date-range-select-relative .p-select-option__text { @apply
  w-full
}

.p-date-range-select-relative__option { @apply
  w-full
  flex
  items-center
  justify-between
}
</style>