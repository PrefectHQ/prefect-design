<template>
  <ComponentPage title="Wizard" :demos="[{ title: 'Wizard' }]">
    <template #description>
      <p-checkbox v-model="nonlinear" label="Nonlinear" />
      <p-checkbox v-model="showSaveAndExit" label="Show Save & Exit" />
    </template>

    <template #wizard>
      <p-wizard :steps :nonlinear :show-save-and-exit @next="next" @submit="submit">
        <template #basic-information>
          <StepOne v-model="formData.favoriteColor" />
        </template>
        <template #terms-and-conditions>
          <StepTwo v-model="formData.agrees" />
        </template>
        <template #review>
          <StepThree :form-data="formData" />
        </template>
      </p-wizard>
    </template>
  </ComponentPage>
</template>

<script lang="ts" setup>
  import { WizardStep } from '@/types/wizard'
  import { ref } from 'vue'
  import ComponentPage from '@/demo/components/ComponentPage.vue'
  import StepOne from '@/demo/components/wizard/StepOne.vue'
  import StepThree from '@/demo/components/wizard/StepThree.vue'
  import StepTwo from '@/demo/components/wizard/StepTwo.vue'

  const nonlinear = ref(false)
  const showSaveAndExit = ref(false)

  const steps: WizardStep[] = [
    { title: 'Basic Information' },
    { title: 'Terms and Conditions' },
    { title: 'Review' },
  ]

  const formData = ref({
    favoriteColor: '',
    agrees: false,
  })

  function next(): void {
    console.log('next')
  }

  function submit(): void {
    console.log('submit')
  }
</script>