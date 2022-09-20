<template>
  <div class="p-radio-group" :class="classes">
    <template v-for="(option, index) in radioOptions" :key="index">
      <p-label :label="option.label" class="p-radio-group__label">
        <template #label>
          <slot name="label" :option="option" />
        </template>
        <template #default="{ id }">
          <input
            :id="id"
            v-model="value"
            type="radio"
            :name="name"
            :disabled="disabled"
            :value="option.value"
            class="p-radio-group__input"
          >
        </template>
      </p-label>
    </template>
  </div>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import { isSelectOption, SelectOption } from '@/types/selectOption'
  import { State } from '@/types/state'
  import { randomId } from '@/utilities'

  const props = defineProps<{
    modelValue: string | null | undefined,
    options: string[] | SelectOption[],
    state?: State,
    disabled?: boolean,
  }>()

  const emits = defineEmits<{
    (event: 'update:modelValue', value: string | null): void,
  }>()

  const name = randomId()

  const value = computed({
    get() {
      return props.modelValue ?? null
    },
    set(value: string | null) {
      emits('update:modelValue', value)
    },
  })

  const radioOptions = computed<SelectOption[]>(() => {
    return props.options.map(option => {
      if (isSelectOption(option)) {
        return option
      }

      return { label: option.toLocaleString(), value: option }
    })
  })

  const failed = computed(() => props.state?.valid === false && props.state.validated && !props.state.pending)

  const classes = computed(() => ({
    'p-radio-group--disabled': props.disabled,
    'p-radio-group--failed': failed.value,
    'p-radio-group--pending': props.state?.pending,
  }))
</script>

<style>
.p-radio-group { @apply
  flex
  flex-col
  items-start
  gap-2
}

.p-radio-group--disabled { @apply
  opacity-50
}

.p-radio-group--disabled .p-radio-group__label,
.p-radio-group--disabled .p-radio-group__input,
.p-radio-group--disabled .p-label__label { @apply
  cursor-not-allowed
}

.p-radio-group__label { @apply
  flex
  flex-row
  items-center
  w-min
  gap-2
}

.p-radio-group__label .p-label__body { @apply
  order-first
}

.p-radio-group__input { @apply
  ring-offset-2
  focus-within:ring-2
}

.p-radio-group--failed .p-radio-group__input { @apply
  ring-1
  ring-red-600
  focus-within:ring-2
  focus-within:ring-red-600
}

.p-radio-group--pending .p-radio-group__input { @apply
  ring-1
  ring-prefect-300
  focus-within:ring-2
  focus-within:ring-prefect-300
}
</style>