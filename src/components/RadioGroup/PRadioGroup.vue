<template>
  <div class="p-radio-group" :class="classes" :style="styles">
    <template v-for="(option, index) in radioOptions" :key="index">
      <p-radio
        v-model="value"
        v-bind="attrs"
        :label="option.label"
        :value="option.value"
        :disabled="option.disabled || disabled"
      >
        <template #label>
          <slot name="label" :option="option" />
        </template>
      </p-radio>
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
  import { useAttrsStylesAndClasses } from '@/compositions/attributes'
  import { isSelectOption, SelectOption } from '@/types/selectOption'

  const props = defineProps<{
    modelValue: string | number | boolean | null | undefined,
    options: string[] | SelectOption[],
    disabled?: boolean,
  }>()

  const emits = defineEmits<{
    (event: 'update:modelValue', value: string | number | boolean | null): void,
  }>()

  const value = computed({
    get() {
      return props.modelValue ?? null
    },
    set(value: string | number | boolean | null) {
      emits('update:modelValue', value)
    },
  })

  const radioOptions = computed<SelectOption[]>(() => {
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
.p-radio-group { @apply
  flex
  flex-col
  items-start
  gap-2
}
</style>