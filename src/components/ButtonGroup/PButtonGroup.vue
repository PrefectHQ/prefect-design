<template>
  <div class="p-button-group">
    <template v-for="button in options" :key="button.label">
      <PButton
        :disabled="button.disabled"
        :size="size"
        :inset="button.value !== modelValue"
        class="p-button-group__button"
        :icon="button.icon"
        @click="select(button.value)"
      >
        {{ button.label }}
      </PButton>
    </template>
  </div>
</template>

<script lang="ts" setup>
  import { computed, withDefaults } from 'vue'
  import PButton from '@/components/Button/PButton.vue'
  import { SelectModelValue, ButtonGroupOption, Size } from '@/types'

  const props = withDefaults(defineProps<{
    options: ButtonGroupOption[],
    modelValue: string | number | null | undefined,
    size?: Size,
  }>(), {
    size: 'md',
  })

  const emit = defineEmits<{
    (event: 'update:modelValue', value: SelectModelValue): void,
  }>()

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
.p-button-group {
  @apply
  inline-flex
}

.p-button-group__button:not(:first-child):not(:last-child) {
  @apply
  rounded-none
}

.p-button-group__button:first-child {
  @apply
  rounded-r-none
}

.p-button-group__button:last-child {
  @apply
  rounded-l-none
}
</style>