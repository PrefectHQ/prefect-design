<template>
  <PContent class="p-date-picker" secondary>
    <PCalendar v-model="selected" v-model:viewingDate="viewingDate" v-bind="{ min, max }">
      <template #date="scope">
        <slot name="date" v-bind="scope" />
      </template>
    </PCalendar>

    <PContent class="p-date-picker__controls">
      <slot name="controls">
        <PDateTimeInputGroup v-model="selected" v-bind="{ showTime }" label="Selected Date" />
      </slot>
      <slot name="after-controls" />
    </PContent>

    <div class="p-date-picker__footer">
      <PButton small @click="close">
        Cancel
      </PButton>
      <PButton small primary @click="apply">
        Apply
      </PButton>
    </div>
  </PContent>
</template>

<script lang="ts" setup>
  import { computed, ref } from 'vue'
  import PButton from '@/components/Button/PButton.vue'
  import PCalendar from '@/components/Calendar/PCalendar.vue'
  import PContent from '@/components/Content/PContent.vue'
  import PDateTimeInputGroup from '@/components/DateTimeInputGroup/PDateTimeInputGroup.vue'
  import { keepDateInRange } from '@/utilities/dates'

  const props = defineProps<{
    modelValue: Date | null | undefined,
    viewingDate?: Date | null | undefined,
    showTime?: boolean,
    min?: Date | null | undefined,
    max?: Date | null | undefined,
  }>()

  const emit = defineEmits<{
    'update:modelValue': [value: Date | null | undefined],
    'update:viewingDate': [value: Date | null | undefined],
    'apply': [],
    'close': [],
  }>()

  const range = computed(() => ({ min: props.min, max: props.max }))
  const selected = ref(props.modelValue)
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

  function apply(): void {
    const value = selected.value ? keepDateInRange(selected.value, range.value) : null

    emit('update:modelValue', value)
    emit('apply')
    close()
  }

  function close(): void {
    emit('close')
  }
</script>

<style>
.p-date-picker { @apply
  bg-floating
  my-1
  rounded-default
  shadow-lg
  flex
  flex-col
  p-2
  select-none
  min-w-[20rem]
}

.p-date-picker__controls { @apply
  border-y-[1px]
  border-y-divider
  -mx-2
  px-2
  py-3
}

.p-date-picker__footer { @apply
  flex
  gap-2
  items-center
  justify-end
}
</style>
