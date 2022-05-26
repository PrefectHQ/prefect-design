<template>
  <p-combobox v-model="internalValue" allow-unknown-value :options="[]" :placeholder="placeholder">
    <template #option="{ option }">
      <slot name="tag" :tag="option.value">
        {{ option.label }}
      </slot>
    </template>
    <template #options-empty>
      <span />
    </template>
  </p-combobox>
</template>

<script lang="ts" setup>
  import { computed, withDefaults } from 'vue'

  const props = withDefaults(defineProps<{
    tags: string[] | null | undefined,
    placeholder?: string,
  }>(), {
    placeholder: 'Add Tag',
  })

  const emits = defineEmits<{
    (event: 'update:tags', value: string[]): void,
  }>()

  const internalValue = computed({
    get() {
      return props.tags ?? []
    },
    set(value: string[]) {
      emits('update:tags', value)
    },
  })
</script>