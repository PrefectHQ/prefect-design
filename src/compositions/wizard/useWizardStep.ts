/* eslint-disable no-redeclare */
import { inject, InjectionKey, ref, Ref, computed } from 'vue'
import { useWizardKey } from '@/compositions/wizard/useWizard'
import { WizardNotFound, WizardStepNotFound } from '@/models/wizard'
import { UseWizard, UseWizardStep, WizardStepValidator } from '@/types/wizard'

export const useWizardStepKey: InjectionKey<UseWizardStep> = Symbol('UseWizardStep')

export function useWizardStep(key?: string | Ref<string>): UseWizardStep {
  if (!key) {
    const step = inject(useWizardStepKey)

    if (!step) {
      throw new WizardStepNotFound()
    }

    return step
  }

  const wizard = getWizard()
  const keyRef = ref(key)

  function getWizard(): UseWizard {
    const wizardOrUndefined = inject(useWizardKey)

    if (!wizardOrUndefined) {
      throw new WizardNotFound()
    }

    return wizardOrUndefined
  }

  const step = computed(() => {
    const value = wizard.getStep(keyRef.value)

    if (!value) {
      throw new WizardStepNotFound()
    }

    return value
  })

  return {
    wizard,
    step,
    defineValidate: (validate: WizardStepValidator) => {
      wizard.setStep(keyRef.value, {
        ...step.value,
        validate,
      })
    },
  }
}