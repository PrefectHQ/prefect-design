<template>
  <PBaseInput class="p-native-select">
    <template v-for="(index, name) in $slots" #[name]="data">
      <slot :name="name" v-bind="data" />
    </template>
    <template #control="{ attrs }">
      <select v-model="modelValue" class="p-native-select__control" :class="classes" :multiple="multiple" v-bind="attrs">
        <template v-for="(option, index) in selectOptions" :key="index">
          <template v-if="isSelectOptionGroup(option)">
            <optgroup :label="option.label">
              <template v-for="(nestedOption, nestedIndex) in option.options" :key="nestedIndex">
                <option class="p-native-select__option" :value="nestedOption.value" :selected="nestedOption.value === modelValue" :disabled="nestedOption.disabled">
                  {{ nestedOption.label }}
                </option>
              </template>
            </optgroup>
          </template>

          <template v-else>
            <option class="p-native-select__option" :value="option.value" :selected="option.value === modelValue" :disabled="option.disabled">
              {{ option.label }}
            </option>
          </template>
        </template>
      </select>

      <select class="p-native-select__control p-native-select__control--placeholder" :class="classes" v-bind="attrs" />
    </template>
    <template #append>
      <span class="p-native-select__icon">
        <PIcon icon="ChevronUpDownIcon" />
      </span>
    </template>
  </PBaseInput>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import PBaseInput from '@/components/BaseInput/PBaseInput.vue'
  import PIcon from '@/components/Icon/PIcon.vue'
  import { MaybeReadonly } from '@/types'
  import { SelectModelValue, SelectOptionGroup, normalizeSelectOption, isSelectOptionGroup, flattenSelectOptions, SelectOption } from '@/types/selectOption'

  const props = defineProps<{
    modelValue: string | number | boolean | null | SelectModelValue[] | undefined,
    options: MaybeReadonly<(SelectOption | SelectOptionGroup)[]>,
  }>()

  const emits = defineEmits<{
    (event: 'update:modelValue', value: SelectModelValue | SelectModelValue[]): void,
  }>()

  const modelValue = computed({
    get() {
      return props.modelValue ?? null
    },
    set(value) {
      emits('update:modelValue', value)
    },
  })

  const multiple = computed(() => Array.isArray(modelValue.value))

  const selectOptions = computed(() => {
    return props.options.map(optionOrGroup => {
      const normalized = normalizeSelectOption(optionOrGroup)

      if (isSelectOptionGroup(normalized)) {
        return {
          ...normalized,
          options: flattenSelectOptions(normalized.options),
        }
      }

      return normalized
    })
  })

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
  cursor-pointer
  absolute
  left-0
  right-0
  top-0
  bottom-0
  py-2
  rounded-default
  border-0
  focus:ring-0
  appearance-none
  bg-none;
  color: var(--p-color-input-text);
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