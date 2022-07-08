<template>
  <div class="p-checkbox" :class="classes">
    <label class="p-checkbox__label">
      <slot name="label">
        <template v-if="label">
          <div class="p-checkbox__label-text">
            {{ label }}
          </div>
        </template>
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
  import { CheckboxModel } from '@/types/checkbox'
  import { State } from '@/types/state'

  const props = defineProps<{
    modelValue: CheckboxModel | null,
    label?: string,
    state?: State,
    disabled?: boolean,
  }>()

  const emits = defineEmits<{
    (event: 'update:modelValue', value: CheckboxModel): void,
  }>()

  const value = computed({
    get() {
      return props.modelValue ?? undefined
    },
    set(value: CheckboxModel) {
      emits('update:modelValue', value)
    },
  })

  const failed = computed(() => props.state?.valid === false && props.state.validated && !props.state.pending)

  const classes = computed(() => ({
    'p-checkbox--disabled': props.disabled,
    'p-checkbox--failed': failed.value,
    'p-checkbox--pending': props.state?.pending,
  }))
</script>

<style>
.p-checkbox { @apply
  my-1
  flex
}

.p-checkbox--disabled,
:disabled .p-checkbox { @apply
  cursor-not-allowed
  opacity-50
}

.p-checkbox__control { @apply
  focus:ring-prefect-600
  h-4
  w-4
  text-prefect-600
  border-gray-300
  rounded
}

.p-checkbox__control:disabled { @apply
  cursor-not-allowed
}

.p-checkbox__label { @apply
  text-sm
  font-medium
  text-gray-700
  flex
  gap-x-2
  items-center
  cursor-pointer
}

.p-checkbox__label .p-checkbox__label-text { @apply
  order-last
}

.p-checkbox--failed .p-checkbox__control { @apply
  border-red-600
  focus-within:border-red-600
  focus-within:ring-red-600
}

.p-checkbox--pending .p-checkbox__control { @apply
  border-prefect-300
  focus-within:border-prefect-300
  focus-within:ring-prefect-300
}
</style>