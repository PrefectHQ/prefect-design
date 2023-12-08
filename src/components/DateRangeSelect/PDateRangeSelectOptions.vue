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
  import { secondsInDay, secondsInHour, secondsInMinute } from 'date-fns'
  import { computed, onMounted, ref } from 'vue'
  import PSelectOptions from '@/components/Select/PSelectOptions.vue'
  import PTextInput from '@/components/TextInput/PTextInput.vue'
  import { SelectOption, SelectOptionGroup } from '@/types'

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

  // eslint keeps breaking the parens here
  // eslint-disable-next-line no-extra-parens
  const options = computed<(SelectOption | SelectOptionGroup)[]>(() => {
    const parsed = parseInt(search.value || '1')
    const unit = isNaN(parsed) ? 1 : parsed

    return [
      {
        label: 'Test',
        options: [
          { label: `Past ${unit} minutes`, value: unit * secondsInMinute * -1 },
          { label: `Past ${unit} hours`, value: unit * secondsInHour * -1 },
          { label: `Past ${unit} days`, value: unit * secondsInDay * -1 },
          { label: `Next ${unit} minutes`, value: unit * secondsInMinute },
          { label: `Next ${unit} hours`, value: unit * secondsInHour },
          { label: `Next ${unit} days`, value: unit * secondsInDay },
        ],
      },
      { label: 'Select from calendar', value: 'range' },
    ]
  })
</script>

<style>

</style>