<template>
  <slot />
</template>

<script lang="ts" setup>
  import { computed, provide, watchEffect } from 'vue'
  import { useWizardStep, useWizardStepKey } from './compositions'
  import { WizardStep } from './types'
  import { getStepKey } from './utilities'

  const props = defineProps<{
    step: WizardStep,
  }>()

  const key = computed(() => getStepKey(props.step))
  const wizardStep = useWizardStep(key)

  watchEffect(() => {
    provide(useWizardStepKey, wizardStep)
  })
</script>