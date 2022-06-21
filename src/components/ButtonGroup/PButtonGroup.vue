<template>
  <div class="p-button-group">
    <template v-for="button in buttonGroup" :key="button.label">
      <p-button
        inset
        class="p-button-group__button"
        autofocus
        :class="{ 'p-button-group__active': button.value === isFocused }"
        @click="onSelect(button.value)"
        @focus="onFocus(button.value)"
      >
        {{ button.label }}
      </p-button>
    </template>
  </div>
</template>

<script lang="ts" setup>
  import { onMounted, ref } from 'vue'
  import { SelectModelValue, SelectOption } from '@/types'

  const props = defineProps<{
    buttonGroup: SelectOption[],
  }>()

  const emit = defineEmits<{
    (event: 'update:modelValue', value: SelectModelValue): void,
  }>()

  const isFocused = ref()
  const onFocus = (value: SelectModelValue): void => {
    isFocused.value = value
  }

  const onSelect = (value: SelectModelValue): void => {
    emit('update:modelValue', value)
  }

  onMounted(() => {
    emit('update:modelValue', props.buttonGroup[0].value)
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