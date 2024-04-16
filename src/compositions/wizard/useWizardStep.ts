/* eslint-disable no-redeclare */
import { inject, InjectionKey, ref, Ref, computed } from 'vue'
import { useWizard } from '@/compositions/wizard/useWizard'
import { WizardStepNotFound } from '@/models/wizard'
import { UseWizardStep, WizardStepValidator } from '@/types/wizard'

export const useWizardStepKey: InjectionKey<UseWizardStep> = Symbol('UseWizardStep')

export function useWizardStep(key?: string | Ref<string>): UseWizardStep {
  if (!key) {
    const step = inject(useWizardStepKey)

    if (!step) {
      throw new WizardStepNotFound()
    }

    return step
  }

  const wizard = useWizard()
  const keyRef = ref(key)

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