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
  import { secondsInDay, secondsInHour, secondsInMinute, secondsInWeek } from 'date-fns'
  import { computed, onMounted, ref } from 'vue'
  import PSelectOptions from '@/components/Select/PSelectOptions.vue'
  import PTextInput from '@/components/TextInput/PTextInput.vue'
  import { SelectOption } from '@/types'

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

    return [
      { label: `Past ${unit}m`, value: unit * secondsInMinute },
      { label: `Past ${unit}h`, value: unit * secondsInHour },
      { label: `Past ${unit}d`, value: unit * secondsInDay },
      { label: `Past ${unit}w`, value: unit * secondsInWeek },
      { label: 'Select from calendar', value: 'range' },
    ]
  })
</script>

<style>

</style>