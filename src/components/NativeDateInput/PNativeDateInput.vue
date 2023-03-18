<template>
  <PBaseInput class="p-native-date-input">
    <template v-for="(index, name) in $slots" #[name]="data">
      <slot :name="name" v-bind="data" />
    </template>
    <template #control="{ attrs }">
      <template v-if="dateMode">
        <input
          ref="inputElement"
          v-model="stringValue"
          type="date"
          class="p-native-date-input__control"
          :min="stringMin"
          :max="stringMax"
          v-bind="attrs"
        >
        <input
          ref="inputElement"
          v-model="stringValue"
          type="date"
          class="p-native-date-input__control p-native-date-input__control--placeholder"
          :min="stringMin"
          :max="stringMax"
          v-bind="attrs"
        >
      </template>

      <template v-else>
        <div class="p-native-date-input__time-pickers">
          <p-native-select v-model="selectedHours" class="p-native-date-input__picker" :options="hourOptions" />
          <p-native-select v-model="selectedMinutes" class="p-native-date-input__picker" :options="minuteOptions" />
          <p-native-select v-model="selectedMeridiem" class="p-native-date-input__picker" :options="meridiemOptions" />
        </div>
      </template>

      <template v-if="showTime">
        <p-button
          class="p-native-date-input__mode-toggle"
          size-sm
          rounded
          flat
          icon="ClockIcon"
          @click="dateMode = !dateMode"
        />
      </template>
    </template>

    <template #append>
      <div class="p-native-date-input__icon">
        <PIcon icon="CalendarIcon" />
      </div>
    </template>
  </PBaseInput>
</template>

<script lang="ts" setup>
  import { format, parseISO, startOfMinute } from 'date-fns'
  import { computed, ref } from 'vue'
  import PBaseInput from '@/components/BaseInput/PBaseInput.vue'
  import PIcon from '@/components/Icon/PIcon.vue'
  import { useTimeParts } from '@/compositions/useTimeParts'
  import { keepDateInRange } from '@/utilities/dates'

  const props = defineProps<{
    modelValue: Date | null | undefined,
    min?: Date | null,
    max?: Date | null,
    showTime?: boolean,
  }>()

  const emit = defineEmits<{
    (event: 'update:modelValue', value: Date | null): void,
  }>()

  const dateMode = ref(true)
  const internalValue = computed(() => props.modelValue ?? null)
  const inputElement = ref<HTMLInputElement>()
  const el = computed(() => inputElement.value)

  defineExpose({ inputElement, el })

  const stringValue = computed({
    get() {
      return internalValue.value ? format(internalValue.value, 'yyyy-MM-dd') : null
    },
    set(value) {
      emit('update:modelValue', value ? parseISO(value) : null)
    },
  })

  const stringMin = computed(() => props.min ? format(props.min, 'yyyy-MM-dd') : undefined)
  const stringMax = computed(() => props.max ? format(props.max, 'yyyy-MM-dd') : undefined)

  const selectedDate = computed({
    get() {
      return props.modelValue ?? startOfMinute(new Date())
    },
    set(value) {
      const withoutSeconds = startOfMinute(value)

      emit('update:modelValue', keepDateInRange(withoutSeconds, range.value))
    },
  })

  const range = computed(() => ({ min: props.min, max: props.max }))

  const {
    selectedHours,
    selectedMinutes,
    selectedMeridiem,
    hourOptions,
    minuteOptions,
    meridiemOptions,
  } = useTimeParts(selectedDate, range)
</script>

<style>
.p-native-date-input { @apply
  relative
  appearance-none
  bg-none
}

.p-native-date-input__icon { @apply
  pr-3
  flex
  items-center
  z-10
  pointer-events-none
}

.p-native-date-input__icon .p-icon { @apply
  w-4
  h-4
}

.p-native-date-input__control { @apply
  bg-transparent
  absolute
  top-0
  bottom-0
  left-0
  right-0
  w-full
  rounded-md
  border-0
  focus:ring-0
}

.p-native-date-input__control:disabled { @apply
  cursor-not-allowed
}

.p-native-date-input__control--placeholder { @apply
  relative
  invisible
  w-full
}

.p-native-date-input .p-native-date-input__control::-webkit-calendar-picker-indicator {
  background: none;
}

.p-native-date-input .p-native-date-input__control--placeholder::-webkit-calendar-picker-indicator {
  display: none;
  -webkit-appearance: none;
}

.p-native-date-input__mode-toggle { @apply
  !p-0
  mr-2
}

.p-native-date-input__time-pickers { @apply
  flex
  flex-grow
  justify-around
}

.p-native-date-input__picker { @apply
  w-min
  border-0
  !ring-0
}
</style>
