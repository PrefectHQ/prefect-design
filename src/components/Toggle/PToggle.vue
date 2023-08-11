<template>
  <fieldset class="p-toggle" :disabled="disabled">
    <button v-if="prepend || slots.prepend" type="button" class="p-toggle__prepend" @click="handlePrependClick">
      <slot name="prepend">
        {{ prepend }}
      </slot>
    </button>

    <label
      class="p-toggle__control"
      tabindex="0"
      role="switch"
      :aria-checked="internalValue"
      :class="classes.control"
      @keypress.space="toggle"
    >
      <input
        v-show="false"
        v-model="internalValue"
        type="checkbox"
      >
      <div class="p-toggle__slider" aria-hidden="true">
        <template v-if="state?.pending">
          <PLoadingIcon />
        </template>
      </div>
    </label>

    <button v-if="append || slots.append" type="button" class="p-toggle__append" :disabled="disabled" @click="handleAppendClick">
      <slot name="append">
        {{ append }}
      </slot>
    </button>
  </fieldset>
</template>

<script lang="ts" setup>
  import { computed, useSlots } from 'vue'
  import { PLoadingIcon } from '@/components/LoadingIcon'
  import { State } from '@/types/state'

  const props = defineProps<{
    modelValue: boolean | null | undefined,
    neutralStates?: boolean,
    disabled?: boolean,
    state?: State,
    prepend?: string,
    append?: string,
  }>()

  const emits = defineEmits<{
    (event: 'update:modelValue', value: boolean): void,
  }>()

  const slots = useSlots()

  const internalValue = computed({
    get() {
      return props.modelValue ?? false
    },
    set(value) {
      if (!props.disabled) {
        emits('update:modelValue', value)
      }
    },
  })

  const failed = computed(() => props.state?.valid === false && props.state.validated && !props.state.pending)

  const classes = computed(() => ({
    control: {
      'p-toggle__control--checked': internalValue.value,
      'p-toggle__control--disabled': props.disabled,
      'p-toggle__control--failed': failed.value,
      'p-toggle__control--pending': props.state?.pending,
      'p-toggle__control--neutral-states': props.neutralStates,
    },
  }))

  function toggle(): void {
    internalValue.value = !internalValue.value
  }

  function handlePrependClick(): void {
    if (props.append || slots.append) {
      internalValue.value = false
    } else {
      toggle()
    }
  }

  function handleAppendClick(): void {
    if (props.prepend || slots.prepend) {
      internalValue.value = true
    } else {
      toggle()
    }
  }
</script>

<style>
.p-toggle { @apply
  flex
  items-center
  gap-2
  h-6
}

.p-toggle__control { @apply
  flex
  items-center
  border-2
  w-11
  h-full
  rounded-full
  transition-colors
  outline-none
  cursor-pointer
  focus:ring-spacing-focus-ring
  focus:ring-focus-ring
  focus:ring-offset-focus-ring
  focus:ring-offset-focus-ring-offset;
  background-color: var(--p-color-toggle-bg);
  border-color: var(--p-color-toggle-bg);
}

.p-toggle__control:focus:not(:focus-visible) { @apply
  ring-transparent
  ring-offset-transparent
}

.p-toggle__control--checked:not(.p-toggle__control--neutral-states) {
  background-color: var(--p-color-toggle-bg-checked);
  border-color: var(--p-color-toggle-bg-checked);
}

.p-toggle__slider { @apply
  w-5
  h-5
  flex
  justify-center
  items-center
  relative
  rounded-full
  transition-all
  text-live;
  background-color: var(--p-color-toggle-trigger);
}

.p-toggle__control--checked .p-toggle__slider { @apply
  translate-x-5
}

.p-toggle__control--failed {
  background-color: var(--p-color-input-border-invalid);
  border-color: var(--p-color-input-border-invalid)
}

.p-toggle__control--disabled { @apply
  opacity-50
  cursor-not-allowed
}

.p-toggle__prepend,
.p-toggle__append { @apply
  whitespace-nowrap
  text-sm
}
</style>
