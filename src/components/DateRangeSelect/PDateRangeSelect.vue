<template>
  <PPopOver ref="popover" class="p-date-range-select" :placement="placement" auto-close>
    <template #target="{ open }">
      <PButton class="p-date-range-select__button" icon="ArrowSmallLeftIcon" :disabled="previousDisabled" @click="previous" />
      <PButton class="p-date-range-select__button p-date-range-select__input" @click="open">
        <div class="p-date-range-select__content">
          <PIcon icon="CalendarIcon" />
          <span class="p-date-range-select__label" :class="classes.label">
            {{ label }}
          </span>
          <PIcon icon="ChevronDownIcon" class="ml-auto" />
        </div>
      </PButton>

      <template v-if="modelValue">
        <PButton class="p-date-range-select__button" icon="XCircleIcon" @click="clear" />
      </template>
      <PButton class="p-date-range-select__button" icon="ArrowSmallRightIcon" :disabled="nextDisabled" @click="next" />
    </template>

    <template #default>
      <div class="p-date-range-select__picker" @click.stop>
        <template v-if="mode === 'relative'">
          <PDateRangeSelectOptions :model-value="span" v-bind="{ min, max }" @update:model-value="selectSpan" />
        </template>

        <template v-if="mode === 'range'">
          <PDateRangePicker
            v-model:start-date="startDate"
            v-model:end-date="endDate"
            v-bind="{ min, max }"
            show-time
            @close="close"
            @apply="selectRange"
          />
        </template>
      </div>
    </template>
  </PPopOver>
</template>

<script lang="ts" setup>
  import { addSeconds, differenceInSeconds, isAfter, isBefore } from 'date-fns'
  import { computed, ref, watch } from 'vue'
  import PButton from '@/components/Button/PButton.vue'
  import PDateRangePicker from '@/components/DateRangePicker/PDateRangePicker.vue'
  import PDateRangeSelectOptions, { DateRangeSelectOptionsValue } from '@/components/DateRangeSelect/PDateRangeSelectOptions.vue'
  import { getDateRangeLabel, getDateSpanLabel } from '@/components/DateRangeSelect/utilities'
  import PIcon from '@/components/Icon/PIcon.vue'
  import PPopOver from '@/components/PopOver/PPopOver.vue'
  import { bottomRight, topRight, bottomLeft, topLeft, rightInside, leftInside } from '@/utilities/position'

  export type DateRangeSelectSpanValue = { type: 'span', seconds: number }
  export type DateRangeSelectRangeValue = { type: 'range', startDate: Date, endDate: Date }
  export type DateRangeSelectValue = DateRangeSelectSpanValue | DateRangeSelectRangeValue | null | undefined

  const props = defineProps<{
    modelValue: DateRangeSelectValue,
    placeholder?: string,
    min?: Date,
    max?: Date,
  }>()

  const emit = defineEmits<{
    'update:modelValue': [DateRangeSelectValue],
  }>()

  const placement = [bottomRight, topRight, bottomLeft, topLeft, rightInside, leftInside]
  const popover = ref<InstanceType<typeof PPopOver>>()
  const mode = ref<'relative' | 'range'>('relative')

  const span = ref<number | null>(null)
  const startDate = ref<Date | null>(null)
  const endDate = ref<Date | null>(null)

  const modelValue = computed({
    get() {
      return props.modelValue
    },
    set(value) {
      emit('update:modelValue', value)
    },
  })

  const placeholder = computed(() => props.placeholder ?? 'Select a time span')

  const label = computed(() => {
    if (modelValue.value?.type === 'span') {
      return getDateSpanLabel(modelValue.value.seconds)
    }

    if (modelValue.value?.type === 'range') {
      return getDateRangeLabel(modelValue.value)
    }

    return placeholder.value
  })

  const classes = computed(() => ({
    label: {
      'p-date-range-select__label--placeholder': label.value === placeholder.value,
    },
  }))


  function selectSpan(value: DateRangeSelectOptionsValue): void {
    if (value === 'range') {
      mode.value = 'range'
      span.value = null
      return
    }

    span.value = value ?? null
    modelValue.value = value ? { type: 'span', seconds: value } : null

    close()
  }

  function selectRange(): void {
    if (startDate.value && endDate.value) {
      modelValue.value = { type: 'range', startDate: startDate.value, endDate: endDate.value }
      return
    }

    modelValue.value = null
  }

  function getIntervalInSeconds(): number {
    if (modelValue.value?.type === 'span') {
      return Math.abs(modelValue.value.seconds)
    }

    if (modelValue.value?.type === 'range') {
      const { startDate, endDate } = modelValue.value

      return Math.abs(differenceInSeconds(startDate, endDate))
    }

    return 0
  }

  const previousDisabled = computed<boolean>(() => {
    const seconds = getIntervalInSeconds()
    const { startDate } = getNewRange(seconds * -1) ?? {}

    if (!startDate || !seconds) {
      return true
    }

    if (!props.min) {
      return false
    }

    return isBefore(startDate, props.min)
  })

  function previous(): void {
    const seconds = getIntervalInSeconds()
    const range = getNewRange(seconds * -1)

    if (range) {
      const { startDate, endDate } = range
      emit('update:modelValue', { type: 'range', startDate, endDate })
    }
  }

  const nextDisabled = computed<boolean>(() => {
    const seconds = getIntervalInSeconds()
    const { endDate } = getNewRange(seconds) ?? {}

    if (!endDate || !seconds) {
      return true
    }

    if (!props.max) {
      return false
    }

    return isAfter(endDate, props.max)
  })

  function next(): void {
    const seconds = getIntervalInSeconds()
    const range = getNewRange(seconds)

    if (range) {
      const { startDate, endDate } = range
      emit('update:modelValue', { type: 'range', startDate, endDate })
    }
  }

  function getNewRange(seconds: number): { startDate: Date, endDate: Date } | null {
    if (modelValue.value?.type === 'span') {

      if (modelValue.value.seconds > 0) {
        const currentStartDate = new Date()
        const currentEndDate = addSeconds(currentStartDate, modelValue.value.seconds)
        const startDate = addSeconds(currentStartDate, seconds)
        const endDate = addSeconds(currentEndDate, seconds)

        return { startDate, endDate }
      }

      const currentEndDate = new Date()
      const currentStartDate = addSeconds(currentEndDate, modelValue.value.seconds)
      const startDate = addSeconds(currentStartDate, seconds)
      const endDate = addSeconds(currentEndDate, seconds)

      return { startDate, endDate }
    }

    if (modelValue.value?.type === 'range') {
      const startDate = addSeconds(modelValue.value.startDate, seconds)
      const endDate = addSeconds(modelValue.value.endDate, seconds)

      return { startDate, endDate }
    }

    return null
  }

  function close(): void {
    popover.value?.close()
  }

  function clear(): void {
    emit('update:modelValue', null)
  }

  watch(() => popover.value?.visible, (visible) => {
    if (!visible) {
      mode.value = 'relative'
    }
  })
</script>

<style>
.p-date-range-select { @apply
  w-full
  flex
  flex-nowrap
  items-center
}

.p-date-range-select__button { @apply
  rounded-none
  -ml-[1px]
}

.p-date-range-select__button:hover { @apply
  z-10
}

.p-date-range-select__button:first-child { @apply
  ml-0
  rounded-l-default
}

.p-date-range-select__button:last-child { @apply
  rounded-r-default
}

.p-date-range-select__input { @apply
  grow
}

.p-date-range-select__content { @apply
  w-full
  flex
  items-center
  gap-2
}

.p-date-range-select__label--placeholder { @apply
  text-subdued
}
</style>