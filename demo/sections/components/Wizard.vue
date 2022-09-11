<template>
  <ComponentPage title="Wizard" :demos="[{ title: 'Wizard' }]">
    <template #description>
      This is where we add a short description of <p-code>p-wizard</p-code>. Describe the components intent, not hyper specific documentation that belongs on vitepress page.
    </template>

    <template #wizard>
      <p-wizard :steps="steps">
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
  import { Step } from '@/components/Wizard'
  import { ref } from 'vue'
  import ComponentPage from '@/demo/components/ComponentPage.vue'
  import StepOne from '@/demo/components/wizard/StepOne.vue'
  import StepThree from '@/demo/components/wizard/StepThree.vue'
  import StepTwo from '@/demo/components/wizard/StepTwo.vue'

  const steps: Step[] = [
    { title: 'Basic Information' },
    { title: 'Terms and Conditions' },
    { title: 'Review' },
  ]

  const formData = ref({
    favoriteColor: '',
    agrees: false,
  })
</script>