<template>
  <PCombobox
    v-model="internalValue"
    class="p-tags-input"
    allow-unknown-value
    :options="[]"
    :placeholder
    :options-class
  >
    <template v-for="(index, name) in $slots" #[name]="data">
      <slot :name="name" v-bind="data" />
    </template>
    <template #default="{ value }">
      {{ value }}
    </template>
    <template #option="{ option }">
      <slot name="tag" :tag="option.value">
        <span class="p-tags-input__tag">{{ option.label }}</span>
      </slot>
    </template>
    <template #options-empty>
      <span />
    </template>
  </PCombobox>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import PCombobox from '@/components/Combobox/PCombobox.vue'

  const props = withDefaults(defineProps<{
    modelValue: string[] | null | undefined,
    placeholder?: string,
    optionsClass?: string,
  }>(), {
    placeholder: 'Add tag',
    optionsClass: undefined,
  })

  const emit = defineEmits<{
    (event: 'update:modelValue', value: string[]): void,
  }>()

  const internalValue = computed({
    get() {
      return props.modelValue ?? []
    },
    set(value) {
      emit('update:modelValue', value)
    },
  })
</script>