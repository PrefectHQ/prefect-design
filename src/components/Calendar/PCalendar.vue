<template>
  <p-content class="p-calendar" :class="`p-calendar--${mode}`">
    <PCalendarHeader v-model="selected" v-model:mode="mode" v-bind="{ min, max }" />

    <div class="p-calendar__mode">
      <PCalendarDatePicker v-model="selected" :class="classes" v-bind="{ min, max }" @mode="mode = $event" />

      <div v-if="overlay" class="p-calendar__overlay">
        <template v-if="mode === 'year'">
          <PCalendarYearPicker v-model="selected" v-bind="{ min, max }" @update:model-value="mode = 'date'" />
        </template>
        <template v-if="mode === 'month'">
          <PCalendarMonthPicker v-model="selected" v-bind="{ min, max }" @update:model-value="mode = 'date'" />
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
    classes?: Classes,
    min?: Date | null | undefined,
    max?: Date | null | undefined,
  }>()

  const emit = defineEmits<{
    'update:modelValue': [value: Date],
  }>()

  const mode = ref<'date' | 'month' | 'year'>('date')
  const overlay = computed(() => mode.value !== 'date')

  const fallbackSelected = ref(new Date())

  const selected = computed({
    get() {
      return props.modelValue ?? fallbackSelected.value
    },
    set(value) {
      emit('update:modelValue', value)

      fallbackSelected.value = value
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