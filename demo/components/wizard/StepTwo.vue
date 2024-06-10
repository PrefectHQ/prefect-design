<template>
  <div class="step-two">
    <p-form @submit="wizard.next">
      <p-label label="Here are my terms, agree or perish" :state :message="error">
        <p-checkbox v-model="internalValue" label="I agree" />
      </p-label>
    </p-form>
  </div>
</template>

<script lang="ts" setup>
  import { useWizardStep } from '@/compositions/wizard'
  import { useValidation } from '@prefecthq/vue-compositions'
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

  const { error, state, validate } = useValidation(internalValue, (value) => {
    if (!value) {
      return 'You must accept the terms and conditions to continue.'
    }

    return true
  })


  defineValidate(validate)
</script>