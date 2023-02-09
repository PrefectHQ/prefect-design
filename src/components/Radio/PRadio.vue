<template>
  <PLabel class="p-radio" :class="classes" :style="styles">
    <template #label>
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
  import { computed } from 'vue'
  import { useAttrsStylesAndClasses } from '@/compositions/attributes'
  import { SelectModelValue } from '@/types/selectOption'
  import { State } from '@/types/state'

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
  text-foreground
}

.p-radio__label,
.p-radio__control { @apply
  cursor-pointer
}

.p-radio__input { @apply
  h-4
  w-4
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

.p-radio--failed {
  scroll-margin: var(--prefect-scroll-margin);
}

.p-radio--failed .p-radio__input { @apply
  ring-1
  ring-danger
  focus-within:ring-2
  focus-within:ring-danger
}

.p-radio--disabled .p-radio__label,
.p-radio--disabled .p-radio__input { @apply
  opacity-50
  cursor-not-allowed
}

.p-radio--pending .p-radio__input { @apply
  ring-1
  ring-primary-300
  focus-within:ring-2
  focus-within:ring-primary-300

  dark:ring-primary-100
  dark:focus-within:ring-primary-100
}
</style>
