<template>
  <PSelectOptions v-model="value" :options="options" class="p-date-range-select-options">
    <template #pre-options>
      <div class="p-1">
        <PTextInput ref="input" v-model="search" />
      </div>
    </template>
  </PSelectOptions>
</template>

<script lang="ts" setup>
  import { addSeconds, isAfter, isBefore, secondsInDay, secondsInHour, secondsInMinute } from 'date-fns'
  import { computed, onMounted, ref } from 'vue'
  import PSelectOptions from '@/components/Select/PSelectOptions.vue'
  import PTextInput from '@/components/TextInput/PTextInput.vue'
  import { SelectOption } from '@/types'
  import { toPluralString } from '@/utilities'

  export type DateRangeSelectOptionsValue = number | 'range' | null | undefined

  const props = defineProps<{
    modelValue: DateRangeSelectOptionsValue,
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
      { label: `Next ${unit} ${toPluralString('minute', unit)}`, value: unit * secondsInMinute },
      { label: `Next ${unit} ${toPluralString('hour', unit)}`, value: unit * secondsInHour },
      { label: `Next ${unit} ${toPluralString('day', unit)}`, value: unit * secondsInDay },
    ]

    const now = new Date()

    const filteredSpans = spans.filter(option => {
      const time = addSeconds(now, option.value)

      if (props.min && isBefore(time, props.min)) {
        return false
      }

      if (props.max && isAfter(time, props.max)) {
        return false
      }

      return true
    })

    return [
      ...filteredSpans,
      { label: 'Select from calendar', value: 'range' },
    ]
  })
</script>