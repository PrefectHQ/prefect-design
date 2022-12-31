<template>
  <div class="p-checkbox" :class="classes" :style="attrStyles">
    <label class="p-checkbox__label">
      <template v-if="label || slots.label">
        <div class="p-checkbox__label-text">
          <slot name="label">
            {{ label }}
          </slot>
        </div>
      </template>
      <input
        v-model="value"
        type="checkbox"
        class="p-checkbox__control"
        :disabled="disabled"
        v-bind="attrs"
      >
    </label>
  </div>
</template>

<script lang="ts">
  export default {
    name: 'PCheckbox',
    expose: [],
    inheritAttrs: false,
  }
</script>

<script lang="ts" setup>
  import { computed, useSlots } from 'vue'
  import { useAttrsStylesAndClasses } from '@/compositions'
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

  const slots = useSlots()
  const { classes: attrClasses, styles: attrStyles, attrs } = useAttrsStylesAndClasses()

  const value = computed({
    get() {
      return props.modelValue ?? undefined
    },
    set(value: CheckboxModel) {
      emits('update:modelValue', value)
    },
  })

  const failed = computed(() => props.state?.valid === false && props.state.validated && !props.state.pending)

  const classes = computed(() => [
    attrClasses.value, {
      'p-checkbox--disabled': props.disabled,
      'p-checkbox--failed': failed.value,
      'p-checkbox--pending': props.state?.pending,
    },
  ])
</script>

<style>
.p-checkbox { @apply
  my-1
  flex
}

.p-checkbox--failed {
  scroll-margin: var(--prefect-scroll-margin);
}

.p-checkbox__control { @apply
  h-4
  w-4
  rounded
  transition-colors
  ring-offset-2
  focus-within:ring-2

  text-primary-600
  bg-background
  focus:ring-primary-600

  border-background-400
  dark:text-primary-300
  dark:border-foreground-200
  dark:focus:ring-primary-400
  dark:ring-offset-background-500
}

.p-checkbox__label { @apply
  text-sm
  flex
  gap-x-2
  items-center
  cursor-pointer
  text-foreground
}

.p-checkbox__label .p-checkbox__label-text { @apply
  order-last
}

.p-checkbox--failed .p-checkbox__control { @apply
  ring-1
  ring-danger
  focus-within:ring-2
  focus-within:ring-danger
}

.p-checkbox--pending .p-checkbox__control { @apply
  ring-1
  ring-primary-300
  focus-within:ring-2
  focus-within:ring-primary-300

  dark:ring-primary-100
  dark:focus-within:ring-primary-100
}

.p-checkbox--disabled .p-checkbox__control {
  @apply opacity-50
}

.p-checkbox--disabled,
.p-checkbox__control:disabled,
.p-checkbox--disabled .p-checkbox__control,
.p-checkbox--disabled .p-checkbox__label {
  @apply cursor-not-allowed
}
</style>