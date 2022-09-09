import { inject, InjectionKey, ref, Ref, computed } from 'vue'
import { WizardNotFound, WizardStepNotFound } from '../errors'
import { Step, UseWizard, UseWizardStep, WizardStepValidator } from '../types'
import { useWizardKey } from './useWizard'

export const useWizardStepKey: InjectionKey<UseWizardStep> = Symbol('UseWizardStep')

export function useWizardStep(key: string | Ref<string>): UseWizardStep {
  const keyRef = ref(key)
  const wizard = getWizard()

  const step = computed({
    get() {
      return getStep()
    },
    set(value: Step) {
      wizard.setStep(keyRef.value, value)
    },
  })

  function getWizard(): UseWizard {
    const wizardOrUndefined = inject(useWizardKey)

    if (!wizardOrUndefined) {
      throw new WizardNotFound()
    }

    return wizardOrUndefined
  }

  function getStep(): Step {
    const stepOrUndefined = wizard.getStep(keyRef.value)

    if (!stepOrUndefined) {
      throw new WizardStepNotFound()
    }

    return stepOrUndefined
  }

  function defineValidate(validate: WizardStepValidator): void {
    step.value = {
      ...step.value,
      validate,
    }
  }

  return { wizard, defineValidate }
}