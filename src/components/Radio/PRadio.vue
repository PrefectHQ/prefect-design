<template>
  <p-label :label="label" class="p-radio" :class="classes.label" :style="styles">
    <template #label>
      <slot name="label" :label="label" :value="value" />
    </template>
    <template #default="{ id }">
      <input
        :id="id"
        v-bind="attrs"
        v-model="internalValue"
        type="radio"
        :class="classes.input"
        :name="name"
        :disabled="disabled"
        :value="value"
        class="p-radio__input"
      >
    </template>
  </p-label>
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
    modelValue: string | null | undefined,
    label: string,
    value: SelectModelValue,
    name?: string,
    state?: State,
    disabled?: boolean,
  }>()

  const emits = defineEmits<{
    (event: 'update:modelValue', value: string | null): void,
  }>()

  const { classes: attrClasses, styles, attrs } = useAttrsStylesAndClasses()

  const internalValue = computed({
    get() {
      return props.modelValue ?? null
    },
    set(value: string | null) {
      emits('update:modelValue', value)
    },
  })

  const failed = computed(() => props.state?.valid === false && props.state.validated && !props.state.pending)

  const classes = computed(() => ({
    label: {
      ...attrClasses,
      'p-radio--disabled': props.disabled,
      'p-radio--failed': failed.value,
      'p-radio--pending': props.state?.pending,
    },
    input: {
      'p-radio__input--disabled': props.disabled,
      'p-radio__input--failed': failed.value,
      'p-radio__input--pending': props.state?.pending,
    },
  }))
</script>

<style>
.p-radio--disabled { @apply
  opacity-50
}

.p-radio--disabled,
.p-radio--disabled .p-label__label,
.p-radio__input--disabled { @apply
  cursor-not-allowed
}

.p-radio { @apply
  flex
  flex-row
  items-center
  w-min
  gap-2
}

.p-radio .p-label__body { @apply
  order-first
}

.p-radio__input { @apply
  ring-offset-2
  focus-within:ring-2
}

.p-radio__input--failed { @apply
  ring-1
  ring-red-600
  focus-within:ring-2
  focus-within:ring-red-600
}

.p-radio__input--pending { @apply
  ring-1
  ring-prefect-300
  focus-within:ring-2
  focus-within:ring-prefect-300
}
</style>