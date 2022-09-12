<template>
  <div class="step-one">
    <p-content>
      <p-form @submit="wizard.next">
        <p-label label="Favorite Color">
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
  import { useWizardStep } from '@/components/Wizard/compositions'
  import { computed } from 'vue'

  // need to handle "submit" vs goto (last)
  // goto 3 passed validation on 2? -> because 2 was never mounted to define it's validation
  // easier way to add validation to future steps - pass state into ValidateMethod?
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
    set(value: string) {
      emits('update:modelValue', value)
    },
  })

  const { wizard, defineValidate } = useWizardStep()

  defineValidate(() => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(internalValue.value.length > 0)
      }, 2000)
    })
  })
</script>