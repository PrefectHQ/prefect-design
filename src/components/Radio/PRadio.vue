<template>
  <div class="p-radio" :class="classes" :style="styles">
    <label class="p-radio__label">
      <template v-if="label || slots.label">
        <div class="p-radio__label-text">
          <slot name="label">
            {{ label }}
          </slot>
        </div>
      </template>
      <input
        :id="id"
        v-bind="attrs"
        v-model="internalModelValue"
        type="radio"
        :disabled="disabled"
        :value="value"
        class="p-radio__input"
      >
    </label>
  </div>
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
  import { randomId } from '@/utilities'

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
  const id = randomId()

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
.p-radio { @apply
  flex
}

.p-radio__label { @apply
  text-sm
  flex
  gap-x-2
  items-center
  cursor-pointer
  text-foreground
}

.p-radio__label-text { @apply
  order-last
}

.p-radio__input { @apply
  h-4
  w-4
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

.p-radio__input--failed { @apply
  ring-1
  ring-danger-600
  focus-within:ring-2
  focus-within:ring-danger-600
}

.p-radio__input--pending { @apply
  ring-1
  ring-primary-300
  focus-within:ring-2
  focus-within:ring-primary-300
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

.p-radio__input:disabled,
.p-radio--disabled .p-radio__label { @apply
  opacity-50
  cursor-not-allowed
}
</style>
