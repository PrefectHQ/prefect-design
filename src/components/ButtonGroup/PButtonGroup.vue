<template>
  <div class="p-button-group">
    <template v-for="button in options" :key="button.label">
      <p-button
        v-model="internalValue"
        :disabled="button.disabled"
        :size="size"
        inset
        class="p-button-group__button"
        :class="{ 'p-button-group__active': button.value === modelValue }"
        @click="select(button.value)"
      >
        {{ button.label }}
      </p-button>
    </template>
  </div>
</template>

<script lang="ts" setup>
  import { computed, onMounted, withDefaults } from 'vue'
  import { SelectModelValue, SelectOption, Size } from '@/types'

  const props = withDefaults(defineProps<{
    options: SelectOption[],
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

  onMounted(() => {
    console.log(props.modelValue)
  })
</script>

<style>
.p-button-group {
  @apply
  inline-flex
}

.p-button-group__active {
   @apply
  text-white
  bg-prefect-600
  hover:!bg-prefect-700
}

.p-button-group__button {
  @apply
  focus:z-10
  focus:ring-prefect-600
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