<template>
  <div class="p-number-input" :class="classes" @click="control?.focus()">
    <div v-if="prepend" class="p-number-input__prepend">
      {{ prepend }}
    </div>
    <slot name="prepend" />
    <input
      ref="control"
      v-model.number="value"
      type="number"
      class="p-number-input__control"
      v-bind="$attrs"
      @keypress="preventNonNumericalInput($event)"
    >
    <div v-if="append" class="p-number-input__append">
      {{ append }}
    </div>
    <slot name="append" />
  </div>
</template>

<script lang="ts">
  import { defineComponent, computed, ref } from 'vue'

  export default defineComponent({
    name: 'PNumberInput',
    expose: [],
    inheritAttrs: false,
  })
</script>

<script lang="ts" setup>
  import { State } from '@/types/state'

  const props = defineProps<{
    modelValue: number | null,
    state?: State,
    prepend?: string,
    append?: string,
  }>()

  const emits = defineEmits<{
    (event: 'update:modelValue', value: number | null): void,
  }>()

  const control = ref<HTMLInputElement>()

  const value = computed({
    get() {
      return props.modelValue
    },
    set(value: number | string | null) {
      if (typeof value === 'string') {
        const parsed = parseFloat(value)

        value = isNaN(parsed) ? null : parsed
      }
      emits('update:modelValue', value)
    },
  })

  function preventNonNumericalInput(event: KeyboardEvent): void {
    const acceptableKeys = /\d|\./
    if (!acceptableKeys.test(event.key)) {
      event.preventDefault()
    }
  }

  const classes = computed(() => ({
    'p-number-input--valid': props.state?.valid,
    'p-number-input--invalid': props.state?.invalid,
    'p-number-input--changed': props.state?.changed,
    'p-number-input--touched': props.state?.touched,
    'p-number-input--untouched': props.state?.untouched,
    'p-number-input--pristine': props.state?.pristine,
    'p-number-input--dirty': props.state?.dirty,
    'p-number-input--pending': props.state?.pending,
    'p-number-input--required': props.state?.required,
    'p-number-input--validated': props.state?.validated,
    'p-number-input--passed': props.state?.passed,
    'p-number-input--failed': props.state?.failed,
  }))
</script>

<style>
.p-number-input { @apply
  w-full
  border
  flex
  items-center
  focus-within:ring-1
  focus-within:border-prefect-600
  focus-within:ring-prefect-600
  border-gray-300
  shadow-sm
  rounded-md
}

.p-number-input--disabled { @apply
  cursor-not-allowed
  opacity-50
}

.p-number-input__control { @apply
  block
  w-full
  rounded-md
}

.p-number-input__prepend,
.p-number-input__append { @apply
  px-2
  flex
  flex-col
  whitespace-nowrap
  justify-center
  self-stretch
  text-sm
  border-gray-300
}

.p-number-input__prepend { @apply
  border-r
}

.p-number-input__append { @apply
  border-l
}

.p-number-input--failed { @apply
  border-red-600
  focus-within:border-red-600
  focus-within:ring-red-600
}
</style>