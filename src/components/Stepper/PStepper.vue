<template>
  <p-number-input v-model="internalValue" class="p-stepper" :disabled="disabled">
    <template #prepend>
      <p-button
        class="p-stepper__step p-stepper__step--down"
        flat
        small
        icon="MinusIcon"
        :disabled="disabled || !canDecrease"
        @click="internalValue -= step"
      />
    </template>
    <template #append>
      <p-button
        class="p-stepper__step p-stepper__step--up"
        flat
        small
        icon="PlusIcon"
        :disabled="disabled || !canIncrease"
        @click="internalValue += step"
      />
    </template>
  </p-number-input>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import PButton from '@/components/Button/PButton.vue'

  const props = withDefaults(defineProps<{
    modelValue: number | null | undefined,
    disabled?: boolean,
    min?: number | null,
    max?: number | null,
    step?: number,
  }>(), {
    min: null,
    max: null,
    step: 1,
  })

  const emits = defineEmits<{
    (event: 'update:modelValue', value: number | null): void,
  }>()

  const internalValue = computed({
    get() {
      return props.modelValue ?? props.min ?? 0
    },
    set(value) {
      emits('update:modelValue', value)
    },
  })

  const canDecrease = computed(() => isWithinMin(internalValue.value - props.step))
  const canIncrease = computed(() => isWithinMax(internalValue.value + props.step))

  function isWithinMin(value: number): boolean {
    return typeof props.min !== 'number' || value >= props.min
  }

  function isWithinMax(value: number): boolean {
    return typeof props.max !== 'number' || value <= props.max
  }
</script>

<style>
.p-stepper { @apply
  items-stretch
  overflow-hidden
}

.p-stepper:has(.p-stepper__step:focus) {@apply
  focus-within:ring-0
}

.p-stepper__step { @apply
  m-1
  flex-shrink-0
  focus:ring-offset-0
}

.p-stepper .p-number-input__control { @apply
  text-center
  px-0
}

.p-stepper .p-number-input__control::-webkit-outer-spin-button,
.p-stepper .p-number-input__control::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>