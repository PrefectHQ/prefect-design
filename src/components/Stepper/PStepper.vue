<template>
  <div class="p-stepper">
    <p-button
      class="p-stepper__step p-stepper__step--down"
      rounded
      inset
      size="xs"
      icon="MinusIcon"
      :disabled="!canDecrease"
      @click="internalValue--"
    />
    <p-button
      class="p-stepper__step p-stepper__step--up"
      rounded
      inset
      size="xs"
      icon="PlusIcon"
      :disabled="!canIncrease"
      @click="internalValue++"
    />
  </div>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  const props = defineProps<{
    modelValue: number | null | undefined,
    min?: number,
    max?: number,
  }>()

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
  const canDecrease = computed(() => isWithinMin(internalValue.value -1))
  const canIncrease = computed(() => isWithinMax(internalValue.value +1))

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
}

.p-stepper__step-icon { @apply
  w-7
  h-7
}
</style>