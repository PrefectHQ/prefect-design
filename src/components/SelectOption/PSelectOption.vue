<template>
  <div
    class="p-select-option"
    role="option"
    :class="classes"
    @click="handleClick"
    @mouseenter="handleMouseEnter"
  >
    <template v-if="multiple">
      <PCheckbox :model-value="selected" :disabled="option.disabled" />
    </template>
    <span class="p-select-option__text">
      <slot
        :option="option"
        :selected="selected"
        :highlighted="highlightedValue === modelValue"
      >
        {{ option.label }}
      </slot>
    </span>
  </div>
</template>

<script lang="ts" setup>
  import { computed, toRefs } from 'vue'
  import PCheckbox from '@/components/Checkbox/PCheckbox.vue'
  import { SelectModelValue, SelectOptionNormalized } from '@/types'

  const props = defineProps<{
    modelValue: string | number | boolean | null | SelectModelValue[],
    highlightedValue: string | number | boolean | null | symbol,
    option: SelectOptionNormalized,
    multiple?: boolean,
  }>()

  const emit = defineEmits<{
    (event: 'update:modelValue', value: SelectModelValue | SelectModelValue[]): void,
    (event: 'update:highlightedValue', value: SelectModelValue | symbol): void,
  }>()

  const { option } = toRefs(props)

  const modelValue = computed({
    get() {
      return props.modelValue
    },
    set(value) {
      if (option.value.disabled) {
        return
      }

      emit('update:modelValue', value)
    },
  })

  // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
  const multiple = computed(() => props.multiple || Array.isArray(modelValue.value))

  const selected = computed(() => {
    if (Array.isArray(modelValue.value)) {
      return modelValue.value.includes(option.value.value)
    }

    return option.value.value === modelValue.value
  })

  const highlightedValue = computed({
    get() {
      return props.highlightedValue
    },
    set(value) {
      emit('update:highlightedValue', value)
    },
  })

  const classes = computed(() => ({
    'p-select-option--selected': selected.value,
    'p-select-option--highlighted': highlightedValue.value === option.value.value,
    'p-select-option--disabled': option.value.disabled,
  }))

  function handleClick(): void {
    if (multiple.value && selected.value) {
      unsetValue()
      return
    }

    setValue()
  }

  function handleMouseEnter(): void {
    if (option.value.disabled) {
      return
    }

    highlightedValue.value = option.value.value
  }

  function setValue(): void {
    if (Array.isArray(modelValue.value)) {
      modelValue.value = [...modelValue.value, option.value.value]
    } else {
      modelValue.value = option.value.value
    }
  }

  function unsetValue(): void {
    if (Array.isArray(modelValue.value)) {
      modelValue.value = modelValue.value.filter(value => value !== option.value.value)
    } else {
      modelValue.value = null
    }
  }
</script>

<style>
.p-select-option { @apply
  text-foreground
  select-none
  relative
  py-2
  px-3
  font-normal
  text-sm
  flex
  gap-2
  items-center
}

.p-select-option--selected { @apply
  font-semibold
  bg-primary-200
}

.p-select-option--highlighted { @apply
  bg-primary-100
}

.p-select-option--selected.p-select-option--highlighted { @apply
  bg-primary-300
}

.p-select-option__text { @apply
  flex
  items-center
  truncate
}

/* if label is empty string, ensure equal height */
.p-select-option__text:empty:before {
  content: "\200b";
}

.p-select-option__check { @apply
  text-prefect-600
  flex
  items-center
  pr-1
}

.p-select-option__check .p-icon { @apply
  w-4
  h-4
}

.p-select-option--disabled { @apply
  opacity-50
}

.p-select-option--disabled .p-checkbox { @apply
  opacity-100
}
</style>
