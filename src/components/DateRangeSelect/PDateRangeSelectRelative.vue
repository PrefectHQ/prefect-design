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