<template>
  <PPopOver ref="popover" class="p-date-range-select" :placement="placement" auto-close>
    <template #target="{ open }">
      <PButton class="p-date-range-select__button" icon="ArrowSmallLeftIcon" />
      <PButton class="p-date-range-select__button p-date-range-select__input" @click="open">
        <div class="p-date-range-select__content">
          <PIcon icon="CalendarIcon" />
          {{ label }}
          <PIcon icon="ChevronDownIcon" class="ml-auto" />
        </div>
      </PButton>

      <template v-if="modelValue">
        <PButton class="p-date-range-select__button" icon="XCircleIcon" />
      </template>
      <PButton class="p-date-range-select__button" icon="ArrowSmallRightIcon" />
    </template>

    <template #default>
      <PDateRangeSelectOptions v-show="mode === 'relative'" :model-value="span" @update:model-value="selectSpan" />

      <template v-if="mode === 'range'">
        <PDateRangePicker v-model:start-date="startDate" v-model:end-date="endDate" v-bind="{ min, max }" @close="close" @apply="selectRange" />
      </template>
    </template>
  </PPopOver>
</template>

<script lang="ts" setup>
  import { addSeconds, format, intervalToDuration } from 'date-fns'
  import { computed, ref, watch } from 'vue'
  import PButton from '@/components/Button/PButton.vue'
  import PDateRangePicker from '@/components/DateRangePicker/PDateRangePicker.vue'
  import PDateRangeSelectOptions, { DateRangeSelectOptionsValue } from '@/components/DateRangeSelect/PDateRangeSelectOptions.vue'
  import PIcon from '@/components/Icon/PIcon.vue'
  import PPopOver from '@/components/PopOver/PPopOver.vue'
  import { bottomRight, topRight, bottomLeft, topLeft, rightInside, leftInside } from '@/utilities/position'

  export type DateRangeSelectValue = number | [Date, Date] | null | undefined

  const props = defineProps<{
    modelValue: DateRangeSelectValue,
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
  const dateFormat = 'MMM do, yyyy'

  const modelValue = computed({
    get() {
      return props.modelValue
    },
    set(value) {
      emit('update:modelValue', value)
    },
  })

  const label = computed(() => {
    if (typeof modelValue.value === 'number') {
      const duration = intervalToDuration({
        start: new Date(),
        end: addSeconds(new Date(), modelValue.value),
      })

      return `Past ${JSON.stringify(duration)}`
    }

    if (Array.isArray(modelValue.value)) {
      const [startDate, endDate] = modelValue.value

      return `${format(startDate, dateFormat)} - ${format(endDate, dateFormat)}`
    }

    return 'select'
  })


  function selectSpan(value: DateRangeSelectOptionsValue): void {
    if (value === 'range') {
      mode.value = 'range'
      span.value = null
      return
    }

    span.value = value ?? null
    modelValue.value = span.value

    close()
  }

  function selectRange(): void {
    if (startDate.value && endDate.value) {
      modelValue.value = [startDate.value, endDate.value]
      return
    }

    modelValue.value = null
  }

  function close(): void {
    popover.value?.close()
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
</style>