<template>
  <div class="p-stepper">
    <p-button
      class="p-stepper__step p-stepper__step--down"
      rounded
      inset
      size="xs"
      icon="MinusIcon"
      :disabled="!canDecrease"
      @click="internalValue -= step"
    />
    <p-button
      class="p-stepper__step p-stepper__step--up"
      rounded
      inset
      size="xs"
      icon="PlusIcon"
      :disabled="!canIncrease"
      @click="internalValue += step"
    />
    <div class="p-stepper__display">
      <slot :value="internalValue.toLocaleString()">
        {{ internalValue.toLocaleString() }}
      </slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { computed, withDefaults } from 'vue'

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
    set(value: number) {
      if (isWithinRange(value)) {
        emits('update:modelValue', value)
      }
    },
  })

  const canDecrease = computed(() => isWithinMin(internalValue.value - props.step))
  const canIncrease = computed(() => isWithinMax(internalValue.value + props.step))

  function isWithinMin(value: number): boolean {
    return !props.min || value >= props.min
  }

  function isWithinMax(value: number): boolean {
    return !props.max || value <= props.max
  }

  function isWithinRange(value: number): boolean {
    return isWithinMin(value) && isWithinMax(value)
  }
</script>

<style>
.p-stepper { @apply
  flex
  gap-2
  items-center
}

.p-stepper__step-icon { @apply
  w-7
  h-7
}
</style>