<template>
  <div class="p-button-group">
    <template v-for="button in options" :key="button.label">
      <PButton
        :disabled="button.disabled"
        :small="small"
        class="p-button-group__button"
        :class="getButtonClass(button.value)"
        :icon="button.icon"
        @click="select(button.value)"
      >
        {{ button.label }}
      </PButton>
    </template>
  </div>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import PButton from '@/components/Button/PButton.vue'
  import { SelectModelValue, ButtonGroupOption, isButtonGroupOption } from '@/types'

  const props = defineProps<{
    options: (ButtonGroupOption | SelectModelValue)[],
    modelValue?: SelectModelValue,
    small?: boolean,
  }>()

  const emit = defineEmits<{
    (event: 'update:modelValue', value: SelectModelValue): void,
  }>()

  const options = computed<ButtonGroupOption[]>(() => {
    return props.options.map(option => {
      if (isButtonGroupOption(option)) {
        return option
      }

      return {
        label: String(option),
        value: option,
      }
    })
  })

  const internalValue = computed({
    get() {
      return props.modelValue ?? null
    },
    set(value: SelectModelValue) {
      emit('update:modelValue', value)
    },
  })

  const select = (value: SelectModelValue): void => {
    internalValue.value = value
  }

  const getButtonClass = (value: SelectModelValue): string[] | null => {
    return value === internalValue.value
      ? ['p-button-group__button--selected']
      : null
  }
</script>

<style>
.p-button-group { @apply
  inline-flex
}

.p-button-group__button:not(:first-child):not(:last-child) { @apply
  rounded-none
}

.p-button-group__button:first-child {@apply
  rounded-r-none
}

.p-button-group__button:last-child {@apply
  rounded-l-none
}

.p-button-group__button--selected,
.p-button-group__button--selected:not(:disabled):hover,
.p-button-group__button--selected:not(:disabled):active { @apply
  cursor-default;
  background-color: var(--p-color-button-activated-bg);
  border-color: var(--p-color-button-activated-border);
  color: var(--p-color-button-activated-text);
}
</style>