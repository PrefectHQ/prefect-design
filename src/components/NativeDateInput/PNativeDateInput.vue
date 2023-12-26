<template>
  <PBaseInput class="p-native-date-input">
    <template v-for="(index, name) in $slots" #[name]="data">
      <slot :name="name" v-bind="data" />
    </template>

    <template #control="{ attrs }">
      <input
        ref="inputElement"
        v-model="stringValue"
        type="date"
        class="p-native-date-input__control"
        :min="stringMin"
        :max="stringMax"
        v-bind="attrs"
      >
    </template>

    <template v-if="!disablePicker" #append>
      <PButton icon="CalendarIcon" small flat class="p-native-date-input__picker" @click="showPicker" />
    </template>
  </PBaseInput>
</template>

<script lang="ts" setup>
  import { format, parseISO } from 'date-fns'
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
      return props.modelValue ? format(props.modelValue, 'yyyy-MM-dd') : null
    },
    set(value) {
      if (!value) {
        emit('update:modelValue', null)
        return
      }

      const parsed = parseISO(value)

      if (props.modelValue) {
        parsed.setHours(props.modelValue.getHours())
        parsed.setMinutes(props.modelValue.getMinutes())
      }

      emit('update:modelValue', parsed)
    },
  })

  const stringMin = computed(() => props.min ? format(props.min, 'yyyy-MM-dd') : undefined)
  const stringMax = computed(() => {
    if (props.max) {
      return format(props.max, 'yyyy-MM-dd')
    }

    // max date with a 4 digit year
    return '2999-12-31'
  })

  function showPicker(): void {
    inputElement.value?.showPicker()
  }
</script>

<style>
.p-native-date-input__control { @apply
  bg-transparent
  block
  w-full
  rounded-default
  border-0
  focus:ring-0
}

.p-native-date-input__control::-webkit-calendar-picker-indicator {
  display: none;
  -webkit-appearance: none;
}

.p-native-date-input__control:disabled { @apply
  cursor-not-allowed
}

.p-native-date-input__picker { @apply
  mr-2
}
</style>
