<template>
  <div class="p-date-input">
    <span class="p-date-input__icon">
      <p-icon icon="CalendarIcon" />
    </span>
    <input
      v-model="stringValue"
      type="date"
      class="p-date-input__control"
      :min="stringMin"
      :max="stringMax"
      v-bind="$attrs"
    >
  </div>
</template>

<script lang="ts">
  import { defineComponent, computed } from 'vue'

  export default defineComponent({
    name: 'PNativeDateInput',
    expose: [],
    inheritAttrs: false,
  })
</script>

<script lang="ts" setup>
  import PIcon from '@/components/Icon'
  import { useAdjustedDate, useBrowserDate } from '@/compositions/UseAdjustedDates'

  const props = defineProps<{
    modelValue: Date | null | undefined,
    min?: Date,
    max?: Date,
  }>()

  const emits = defineEmits<{
    (event: 'update:modelValue', value: Date | null): void,
  }>()

  const internalValue = computed(() => props.modelValue ?? null)

  const stringValue = computed({
    get() {
      const adjustedValue = useAdjustedDate(internalValue)

      return adjustedValue.value ? getStringValue(adjustedValue.value) : null
    },
    set(value: string | null) {
      emits('update:modelValue', value ? useBrowserDate(new Date(value)) : null)
    },
  })

  const stringMin = computed(() => props.min ? getStringValue(useAdjustedDate(props.min)) : undefined)
  const stringMax = computed(() => props.max ? getStringValue(useAdjustedDate(props.max)) : undefined)

  function getStringValue(date: Date): string {
    const parts = [
      String(date.getUTCFullYear()).padStart(4, '0'),
      String(date.getUTCMonth() + 1).padStart(2, '0'),
      String(date.getUTCDate()).padStart(2, '0'),
    ]

    return parts.join('-')
  }
</script>

<style>
.p-date-input { @apply
  relative
  border
  border-gray-300
  focus-within:outline-none
  focus-within:ring-1
  focus-within:ring-prefect-500
  focus-within:border-prefect-500
  focus-within:border-prefect-500
  rounded-md
  appearance-none
  bg-none
}

.p-date-input__icon { @apply
  absolute
  inset-y-0
  right-0
  pr-3
  flex
  items-center
  pointer-events-none
}

.p-date-input__icon svg { @apply
  w-4
  h-4
}

.p-date-input { @apply
  w-full
}

.p-date-input .p-date-input__control::-webkit-inner-spin-button,
.p-date-input .p-date-input__control::-webkit-calendar-picker-indicator {
    background: none;
    -webkit-appearance: none;
}

.p-date-input .p-date-input__control { @apply
  block
  h-10
  w-full
  rounded-md
  border-0
  focus:ring-0
}
</style>
