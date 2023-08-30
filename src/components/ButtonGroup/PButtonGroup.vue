<template>
  <div class="p-button-group">
    <template v-for="button in options" :key="button.value">
      <p-button
        :disabled="button.disabled"
        :small="small"
        class="p-button-group__button"
        :selected="button.value === modelValue"
        :icon="button.icon"
        @click="select(button.value)"
      >
        <template v-if="button.label || $slots.default" #default>
          <slot :button="button">
            {{ button.label }}
          </slot>
        </template>
      </p-button>
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
</script>

<style>
.p-button-group { @apply
  inline-flex
}

.p-button-group__button:not(:last-child) { @apply
  border-r-0
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

.p-button-group__button:not(:disabled):hover { @apply
  border-r
  z-10
}

.p-button-group__button:not(:disabled):hover + .p-button-group__button { @apply
  border-l-0
}
</style>