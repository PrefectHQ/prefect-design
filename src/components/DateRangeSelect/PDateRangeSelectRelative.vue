<template>
  <PSelectOptions v-model="selected" :options="options" class="p-date-range-select-relative" @update:model-value="apply">
    <template #pre-options>
      <div class="p-1">
        <PTextInput ref="input" v-model="search" placeholder="Relative time (15m, 1h, 1d, 1w)" />
      </div>
    </template>
  </PSelectOptions>
</template>

<script lang="ts" setup>
  import { secondsInMinute, secondsInHour, secondsInDay, secondsInWeek, secondsInMonth, addSeconds, isBefore, isAfter } from 'date-fns'
  import { computed, onMounted, ref } from 'vue'
  import PSelectOptions from '@/components/Select/PSelectOptions.vue'
  import PTextInput from '@/components/TextInput/PTextInput.vue'
  import { DateRangeSelectSpanValue, SelectOption } from '@/types'
  import { toPluralString } from '@/utilities'

  const props = defineProps<{
    maxSpanInSeconds?: number,
    min?: Date,
    max?: Date,
  }>()

  const emit = defineEmits<{
    'apply': [DateRangeSelectSpanValue | null],
  }>()

  const input = ref<InstanceType<typeof PTextInput>>()
  const selected = ref()
  const search = ref('')

  const options = computed<SelectOption[]>(() => {
    const [quantitySearch = ''] = search.value.match(/\d+/) ?? []
    const [unitSearch = ''] = search.value.match(/[a-zA-Z]+/) ?? []
    const [directionSearch = ''] = search.value.match(/[+-]+/) ?? []
    const parsed = parseInt(quantitySearch)
    const quantity = isNaN(parsed) ? 1 : parsed

    const spans = [
      { label: `Past ${quantity} ${toPluralString('minute', quantity)}`, unit: 'minute', value: quantity * secondsInMinute * -1 },
      { label: `Past ${quantity} ${toPluralString('hour', quantity)}`, unit: 'hour', value: quantity * secondsInHour * -1 },
      { label: `Past ${quantity} ${toPluralString('day', quantity)}`, unit: 'day', value: quantity * secondsInDay * -1 },
      { label: `Past ${quantity} ${toPluralString('week', quantity)}`, unit: 'week', value: quantity * secondsInWeek * -1 },
      { label: `Next ${quantity} ${toPluralString('minute', quantity)}`, unit: 'minute', value: quantity * secondsInMinute },
      { label: `Next ${quantity} ${toPluralString('hour', quantity)}`, unit: 'hour', value: quantity * secondsInHour },
      { label: `Next ${quantity} ${toPluralString('day', quantity)}`, unit: 'day', value: quantity * secondsInDay },
      { label: `Next ${quantity} ${toPluralString('week', quantity)}`, unit: 'week', value: quantity * secondsInWeek },
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
      const optionDirection = option.value > 0 ? '+' : '-'
      const directionMatches = optionDirection.includes(directionSearch)

      return withinSpan && unitMatches && directionMatches
    })

    return filteredSpans
  })

  onMounted(() => {
    input.value?.el?.focus()
  })

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
</style>