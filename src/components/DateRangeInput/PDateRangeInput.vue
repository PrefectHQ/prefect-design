<template>
  <PInputPopOver class="p-date-input">
    <template #input="{ open, visible }">
      <slot v-bind="{ open, visible }">
        <PDateButton
          :date="startDate ?? endDate"
          :class="getControlClass(visible)"
          v-bind="{ showTime, disabled, clearable }"
          @click="open"
          @clear="clear"
        >
          <div class="p-date-range-input__target">
            {{ displayValue }}
          </div>
        </PDateButton>
      </slot>
    </template>

    <template #default="{ close }">
      <PDateRangePicker
        v-model:start-date="internalStartDate"
        v-model:end-date="internalEndDate"
        v-model:viewing-date="internalViewingDate"
        v-bind="{ min, max, showTime }"
        @close="close"
      >
        <template v-for="(index, name) in $slots" #[name]="data">
          <slot :name="name" v-bind="data" />
        </template>
      </PDateRangePicker>
    </template>
  </PInputPopOver>
</template>

<script lang="ts" setup>
  import { format, startOfDay, endOfDay } from 'date-fns'
  import { computed } from 'vue'
  import PDateButton from '@/components/DateInput/PDateButton.vue'
  import PInputPopOver from '@/components/DateInput/PInputPopOver.vue'
  import PDateRangePicker from '@/components/DateRangePicker/PDateRangePicker.vue'
  import { ClassValue } from '@/types'

  const props = defineProps<{
    startDate: Date | null | undefined,
    endDate: Date | null | undefined,
    viewingDate?: Date,
    showTime?: boolean,
    clearable?: boolean,
    disabled?: boolean,
    min?: Date | null | undefined,
    max?: Date | null | undefined,
  }>()

  const emit = defineEmits<{
    (event: 'update:startDate' | 'update:endDate', value: Date | null | undefined): void,
    (event: 'update:viewingDate', value: Date | undefined): void,
  }>()

  const dateFormat = 'MMM do, yyyy'

  const displayValue = computed(() => {
    if (props.startDate && props.endDate) {
      return `${format(props.startDate, dateFormat)} - ${format(props.endDate, dateFormat)}`
    }

    return 'Select dates'
  })

  const internalStartDate = computed({
    get() {
      return props.startDate
    },
    set(value) {
      emit('update:startDate', value)
    },
  })

  const internalEndDate = computed({
    get() {
      return props.endDate
    },
    set(value) {
      emit('update:endDate', value)
    },
  })

  const internalViewingDate = computed({
    get() {
      return props.viewingDate
    },
    set(value) {
      emit('update:viewingDate', value)
    },
  })

  function getControlClass(open: boolean): ClassValue {
    return {
      'p-date-input--open': open,
    }
  }

  function setStartDate(value: Date | null): void {
    internalStartDate.value = value ? startOfDay(value) : value
  }

  function setEndDate(value: Date | null): void {
    internalEndDate.value = value ? endOfDay(value) : value
  }

  function clear(): void {
    setStartDate(null)
    setEndDate(null)
    emit('update:startDate', null)
    emit('update:endDate', null)
  }
</script>

<style>
.p-date-range-input__trigger--open { @apply
  ring-spacing-focus-ring
  ring-focus-ring
  ring-offset-focus-ring
  ring-offset-focus-ring-offset;
  background-color: var(--p-color-input-bg-focus);
  border-color: var(--p-color-input-border-focus);
}
</style>