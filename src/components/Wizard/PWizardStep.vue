<template>
  <slot />
</template>

<script lang="ts" setup>
  import { computed, provide, watchEffect } from 'vue'
  import { useWizardStep, useWizardStepKey } from '@/compositions/wizard'
  import { WizardStep } from '@/types/wizard'
  import { getStepKey } from '@/utilities/wizard'

  const props = defineProps<{
    step: WizardStep,
  }>()

  const key = computed(() => getStepKey(props.step))
  const wizardStep = useWizardStep(key)

  watchEffect(() => {
    provide(useWizardStepKey, wizardStep)
  })
</script>