<template>
  <BaseInput class="p-native-date-input">
    <template v-for="(index, name) in $slots" #[name]="data">
      <slot :name="name" v-bind="data" />
    </template>
    <template #control="{ attrs }">
      <span class="p-native-date-input__icon">
        <PIcon icon="CalendarIcon" />
      </span>
      <input
        v-model="stringValue"
        type="date"
        class="p-native-date-input__control"
        :min="stringMin"
        :max="stringMax"
        v-bind="attrs"
      >
    </template>
  </BaseInput>
</template>

<script lang="ts" setup>
  import { format, parseISO } from 'date-fns'
  import { computed } from 'vue'
  import BaseInput from '@/components/BaseInput'
  import PIcon from '@/components/Icon'

  const props = defineProps<{
    modelValue: Date | null | undefined,
    min?: Date | null,
    max?: Date | null,
  }>()

  const emits = defineEmits<{
    (event: 'update:modelValue', value: Date | null): void,
  }>()

  const internalValue = computed(() => props.modelValue ?? null)

  const stringValue = computed({
    get() {
      return internalValue.value ? format(internalValue.value, 'yyyy-MM-dd') : null
    },
    set(value: string | null) {
      emits('update:modelValue', value ? parseISO(value) : null)
    },
  })

  const stringMin = computed(() => props.min ? format(props.min, 'yyyy-MM-dd') : undefined)
  const stringMax = computed(() => props.max ? format(props.max, 'yyyy-MM-dd') : undefined)
</script>

<style>
.p-native-date-input { @apply
  relative
  appearance-none
  bg-none
}

.p-native-date-input__icon { @apply
  absolute
  inset-y-0
  right-0
  pr-3
  flex
  items-center
  pointer-events-none
}

.p-native-date-input__icon svg { @apply
  w-4
  h-4
}

.p-native-date-input { @apply
  w-full
}

.p-native-date-input .p-native-date-input__control::-webkit-calendar-picker-indicator {
  background: none;
  -webkit-appearance: none;
}

.p-native-date-input .p-native-date-input__control { @apply
  block
  h-10
  w-full
  rounded-md
  border-0
  focus:ring-0
}
</style>
