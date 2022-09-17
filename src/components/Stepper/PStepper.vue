<template>
  <div class="p-stepper" :class="classes.stepper">
    <PButton
      class="p-stepper__step p-stepper__step--down"
      rounded
      inset
      size="xs"
      icon="MinusIcon"
      :disabled="!canDecrease"
      @click="internalValue -= step"
    />
    <template v-if="showInput">
      <input v-model="internalValue" type="number" class="p-stepper__number-input">
    </template>
    <PButton
      class="p-stepper__step p-stepper__step--up"
      rounded
      inset
      size="xs"
      icon="PlusIcon"
      :disabled="!canIncrease"
      @click="internalValue += step"
    />
  </div>
</template>

<script lang="ts" setup>
  import { computed, withDefaults } from 'vue'
  import PButton from '@/components/Button/PButton.vue'

  const props = withDefaults(defineProps<{
    modelValue: number | null | undefined,
    min?: number | null,
    max?: number | null,
    step?: number,
    showInput?: boolean,
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

  const classes = computed(() => ({
    stepper:{
      'p-stepper--show-input': props.showInput,
    },
  }))

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
  inline-flex
  gap-2
  items-center
}

.p-stepper--show-input { @apply
  gap-0
  items-stretch
  self-start
}

.p-stepper--show-input .p-stepper__step { @apply
  rounded-none
  px-3
}

.p-stepper--show-input .p-stepper__step--down { @apply
  rounded-l
}

.p-stepper--show-input .p-stepper__step--up { @apply
  rounded-r
}

.p-stepper__number-input { @apply
  w-14
  border-x-0
  border-gray-300
  text-center
  focus:border-gray-300
  focus:ring-0;
  -moz-appearance: textfield;
}

.p-stepper__number-input::-webkit-outer-spin-button,
.p-stepper__number-input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.p-stepper__step-icon { @apply
  w-7
  h-7
}
</style>