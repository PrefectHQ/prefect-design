<template>
  <div class="p-native-select">
    <span class="p-native-select__icon">
      <p-icon icon="SelectorIcon" />
    </span>

    <select v-model="internalValue" class="p-native-select__control" :multiple="multiple" v-bind="$attrs">
      <template v-for="(option, index) in selectOptions" :key="index">
        <option class="p-native-select__option" :class="classes" :value="option.value" :selected="option.value === internalValue">
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
  import { isSelectOption, SelectOption } from '@/types/selectOption'

  const props = defineProps<{
    modelValue: string | number | null | (string | number | null)[] | undefined,
    options: (string | number | SelectOption)[],
    multiple?: boolean,
  }>()

  const emits = defineEmits<{
    (event: 'update:modelValue', value: Exclude<typeof props.modelValue, undefined>): void,
  }>()

  const internalValue = computed({
    get() {
      return props.modelValue ?? null
    },
    set(value: Exclude<typeof props.modelValue, undefined>) {
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
    'p-native-select__option--multiple': props.multiple,
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
  focus:border-prefect-500
  rounded-md
  appearance-none
  bg-none
}

.p-native-select__option--multiple { @apply
  pb-1
}
</style>