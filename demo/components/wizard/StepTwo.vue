<template>
  <div class="step-two">
    <p-form @submit="wizard">
      <p-label label="Here are my terms, agree or perish">
        <p-checkbox v-model="internalValue" label="I agree" />
      </p-label>
    </p-form>
  </div>
</template>

<script lang="ts" setup>
  import { useWizardStepKey } from '@/components/Wizard/compositions'
  import { computed, inject } from 'vue'

  const props = defineProps<{
    modelValue: boolean,
  }>()

  const emits = defineEmits<{
    (event: 'update:modelValue', value: boolean): void,
  }>()

  const internalValue = computed({
    get() {
      return props.modelValue
    },
    set(value: boolean) {
      emits('update:modelValue', value)
    },
  })

  const { wizard, defineValidate } = inject(useWizardStepKey)!

  defineValidate(() => internalValue.value)
</script>