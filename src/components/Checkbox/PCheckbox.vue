<template>
  <PLabel class="p-checkbox" :class="classes" :style="attrStyles">
    <template v-if="slots.label || isDefined(label)" #label>
      <slot name="label">
        <span class="p-checkbox__label">
          {{ label }}
        </span>
      </slot>
    </template>
    <template #default="{ id }">
      <input
        :id="id"
        v-bind="attrs"
        v-model="value"
        type="checkbox"
        :disabled="disabled"
        class="p-checkbox__input"
      >
    </template>
  </PLabel>
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
  import { isDefined } from '@/utilities'

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
    set(value) {
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
.p-checkbox.p-checkbox { @apply
  my-1
  flex
  flex-row-reverse
  justify-end
  items-center
  gap-x-2
  w-auto
  text-foreground
}

.p-checkbox__label,
.p-checkbox__input { @apply
  cursor-pointer
}

.p-checkbox__input { @apply
  h-4
  w-4
  rounded
  transition-colors
  ring-offset-2
  focus-within:ring-2
  block

  text-primary-600
  bg-background
  focus:ring-primary-600

  border-background-400
  dark:text-primary-300
  dark:border-foreground-200
  dark:focus:ring-primary-400
  dark:ring-offset-background-500
}

.p-checkbox--failed {
  scroll-margin: var(--prefect-scroll-margin);
}

.p-checkbox--failed .p-checkbox__input { @apply
  ring-1
  ring-danger
  focus-within:ring-2
  focus-within:ring-danger
}

.p-checkbox--disabled .p-radio__label,
.p-checkbox--disabled .p-radio__input { @apply
  opacity-50
  cursor-not-allowed
}

.p-checkbox--pending .p-checkbox__input { @apply
  ring-1
  ring-primary-300
  focus-within:ring-2
  focus-within:ring-primary-300

  dark:ring-primary-100
  dark:focus-within:ring-primary-100
}
</style>
