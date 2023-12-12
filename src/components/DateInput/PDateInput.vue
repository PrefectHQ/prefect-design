<template>
  <PInputPopOver class="p-date-input">
    <template #input="{ open, visible }">
      <slot v-bind="{ open, visible }">
        <template v-if="media.hover">
          <PDateButton
            :date="internalModelValue"
            :class="getControlClass(visible)"
            v-bind="{ showTime, disabled, clearable }"
            @click="open"
            @clear="clear"
          />
        </template>
        <template v-else>
          <PNativeDateInput v-model="internalModelValue" v-bind="{ min, max, disabled }" />
        </template>
      </slot>
    </template>

    <template #default="{ close }">
      <PDatePicker
        v-model="internalModelValue"
        v-model:viewing-date="internalViewingDate"
        v-bind="{ min, max, showTime }"
        @close="close"
      >
        <template v-for="(index, name) in $slots" #[name]="data">
          <slot :name="name" v-bind="data" />
        </template>
      </PDatePicker>
    </template>
  </PInputPopOver>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import PDateButton from '@/components/DateInput/PDateButton.vue'
  import PInputPopOver from '@/components/DateInput/PInputPopOver.vue'
  import PDatePicker from '@/components/DatePicker/PDatePicker.vue'
  import PNativeDateInput from '@/components/NativeDateInput/PNativeDateInput.vue'
  import { ClassValue } from '@/types'
  import { keepDateInRange } from '@/utilities/dates'
  import { media } from '@/utilities/media'

  const props = defineProps<{
    modelValue: Date | null | undefined,
    viewingDate?: Date,
    showTime?: boolean,
    clearable?: boolean,
    disabled?: boolean,
    min?: Date | null | undefined,
    max?: Date | null | undefined,
  }>()

  const emit = defineEmits<{
    (event: 'update:modelValue', value: Date | null): void,
    (event: 'update:viewingDate', value: Date | undefined): void,
  }>()

  const internalModelValue = computed({
    get() {
      return props.modelValue ?? null
    },
    set(value) {
      emit('update:modelValue', keepDateInRange(value, { min: props.min, max: props.max }))
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

  function clear(): void {
    emit('update:modelValue', null)
  }
</script>

<style>
.p-date-input--open { @apply
  ring-spacing-focus-ring
  ring-focus-ring
  ring-offset-focus-ring
  ring-offset-focus-ring-offset;
  background-color: var(--p-color-input-bg-focus);
  border-color: var(--p-color-input-border-focus);
}
</style>