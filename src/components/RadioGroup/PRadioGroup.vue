<template>
  <div class="p-radio-group" :class="classes" :style="styles">
    <template v-for="(option, index) in radioOptions" :key="index">
      <PRadio
        v-model="modelValue"
        v-bind="attrs"
        :label="option.label"
        :value="option.value"
        :disabled="option.disabled || disabled"
      >
        <template #label>
          <slot name="label" :option="option" />
        </template>
      </PRadio>
    </template>
  </div>
</template>

<script lang="ts">
  export default {
    name: 'PRadioGroup',
    expose: [],
    inheritAttrs: false,
  }
</script>

<script lang="ts" setup>
  import { computed } from 'vue'
  import { PRadio } from '@/components/Radio'
  import { useAttrsStylesAndClasses } from '@/compositions/attributes'
  import { SelectModelValue, normalizeSelectOption, SelectOptionNormalized } from '@/types/selectOption'

  const props = defineProps<{
    modelValue: string | number | boolean | null | undefined,
    options: string[] | SelectOptionNormalized[],
    disabled?: boolean,
  }>()

  const emits = defineEmits<{
    (event: 'update:modelValue', value: SelectModelValue): void,
  }>()

  const modelValue = computed({
    get() {
      return props.modelValue ?? null
    },
    set(value) {
      emits('update:modelValue', value)
    },
  })

  const radioOptions = computed(() => {
    return props.options.map(option => normalizeSelectOption(option))
  })

  const { classes, styles, attrs } = useAttrsStylesAndClasses()
</script>

<style>
.p-radio-group { @apply
  flex
  flex-col
  items-start
  gap-2
}
</style>