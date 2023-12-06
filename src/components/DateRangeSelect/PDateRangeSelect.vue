<template>
  <PPopOver ref="popover" class="p-date-range-select" auto-close>
    <template #target="{ toggle }">
      <PButton class="p-date-range-select__button" icon="ArrowSmallLeftIcon" />
      <PButton class="p-date-range-select__button p-date-range-select__input" icon="CalendarIcon" icon-append="ChevronDownIcon" @click="toggle">
        Past 8h
      </PButton>

      <template v-if="modelValue">
        <PButton class="p-date-range-select__button" icon="XCircleIcon" />
      </template>
      <PButton class="p-date-range-select__button" icon="ArrowSmallRightIcon" />
    </template>

    <template #default>
      <PDateRangeSelectOptions v-show="mode === 'relative'" v-model="option" @update:model-value="selectOption" />

      <template v-if="mode === 'range'">
        hello
      </template>
    </template>
  </PPopOver>
</template>

<script lang="ts" setup>
  import { computed, ref, watch } from 'vue'
  import PButton from '@/components/Button/PButton.vue'
  import PDateRangeSelectOptions, { DateRangeSelectOptionsValue } from '@/components/DateRangeSelect/PDateRangeSelectOptions.vue'
  import PPopOver from '@/components/PopOver/PPopOver.vue'

  export type DateRangeSelectValue = number | [Date, Date] | null | undefined

  const props = defineProps<{
    modelValue: DateRangeSelectValue,
    min?: Date,
    max?: Date,
  }>()

  const emit = defineEmits<{
    'update:modelValue': [DateRangeSelectValue],
  }>()

  const popover = ref<InstanceType<typeof PPopOver>>()
  const mode = ref<'relative' | 'range'>('relative')
  const option = ref()

  const value = computed({
    get() {
      return props.modelValue
    },
    set(value) {
      emit('update:modelValue', value)
    },
  })

  function selectOption(value: DateRangeSelectOptionsValue): void {
    if (value === 'range') {
      mode.value = 'range'
      return
    }

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
</style>