<template>
  <div class="step-one">
    <p-content>
      <p-form @submit="wizard.next">
        <p-label label="Favorite Color" :state :message="error">
          <p-text-input v-model="internalValue" />
        </p-label>
      </p-form>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore obcaecati mollitia suscipit minus itaque magni velit maiores beatae impedit ex delectus accusamus commodi enim non, laudantium pariatur ab deserunt. Non.
      </p>
    </p-content>
  </div>
</template>

<script lang="ts" setup>
  import { useWizardStep } from '@/compositions/wizard'
  import { useValidation } from '@prefecthq/vue-compositions'
  import { computed } from 'vue'

  const props = defineProps<{
    modelValue: string,
  }>()

  const emits = defineEmits<{
    (event: 'update:modelValue', value: string): void,
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


  const { error, state, validate } = useValidation(internalValue, 'Favorite color', (value) => {
    if (value.length === 0) {
      return 'Favorite color is required'
    }

    return true
  })


  defineValidate(() => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(validate())
      }, 2000)
    })
  })
</script>