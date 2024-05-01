<template>
  <component :is="radix ? RCombobox : PComboboxOld" v-bind="props" v-model="modelValue" v-model:search="search">
    <template v-for="(_, name) in $slots" #[name]="data">
      <slot :name="name" v-bind="data" />
    </template>
  </component>
</template>

<script lang="ts" setup>
  import PComboboxOld from '@/components/Combobox/PComboboxOld.vue'
  import RCombobox from '@/components/Combobox/RCombobox.vue'
  import { SelectModelValue, SelectOptionGroup, SelectOption } from '@/types/selectOption'

  const modelValue = defineModel<SelectModelValue | SelectModelValue[]>()
  const search = defineModel<string>('search')

  const props = withDefaults(defineProps<{
    options: (SelectOption | SelectOptionGroup)[],
    allowUnknownValue?: boolean,
    emptyMessage?: string,
    placeholder?: string,
    manual?: boolean,
    radix?: boolean,
  }>(), {
    emptyMessage: undefined,
    placeholder: 'Search',
  })

  defineEmits<{
    (event: 'bottom'): void,
  }>()
</script>