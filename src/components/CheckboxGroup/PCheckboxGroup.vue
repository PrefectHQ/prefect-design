<template>
  <fieldset class="p-checkbox-group" :class="classes" :style="styles" :disabled="disabled">
    <template v-for="(option, index) in checkboxOptions" :key="index">
      <PCheckbox
        v-model="internalModelValue"
        v-bind="attrs"
        :label="option.label"
        :value="option.value"
        :disabled="option.disabled"
      >
        <template #label>
          <slot name="label" :option="option" />
        </template>
      </PCheckbox>
    </template>
  </fieldset>
</template>

<script lang="ts">
  export default {
    name: 'PCheckboxGroup',
    expose: [],
    inheritAttrs: false,
  }
</script>

<script lang="ts" setup>
  import { computed } from 'vue'
  import { PCheckbox } from '@/components/Checkbox'
  import { useAttrsStylesAndClasses } from '@/compositions'
  import { isSelectOption, SelectOption } from '@/types'

  const props = defineProps<{
    modelValue: string[] | number[] | boolean[],
    options: string[] | number[] | boolean[] | SelectOption[],
    disabled?: boolean,
  }>()

  const emits = defineEmits<{
    (event: 'update:modelValue', value: string[] | number[] | boolean[]): void,
  }>()

  const internalModelValue = computed({
    get() {
      return props.modelValue
    },
    set(value: string[] | number[] | boolean[]) {
      emits('update:modelValue', value)
    },
  })

  const checkboxOptions = computed<SelectOption[]>(() => {
    return props.options.map(option => {
      if (isSelectOption(option)) {
        return option
      }

      return { label: option.toLocaleString(), value: option }
    })
  })

  const { classes, styles, attrs } = useAttrsStylesAndClasses()
</script>

<style>
.p-checkbox-group { @apply
  flex
  flex-col
  items-start
  gap-2
}
</style>