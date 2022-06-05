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

    <template #append>
      <div class="p-native-date-input__icon">
        <PIcon icon="CalendarIcon" />
      </div>
    </template>
  </PBaseInput>
</template>

<script lang="ts" setup>
  import { format, parseISO } from 'date-fns'
  import { computed, ref } from 'vue'
  import PBaseInput from '@/components/BaseInput/PBaseInput.vue'
  import PIcon from '@/components/Icon/PIcon.vue'

  const props = defineProps<{
    modelValue: Date | null | undefined,
    min?: Date | null,
    max?: Date | null,
  }>()

  const emits = defineEmits<{
    (event: 'update:modelValue', value: Date | null): void,
  }>()

  const internalValue = computed(() => props.modelValue ?? null)
  const inputElement = ref<HTMLInputElement>()
  const el = computed(() => inputElement.value)

  defineExpose({ inputElement, el })

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
</style>
