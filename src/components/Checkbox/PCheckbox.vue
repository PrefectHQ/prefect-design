<template>
  <div class="p-checkbox" :class="classes">
    <label class="p-checkbox__label">
      <slot name="label">
        <div class="p-checkbox__label-text">
          {{ label }}
        </div>
      </slot>
      <input
        v-model="value"
        type="checkbox"
        class="p-checkbox__control"
        :disabled="disabled"
        v-bind="$attrs"
      >
    </label>
  </div>
</template>

<script lang="ts">
  import { defineComponent, computed } from 'vue'

  export default defineComponent({
    name: 'PCheckbox',
    expose: [],
    inheritAttrs: false,
  })
</script>

<script lang="ts" setup>
  import { State } from '@/types/state'

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  type ModelValue = boolean | any[]

  const props = defineProps<{
    modelValue: ModelValue,
    label?: string,
    state?: State,
    disabled?: boolean,
  }>()

  const emits = defineEmits<{
    (event: 'update:modelValue', value: ModelValue): void,
  }>()

  const value = computed({
    get() {
      return props.modelValue
    },
    set(value: ModelValue) {
      emits('update:modelValue', value)
    },
  })

  const classes = computed(() => ({
    'p-checkbox--disabled': props.disabled,
    'p-checkbox--failed': !!props.state?.failed,
  }))
</script>

<style>
.p-checkbox--disabled,
:disabled .p-checkbox { @apply
  cursor-not-allowed
  opacity-50
}

.p-checkbox--failed { @apply
  border-red-600
  focus:ring-red-600
}

.p-checkbox__control { @apply
  focus:ring-prefect-600
  h-4
  w-4
  text-prefect-600
  border-gray-300
  rounded
}

.p-checkbox__label { @apply
  text-sm
  font-medium
  text-gray-700
  flex
  gap-x-2
  items-center
}

.p-checkbox__label .p-checkbox__label-text { @apply
  order-last
}
</style>