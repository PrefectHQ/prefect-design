<template>
  <component :is="radix ? RCombobox : PComboboxOld" v-bind="props" :model-value />
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import PComboboxOld from '@/components/Combobox/PComboboxOld.vue'
  import RCombobox from '@/components/Combobox/RCombobox.vue'
  import { SelectModelValue, SelectOptionGroup, SelectOption } from '@/types/selectOption'

  const modelValue = defineModel<SelectModelValue | SelectModelValue[]>()

  const props = withDefaults(defineProps<{
    options: (SelectOption | SelectOptionGroup)[],
    allowUnknownValue?: boolean,
    emptyMessage?: string,
    placeholder?: string,
    search?: string,
    manual?: boolean,
    radix?: boolean,
  }>(), {
    emptyMessage: undefined,
    placeholder: 'Search',
    search: undefined,
  })

  const emit = defineEmits<{
    (event: 'update:search', value: string | null): void,
    (event: 'bottom'): void,
  }>()
</script>