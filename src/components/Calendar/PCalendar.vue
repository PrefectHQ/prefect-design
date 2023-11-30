<template>
  <p-content class="p-calendar" :class="`p-calendar--${mode}`">
    <PCalendarHeader v-model="viewingDate" v-model:mode="mode" v-bind="{ min, max }" />

    <div class="p-calendar__mode">
      <PCalendarDatePicker v-model="selected" :class="classes" v-bind="{ viewingDate, min, max }" @mode="mode = $event">
        <template #date="scope">
          <slot name="date" v-bind="scope" />
        </template>
      </PCalendarDatePicker>

      <div v-if="overlay" class="p-calendar__overlay">
        <template v-if="mode === 'year'">
          <PCalendarYearPicker v-model="viewingDate" v-bind="{ min, max }" @update:model-value="mode = 'date'" />
        </template>
        <template v-if="mode === 'month'">
          <PCalendarMonthPicker v-model="viewingDate" v-bind="{ min, max }" @update:model-value="mode = 'date'" />
        </template>
      </div>
    </div>
  </p-content>
</template>

<script lang="ts" setup>
  import { computed, ref } from 'vue'
  import PCalendarDatePicker from '@/components/Calendar/PCalendarDatePicker.vue'
  import PCalendarHeader from '@/components/Calendar/PCalendarHeader.vue'
  import PCalendarMonthPicker from '@/components/Calendar/PCalendarMonthPicker.vue'
  import PCalendarYearPicker from '@/components/Calendar/PCalendarYearPicker.vue'
  import { ClassValue } from '@/types'

  type DateParams = {
    date: Date,
    today: boolean,
  }

  type Classes = {
    date: (params: DateParams) => ClassValue,
    button: (params: DateParams) => ClassValue,
  }

  const props = defineProps<{
    modelValue?: Date | null | undefined,
    viewingDate?: Date | null | undefined,
    classes?: Classes,
    min?: Date | null | undefined,
    max?: Date | null | undefined,
  }>()

  const emit = defineEmits<{
    'update:modelValue': [value: Date | null | undefined],
    'update:viewingDate': [value: Date | null | undefined],
  }>()

  const mode = ref<'date' | 'month' | 'year'>('date')
  const overlay = computed(() => mode.value !== 'date')

  const fallbackViewingDate = ref(props.modelValue ?? new Date())

  const viewingDate = computed({
    get() {
      return props.viewingDate ?? fallbackViewingDate.value
    },
    set(value) {
      emit('update:viewingDate', value)

      fallbackViewingDate.value = value
    },
  })

  const selected = computed({
    get() {
      return props.modelValue
    },
    set(value) {
      emit('update:modelValue', value)
    },
  })
</script>

<style>
.p-calendar--year,
.p-calendar--month { @apply
  bg-floating
}

.p-calendar__mode { @apply
  relative
}

.p-calendar__overlay { @apply
  absolute
  top-0
  bottom-0
  left-0
  right-0
  bg-floating
  overflow-y-auto
}
</style>