<template>
  <PSelectOptions v-model="mode" :options="options" class="p-date-range-select-options" />
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import { DateRangeSelectMode } from '@/components/DateRangeSelect/PDateRangeSelect.vue'
  import PSelectOptions from '@/components/Select/PSelectOptions.vue'
  import { SelectOption } from '@/types'

  const props = defineProps<{
    mode: DateRangeSelectMode,
  }>()

  const emit = defineEmits<{
    'update:mode': [DateRangeSelectMode],
  }>()

  const mode = computed({
    get() {
      return props.mode
    },
    set(mode) {
      emit('update:mode', mode)
    },
  })

  const options: (SelectOption & { value: DateRangeSelectMode })[] = [
    { label: 'Relative time', value: 'span' },
    { label: 'Around a time', value: 'around' },
    { label: 'Date Range', value: 'range' },
  ]
</script>

<style>
.p-date-range-select-options {
  min-width: 300px;
}
</style>