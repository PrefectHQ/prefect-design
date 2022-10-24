<template>
  <PBaseInput class="p-native-select">
    <template v-for="(index, name) in $slots" #[name]="data">
      <slot :name="name" v-bind="data" />
    </template>
    <template #control="{ attrs }">
      <select v-model="internalValue" class="p-native-select__control" :class="classes" :multiple="multiple" v-bind="attrs">
        <template v-for="(option, index) in selectOptions" :key="index">
          <option class="p-native-select__option" :value="option.value" :selected="option.value === internalValue" :disabled="option.disabled">
            {{ option.label }}
          </option>
        </template>
      </select>
      <select v-model="internalValue" class="p-native-select__control p-native-select__control--placeholder" :class="classes" :multiple="multiple" v-bind="attrs">
        <template v-for="(option, index) in selectOptions" :key="index">
          <option class="p-native-select__option" :value="option.value" :selected="option.value === internalValue" :disabled="option.disabled">
            {{ option.label }}
          </option>
        </template>
      </select>
    </template>
    <template #append>
      <span class="p-native-select__icon">
        <PIcon icon="SelectorIcon" />
      </span>
    </template>
  </PBaseInput>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import PBaseInput from '@/components/BaseInput/PBaseInput.vue'
  import PIcon from '@/components/Icon/PIcon.vue'
  import { isSelectOption, SelectModelValue, SelectOption } from '@/types/selectOption'

  const props = defineProps<{
    modelValue: string | number | boolean | null | SelectModelValue[] | undefined,
    options: (string | number | boolean | SelectOption)[],
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

  const multiple = computed(() => Array.isArray(internalValue.value))

  const selectOptions = computed<SelectOption[]>(() => props.options.map(option => {
    if (isSelectOption(option)) {
      return  option
    }

    return { label: option.toLocaleString(), value: option }
  }))

  const classes = computed(() => ({
    'p-native-select__control--multiple': multiple.value,
  }))
</script>

<style>
.p-native-select { @apply
  relative
}

.p-native-select__icon { @apply
  pr-2
  flex
  items-center
  z-10
  pointer-events-none
}

.p-native-select__icon .p-icon { @apply
  w-4
  h-4
}

.p-native-select__control { @apply
  bg-transparent
  absolute
  left-0
  right-0
  top-0
  bottom-0
  text-base
  py-2
  rounded-md
  border-0
  focus:ring-0
  appearance-none
  bg-none
}

.p-native-select__control:disabled { @apply
  cursor-not-allowed
}

.p-native-select__control--multiple { @apply
  h-10
}

.p-native-select__control--placeholder { @apply
  relative
  invisible
  w-full
}
</style>