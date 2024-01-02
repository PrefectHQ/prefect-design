<template>
  <div class="p-date-range-duration-input">
    <PNumberInput v-model="quantity" prepend="±" />
    <PNativeSelect v-model="unit" :options="units" />
  </div>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import PNativeSelect from '@/components/NativeSelect/PNativeSelect.vue'
  import { PNumberInput } from '@/components/NumberInput'
  import { DateRangeSelectAroundUnit } from '@/types/dateRange'
  import { SelectOption } from '@/types/selectOption'

  const props = defineProps<{
    quantity: number,
    unit: DateRangeSelectAroundUnit,
  }>()

  const emit = defineEmits<{
    (event: 'update:quantity', value: number): void,
    (event: 'update:unit', value: DateRangeSelectAroundUnit): void,
  }>()

  const units: (SelectOption & { value: DateRangeSelectAroundUnit })[] = [
    { label: 'Seconds', value: 'second' },
    { label: 'Minutes', value: 'minute' },
    { label: 'Hours', value: 'hour' },
    { label: 'Days', value: 'day' },
  ]

  const quantity = computed({
    get() {
      return props.quantity
    },
    set(value) {
      emit('update:quantity', value)
    },
  })

  const unit = computed({
    get() {
      return props.unit
    },
    set(value) {
      emit('update:unit', value)
    },
  })
</script>

<style>
.p-date-range-duration-input { @apply
  w-full
  grid
  gap-2;
  max-width: 322px;
  grid-template-columns: 1fr 8rem;
}

.p-date-range-duration-input .p-base-input__prepend { @apply
  font-mono
}
</style>