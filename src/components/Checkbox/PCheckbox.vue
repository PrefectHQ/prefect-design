<template>
  <PLabel class="p-checkbox" :class="classes.checkbox" :style="attrStyles">
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
        :class="classes.input"
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
    small?: boolean,
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

  const classes = computed(() => ({
    'checkbox': [
      attrClasses.value, {
        'p-checkbox--disabled': props.disabled,
        'p-checkbox--failed': failed.value,
        'p-checkbox--pending': props.state?.pending,
        'p-checkbox--small': props.small,
      },
    ],
    'input': {
      'p-checkbox__input--small': props.small,
    },
  }
  ))
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
}

.p-checkbox__label,
.p-checkbox__input { @apply
  cursor-pointer
}

.p-checkbox.p-checkbox--small { @apply
  my-0
}

.p-checkbox__input { @apply
  h-4
  w-4
  rounded
  transition-colors
  block
  focus:ring-spacing-focus-ring
  focus:ring-focus-ring
  focus:ring-offset-focus-ring
  focus:ring-offset-focus-ring-offset;
  background-color: var(--p-color-input-bg);
  border-color: var(--p-color-input-border);
  color: var(--p-color-input-text);
}

.p-checkbox__input:focus:not(:focus-visible) { @apply
  ring-transparent
  ring-offset-transparent
}

.p-checkbox__input:not(:disabled):hover {
  background-color: var(--p-color-input-bg);
  border-color: var(--p-color-input-border-focus);
  color: var(--p-color-input-text);
}

.p-checkbox__input:checked,
.p-checkbox__input:checked:hover,
.p-checkbox__input:checked:focus {
  background-color: var(--p-color-input-checked-bg);
  border-color: var(--p-color-input-checked-border);
  color: var(--p-color-input-checked-text);
}

.p-checkbox--failed {
  scroll-margin: var(--prefect-scroll-margin);
}

.p-checkbox--failed .p-checkbox__input,
.p-checkbox--failed .p-checkbox__input:hover,
.p-checkbox--failed .p-checkbox__input:focus {
  background-color: var(--p-color-input-bg-invalid);
  border-color: var(--p-color-input-border-invalid);
}

.p-checkbox--disabled .p-checkbox__label,
.p-checkbox--disabled .p-checkbox__input { @apply
  opacity-50
  cursor-not-allowed
}

.p-checkbox--pending { @apply
  animate-pulse
}
</style>
