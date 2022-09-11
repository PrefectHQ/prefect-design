/* eslint-disable no-redeclare */
import { inject, InjectionKey, ref, Ref, computed } from 'vue'
import { WizardNotFound, WizardStepNotFound } from '../errors'
import { Step, UseWizard, UseWizardStep, WizardStepValidator } from '../types'
import { useWizardKey } from './useWizard'

export const useWizardStepKey: InjectionKey<Required<UseWizardStep>> = Symbol('UseWizardStep')

function useWizardStep(): UseWizardStep
function useWizardStep(key: string | Ref<string>): Required<UseWizardStep>
function useWizardStep(key?: string | Ref<string>): UseWizardStep {
  const wizard = getWizard()

  if (!key) {
    return {
      wizard,
    }
  }

  const keyRef = ref(key)
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

  return {
    wizard,
    step,
    defineValidate: (validate: WizardStepValidator) => {
      step.value = {
        ...step.value,
        validate,
      }
    },
  }
}

export { useWizardStep }