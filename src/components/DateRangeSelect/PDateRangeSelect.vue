<template>
  <PPopOver ref="popover" class="p-date-range-select" :placement="placement" auto-close>
    <template #target="{ open }">
      <PButton class="p-date-range-select__button" icon="ArrowSmallLeftIcon" :disabled="previousDisabled" :size="size" @click="previous" />
      <PButton class="p-date-range-select__button  p-date-range-select__input" :class="button({ size })" :disabled="disabled" :size="size" @click="open">
        <div class="p-date-range-select__content">
          <PIcon icon="CalendarIcon" class="shrink-0" :size />
          <span class="p-date-range-select__label" :class="classes.label">
            {{ label }}
          </span>
          <PIcon icon="ChevronDownIcon" class="ml-auto shrink-0" :size />
        </div>
      </PButton>

      <template v-if="modelValue && clearable && !disabled">
        <PButton class="p-date-range-select__button p-date-range-select__button--clear" icon="XCircleIcon" :size="size" @click="clear" />
      </template>
      <PButton class="p-date-range-select__button" icon="ArrowSmallRightIcon" :disabled="nextDisabled" :size="size" @click="next" />
    </template>

    <template #default>
      <div class="p-date-range-select__picker" @click.stop>
        <template v-if="mode === null">
          <PDateRangeSelectOptions v-model:mode="mode" :style="styles.options" @apply="apply" />
        </template>

        <template v-if="mode === 'span'">
          <PDateRangeSelectRelative :style="styles.options" v-bind="{ maxSpanInSeconds, min, max }" @close="close" @apply="apply" />
        </template>

        <template v-if="mode === 'around'">
          <PDateRangeSelectAround v-bind="{ maxSpanInSeconds, min, max }" @close="close" @apply="apply" />
        </template>

        <template v-if="mode === 'range'">
          <PDateRangeSelectRange v-bind="{ maxSpanInSeconds, min, max }" @close="close" @apply="apply" />
        </template>
      </div>
    </template>
  </PPopOver>
</template>

<script lang="ts" setup>
  import { useElementRect, useKeyDown } from '@prefecthq/vue-compositions'
  import { cva, type VariantProps } from 'class-variance-authority'
  import { addDays, addSeconds, isAfter, isBefore } from 'date-fns'
  import { secondsInDay } from 'date-fns/constants'
  import { computed, ref, watch } from 'vue'
  import PButton from '@/components/Button/PButton.vue'
  import PDateRangeSelectAround from '@/components/DateRangeSelect/PDateRangeSelectAround.vue'
  import PDateRangeSelectOptions from '@/components/DateRangeSelect/PDateRangeSelectOptions.vue'
  import PDateRangeSelectRange from '@/components/DateRangeSelect/PDateRangeSelectRange.vue'
  import PDateRangeSelectRelative from '@/components/DateRangeSelect/PDateRangeSelectRelative.vue'
  import { getDateRangeSelectValueLabel, isFullDateRange } from '@/components/DateRangeSelect/utilities'
  import PIcon from '@/components/Icon/PIcon.vue'
  import PPopOver from '@/components/PopOver/PPopOver.vue'
  import { DateRangeSelectValue } from '@/types/dateRange'
  import { toPixels } from '@/utilities'
  import { mapDateRangeSelectValueToDateRange } from '@/utilities/dateRangeSelect'
  import { bottomRight, topRight, bottomLeft, topLeft, rightInside, leftInside } from '@/utilities/position'

  const button = cva(
    '',
    {
      variants: {
        size: {
          default: 'h-10',
          sm: 'h-[30px]',
        },
      },
    })

  type ButtonProps = VariantProps<typeof button>

  type DateRange = { startDate: Date, endDate: Date }

  export type DateRangeSelectMode = 'span' | 'range' | 'around' | null

  const props = withDefaults(defineProps<{
    modelValue: DateRangeSelectValue,
    placeholder?: string,
    maxSpanInSeconds?: number,
    clearable?: boolean,
    disabled?: boolean,
    min?: Date,
    max?: Date,
    size?: ButtonProps['size'],
  }>(), {
    min: undefined,
    max: undefined,
    placeholder: undefined,
    maxSpanInSeconds: undefined,
    size: 'default',
  })

  const emit = defineEmits<{
    'update:modelValue': [DateRangeSelectValue],
  }>()

  useKeyDown('Escape', () => {
    popover.value?.close()
  })

  const placement = [bottomLeft, topLeft, bottomRight, topRight, leftInside, rightInside]

  const popover = ref<InstanceType<typeof PPopOver>>()
  const target = computed(() => popover.value?.target)
  const { width } = useElementRect(target)
  const mode = ref<DateRangeSelectMode>(null)

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
    return getDateRangeSelectValueLabel(modelValue.value) ?? placeholder.value
  })

  const classes = computed(() => ({
    label: {
      'p-date-range-select__label--placeholder': label.value === placeholder.value,
    },
  }))

  const styles = computed(() => ({
    options: {
      width: toPixels(width.value),
    },
  }))

  function apply(value: DateRangeSelectValue): void {
    modelValue.value = value
    close()
  }

  function getIntervalInSeconds(): number {
    const range = mapDateRangeSelectValueToDateRange(modelValue.value)

    return range?.timeSpanInSeconds ?? 0
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

  function getNewRange(seconds: number): DateRange | null {
    const range = mapDateRangeSelectValueToDateRange(modelValue.value)

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
      mode.value = null
    }
  })
</script>

<style>
.p-date-range-select { @apply
  flex
  flex-nowrap
  items-center
  rounded-none
}

.p-date-range-select__button { @apply
  -ml-[1px];

  border-color: var(--p-color-input-border) !important;
  background-color: var(--p-color-input-bg) !important;
  color: var(--p-color-input-text) !important;
}

.p-date-range-select__button--clear { @apply
  rounded-none
}

.p-date-range-select__button:hover { @apply
  z-50
}

.p-date-range-select__button:first-child { @apply
  ml-0
  rounded-r-none
}

.p-date-range-select__button:last-child { @apply
  rounded-l-none
}

.p-date-range-select__content { @apply
  w-full
  flex
  items-center
  gap-2
  min-w-0
}

.p-date-range-select__input { @apply
  grow
  shrink
  min-w-0
  rounded-none
  overflow-hidden
}

.p-date-range-select__input .p-button__content { @apply
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
  whitespace-nowrap
  truncate
}

.p-date-range-select__label--placeholder { @apply
  text-subdued
}
</style>