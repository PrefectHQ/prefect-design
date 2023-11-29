<template>
  <PBaseInput class="p-native-time-input">
    <template v-for="(index, name) in $slots" #[name]="data">
      <slot :name="name" v-bind="data" />
    </template>

    <template #control="{ attrs }">
      <input
        ref="inputElement"
        v-model="stringValue"
        type="time"
        class="p-native-time-input__control"
        :min="stringMin"
        :max="stringMax"
        v-bind="attrs"
      >
    </template>

    <template v-if="!disablePicker" #append>
      <PButton icon="ClockIcon" small flat class="p-native-time-input__picker" @click="showPicker" />
    </template>
  </PBaseInput>
</template>

<script lang="ts" setup>
  import { format, parse } from 'date-fns'
  import { computed, readonly, ref } from 'vue'
  import PBaseInput from '@/components/BaseInput/PBaseInput.vue'

  const props = defineProps<{
    modelValue: Date | null | undefined,
    min?: Date | null,
    max?: Date | null,
    disablePicker?: boolean,
  }>()

  const emit = defineEmits<{
    (event: 'update:modelValue', value: Date | null): void,
  }>()

  const inputElement = ref<HTMLInputElement>()

  defineExpose({ el: readonly(inputElement) })

  const stringValue = computed({
    get() {
      return props.modelValue ? format(props.modelValue, 'HH:mm') : null
    },
    set(value) {
      if (!value) {
        emit('update:modelValue', null)
        return
      }

      const reference = props.modelValue ?? new Date()
      const parsed = parse(value, 'H:mm', reference)

      emit('update:modelValue', parsed)
    },
  })

  const stringMin = computed(() => props.min ? format(props.min, 'yyyy-MM-dd') : undefined)
  const stringMax = computed(() => props.max ? format(props.max, 'yyyy-MM-dd') : undefined)

  function showPicker(): void {
    inputElement.value?.showPicker()
  }
</script>

<style>
.p-native-time-input__control { @apply
  bg-transparent
  block
  w-full
  rounded-default
  border-0
  focus:ring-0
}

.p-native-time-input__control::-webkit-calendar-picker-indicator {
  display: none;
  -webkit-appearance: none;
}

.p-native-time-input__control:disabled { @apply
  cursor-not-allowed
}

.p-native-time-input__picker { @apply
  mr-2
}
</style>
