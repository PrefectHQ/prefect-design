<template>
  <PLabel class="p-radio" :class="classes" :style="styles">
    <template v-if="slots.label || isDefined(label)" #label>
      <slot name="label">
        <span class="p-radio__label">
          {{ label }}
        </span>
      </slot>
    </template>
    <template #default="{ id }">
      <input
        :id="id"
        v-bind="attrs"
        v-model="internalModelValue"
        type="radio"
        :disabled="disabled"
        :value="value"
        class="p-radio__input"
      >
    </template>
  </PLabel>
</template>

<script lang="ts">
  export default {
    name: 'PRadio',
    expose: [],
    inheritAttrs: false,
  }
</script>

  <script lang="ts" setup>
  import { computed, useSlots } from 'vue'
  import { useAttrsStylesAndClasses } from '@/compositions/attributes'
  import { SelectModelValue } from '@/types/selectOption'
  import { State } from '@/types/state'
  import { isDefined } from '@/utilities'

  const props = defineProps<{
    modelValue: string | number | boolean | null | undefined,
    label: string,
    value: SelectModelValue,
    state?: State,
    disabled?: boolean,
  }>()

  const emits = defineEmits<{
    (event: 'update:modelValue', value: string | number | boolean | null): void,
  }>()

  const slots = useSlots()

  const { classes: attrClasses, styles, attrs } = useAttrsStylesAndClasses()

  const internalModelValue = computed({
    get() {
      return props.modelValue ?? null
    },
    set(value) {
      emits('update:modelValue', value)
    },
  })

  const failed = computed(() => props.state?.valid === false && props.state.validated && !props.state.pending)

  const classes = computed(() => [
    attrClasses.value, {
      'p-radio--disabled': props.disabled,
      'p-radio--failed': failed.value,
      'p-radio--pending': props.state?.pending,
    },
  ])
</script>

<style>
.p-radio.p-radio { @apply
  flex
  flex-row-reverse
  justify-end
  items-center
  gap-x-2
  w-auto
}

.p-radio__label,
.p-radio__input { @apply
  cursor-pointer
}

.p-radio__input { @apply
  h-4
  w-4
  transition-colors
  block
  focus:ring-spacing-focus-ring
  focus:ring-focus-ring
  focus:ring-offset-focus-ring
  focus:ring-offset-focus-ring-offset;
  background-color: var(--p-color-input-bg);
  border-color: var(--p-color-input-border);
  color: var(--p-color-input-text)
}

.p-radio__input:focus:not(:focus-visible) { @apply
  ring-transparent
  ring-offset-transparent
}

.p-radio__input:not(:disabled):hover {
  background-color: var(--p-color-input-bg);
  border-color: var(--p-color-input-border-focus);
  color: var(--p-color-input-text);
}

.p-radio__input:checked,
.p-radio__input:checked:hover,
.p-radio__input:checked:focus {
  background-color: var(--p-color-input-checked-bg);
  border-color: var(--p-color-input-checked-border);
  color: var(--p-color-input-checked-text);
}


.p-radio--failed {
  scroll-margin: var(--prefect-scroll-margin);
}

.p-radio--failed .p-radio__input,
.p-radio--failed .p-radio__input:hover,
.p-radio--failed .p-radio__input:focus {
  background-color: var(--p-color-input-bg-invalid);
  border-color: var(--p-color-input-border-invalid);
}

.p-radio--disabled .p-radio__label,
.p-radio--disabled .p-radio__input { @apply
  opacity-50
  cursor-not-allowed
}

.p-radio--pending .p-radio__input { @apply
  animate-pulse
}
</style>
