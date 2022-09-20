<template>
  <div class="p-radio-group" :class="classes" :style="styles">
    <template v-for="(option, index) in radioOptions" :key="index">
      <p-radio
        v-model="value"
        v-bind="attrs"
        :name="name"
        :label="option.label"
        :value="option.value"
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
  import { useAttrsStylesClassesAndListeners } from '@/compositions/attributes'
  import { isSelectOption, SelectOption } from '@/types/selectOption'
  import { randomId } from '@/utilities'

  const props = defineProps<{
    modelValue: string | null | undefined,
    options: string[] | SelectOption[],
  }>()

  const emits = defineEmits<{
    (event: 'update:modelValue', value: string | null): void,
  }>()

  const name = randomId()

  const value = computed({
    get() {
      return props.modelValue ?? null
    },
    set(value: string | null) {
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

  const { classes, styles, attrs } = useAttrsStylesClassesAndListeners()
</script>

<style>
.p-radio-group { @apply
  flex
  flex-col
  items-start
  gap-2
}
</style>