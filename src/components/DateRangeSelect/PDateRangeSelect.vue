<template>
  <PPopOver ref="popover" class="p-date-range-select" :placement="placement" auto-close>
    <template #target="{ open }">
      <PButton class="p-date-range-select__button" icon="ArrowSmallLeftIcon" :disabled="previousDisabled" @click="previous" />
      <PButton class="p-date-range-select__button p-date-range-select__input" :disabled="disabled" @click="open">
        <div class="p-date-range-select__content">
          <PIcon icon="CalendarIcon" class="shrink-0" />
          <span class="p-date-range-select__label" :class="classes.label">
            {{ label }}
          </span>
          <PIcon icon="ChevronDownIcon" class="ml-auto shrink-0" />
        </div>
      </PButton>

      <template v-if="modelValue && clearable && !disabled">
        <PButton class="p-date-range-select__button" icon="XCircleIcon" @click="clear" />
      </template>
      <PButton class="p-date-range-select__button" icon="ArrowSmallRightIcon" :disabled="nextDisabled" @click="next" />
    </template>

    <template #default>
      <div class="p-date-range-select__picker" @click.stop>
        <template v-if="mode === 'relative'">
          <PDateRangeSelectOptions :model-value="span" v-bind="{ min, max, maxSpanInSeconds }" @update:model-value="selectSpan" />
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
  import { addDays, addSeconds, differenceInSeconds, isAfter, isBefore, secondsInDay, startOfMinute } from 'date-fns'
  import { computed, ref, watch } from 'vue'
  import PButton from '@/components/Button/PButton.vue'
  import PDateRangePicker from '@/components/DateRangePicker/PDateRangePicker.vue'
  import PDateRangeSelectOptions, { DateRangeSelectOptionsValue } from '@/components/DateRangeSelect/PDateRangeSelectOptions.vue'
  import { getDateRangeLabel, getDateSpanLabel, isFullDateRange } from '@/components/DateRangeSelect/utilities'
  import PIcon from '@/components/Icon/PIcon.vue'
  import PPopOver from '@/components/PopOver/PPopOver.vue'
  import { DateRangeSelectValue } from '@/types/dateRange'
  import { bottomRight, topRight, bottomLeft, topLeft, rightInside, leftInside } from '@/utilities/position'

  type DateRange = { startDate: Date, endDate: Date }

  const props = defineProps<{
    modelValue: DateRangeSelectValue,
    placeholder?: string,
    maxSpanInSeconds?: number,
    clearable?: boolean,
    disabled?: boolean,
    min?: Date,
    max?: Date,
  }>()

  const emit = defineEmits<{
    'update:modelValue': [DateRangeSelectValue],
  }>()

  const placement = [bottomLeft, topLeft, bottomRight, topRight, leftInside, rightInside]
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

    if (!startDate || !seconds || props.disabled) {
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

    if (!endDate || !seconds || props.disabled) {
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

  function getCurrentDateRange(): DateRange | null | undefined {
    if (modelValue.value?.type === 'span') {
      return getDateRangeForSpan(modelValue.value.seconds)
    }

    if (modelValue.value?.type === 'range') {
      return modelValue.value
    }

    return modelValue.value
  }

  function getDateRangeForSpan(seconds: number): DateRange {
    const now = startOfMinute(new Date())
    const timeSpanIsPast = seconds < 0
    const startDate = timeSpanIsPast ? addSeconds(now, seconds) : now
    const endDate = timeSpanIsPast ? now : addSeconds(now, seconds)

    return { startDate, endDate }
  }

  function getNewRange(seconds: number): DateRange | null {
    const range = getCurrentDateRange()

    if (!range) {
      return null
    }

    const { startDate: currentStartDate, endDate: currentEndDate } = range

    if (isFullDateRange(range)) {
      const differenceInDays = Math.ceil(Math.abs(seconds) / secondsInDay)
      const daysToAdd = seconds < 0 ? -differenceInDays : differenceInDays
      const startDate = addDays(currentStartDate, daysToAdd)
      const endDate = addDays(currentEndDate, daysToAdd)

      return { startDate, endDate }
    }

    const startDate = addSeconds(currentStartDate, seconds)
    const endDate = addSeconds(currentEndDate, seconds)

    return { startDate, endDate }
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
  shrink
  min-w-0
}

.p-date-range-select__content { @apply
  w-full
  flex
  items-center
  gap-2
  min-w-0
}

.p-date-range-select__label { @apply
  shrink
  min-w-0
  overflow-hidden
  whitespace-nowrap
}

.p-date-range-select__label--placeholder { @apply
  text-subdued
}
</style>