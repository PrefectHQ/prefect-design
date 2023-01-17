<template>
  <div class="step-two">
    <p-form @submit="wizard.next">
      <p-label label="Here are my terms, agree or perish">
        <p-checkbox v-model="internalValue" label="I agree" />
      </p-label>
    </p-form>
  </div>
</template>

<script lang="ts" setup>
  import { useWizardStep } from '@/compositions/wizard'
  import { computed } from 'vue'

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
    set(value) {
      emits('update:modelValue', value)
    },
  })

  const { wizard, defineValidate } = useWizardStep()

  defineValidate(() => internalValue.value)
</script>