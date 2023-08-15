<template>
  <div class="step-three">
    <CodeBlock language="js" :value="JSON.stringify(formData)" />
  </div>
</template>

<script lang="ts" setup>
  import { useWizardStep } from '@/compositions/wizard/useWizardStep'
  import CodeBlock from '../CodeBlock.vue'

  defineProps<{
    formData: {
      favoriteColor: string,
      agrees: boolean,
    },
  }>()

  const { defineValidate } = useWizardStep()

  defineValidate(() => {
    return true
  })
</script>

<style>
.step-three { @apply
  rounded-default
  overflow-hidden
}
</style>