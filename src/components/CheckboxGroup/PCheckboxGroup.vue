<template>
  <fieldset class="p-checkbox-group" :class="classes" :style="styles" :disabled="disabled">
    <template v-for="(option, index) in checkboxOptions" :key="index">
      <PCheckbox
        v-model="modelValue"
        v-bind="attrs"
        :label="option.label"
        :value="option.value"
        :disabled="disabled || option.disabled"
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
  import { normalizeSelectOption, SelectOptionNormalized } from '@/types'

  const props = defineProps<{
    modelValue: string[] | number[] | boolean[],
    options: string[] | number[] | boolean[] | SelectOptionNormalized[],
    disabled?: boolean,
  }>()

  const emits = defineEmits<{
    (event: 'update:modelValue', value: string[] | number[] | boolean[]): void,
  }>()

  const modelValue = computed({
    get() {
      return props.modelValue
    },
    set(value) {
      emits('update:modelValue', value)
    },
  })

  const checkboxOptions = computed(() => {
    return props.options.map(option => normalizeSelectOption(option))
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