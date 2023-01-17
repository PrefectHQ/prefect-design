<template>
  <p-number-input v-model="internalValue" class="p-stepper">
    <template #prepend>
      <PButton
        class="p-stepper__step p-stepper__step--down"
        inset
        rounded
        size="xs"
        icon="MinusIcon"
        :disabled="!canDecrease"
        @click="internalValue -= step"
      />
    </template>
    <template #append>
      <PButton
        class="p-stepper__step p-stepper__step--up"
        inset
        rounded
        size="xs"
        icon="PlusIcon"
        :disabled="!canIncrease"
        @click="internalValue += step"
      />
    </template>
  </p-number-input>
</template>

<script lang="ts" setup>
  import { computed, withDefaults } from 'vue'
  import PButton from '@/components/Button/PButton.vue'

  const props = withDefaults(defineProps<{
    modelValue: number | null | undefined,
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
      if (isWithinRange(value)) {
        emits('update:modelValue', value)
      }
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

  function isWithinRange(value: number): boolean {
    return isWithinMin(value) && isWithinMax(value)
  }
</script>

<style>
.p-stepper { @apply
  items-stretch
  overflow-hidden
}

.p-stepper:has(.p-stepper__step:focus) {@apply
  focus-within:ring-0
  focus-within:border-background-300
  dark:focus-within:border-foreground-400
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