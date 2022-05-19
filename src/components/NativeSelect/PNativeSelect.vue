<template>
  <div class="p-native-select">
    <span class="p-native-select__icon">
      <p-icon icon="SelectorIcon" />
    </span>

    <select v-model="internalValue" class="p-native-select__control" :class="classes" :multiple="multiple" v-bind="$attrs">
      <template v-for="(option, index) in selectOptions" :key="index">
        <option class="p-native-select__option" :value="option.value" :selected="option.value === internalValue" :disabled="option.disabled">
          {{ option.label }}
        </option>
      </template>
    </select>
  </div>
</template>

<script lang="ts">
  import { defineComponent, computed } from 'vue'

  export default defineComponent({
    name: 'PNativeSelect',
    expose: [],
    inheritAttrs: false,
  })
</script>

<script lang="ts" setup>
  import PIcon from '@/components/Icon'
  import { isSelectOption, SelectModelValue, SelectOption } from '@/types/selectOption'

  const props = defineProps<{
    modelValue: string | number | null | SelectModelValue[] | undefined,
    options: (string | number | SelectOption)[],
    multiple?: boolean,
  }>()

  const emits = defineEmits<{
    (event: 'update:modelValue', value: SelectModelValue | SelectModelValue[]): void,
  }>()

  const internalValue = computed({
    get() {
      return props.modelValue ?? null
    },
    set(value: SelectModelValue | SelectModelValue[]) {
      emits('update:modelValue', value)
    },
  })

  const selectOptions = computed<SelectOption[]>(() => props.options.map(option => {
    if (isSelectOption(option)) {
      return  option
    }

    return { label: option.toLocaleString(), value: option }
  }))

  const classes = computed(() => ({
    'p-native-select__control--multiple': props.multiple,
  }))
</script>

<style>
.p-native-select { @apply
  relative
}

.p-native-select__icon { @apply
  absolute
  inset-y-0
  right-0
  pr-2
  z-[2]
  flex
  items-center
  pointer-events-none
}

.p-native-select__icon svg { @apply
  w-4
  h-4
}

.p-native-select__control { @apply
  block
  w-full
  pl-3
  pr-10
  text-base
  py-2
  border
  border-gray-300
  focus:outline-none
  focus:ring-1
  focus:ring-prefect-500
  focus:border-prefect-500
  rounded-md
  appearance-none
  bg-none
}

.p-native-select__control--multiple { @apply
  h-10
}
</style>