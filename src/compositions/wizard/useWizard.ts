/* eslint-disable no-redeclare */
import { computed, InjectionKey, provide, Ref, ref } from 'vue'
import { WizardStep, UseWizard, ValidationState } from '@/types/wizard'
import { getStepKey } from '@/utilities/wizard'

export const useWizardKey: InjectionKey<UseWizard> = Symbol('UseWizard')

export function useWizard(steps: WizardStep[] | Ref<WizardStep[]>): UseWizard {
  const loading = ref(false)
  const stepsRef = ref(steps)
  const currentStepIndex = ref(0)
  const currentStep = computed(() => stepsRef.value[currentStepIndex.value])

  function next(): void {
    const index = getOneBasedIndex(currentStepIndex.value)

    goto(index + 1)
  }

  function previous(): void {
    const index = getOneBasedIndex(currentStepIndex.value)

    goto(index - 1)
  }

  function goto(key: string): Promise<void>
  function goto(index: number): Promise<void>
  function goto(step: WizardStep): Promise<void>
  function goto(keyIndexOrStep: WizardStep | string | number): Promise<void>
  function goto(keyIndexOrStep: WizardStep | string | number): Promise<void> {
    const index = typeof keyIndexOrStep === 'number' ? getZeroBasedIndex(keyIndexOrStep) : getStepIndex(keyIndexOrStep)

    return new Promise<ValidationState[]>(resolve => {
      loading.value = true

      if (index < 0 || index >= stepsRef.value.length) {
        resolve([{ index: currentStepIndex.value, valid: false }])
      }

      const validators = getValidators(index)

      return resolve(Promise.all(validators))
    })
      .then(validStates => {
        const firstFailure = validStates.find(({ valid }) => !valid)

        currentStepIndex.value = firstFailure?.index ?? index
      })
      .finally(() => loading.value = false)
  }

  function getZeroBasedIndex(index: number): number {
    return index - 1
  }

  function getOneBasedIndex(index: number): number {
    return index + 1
  }

  function getStepIndex(key: string): number
  function getStepIndex(step: WizardStep): number
  function getStepIndex(keyOrStep: string | WizardStep): number
  function getStepIndex(keyOrStep: string | WizardStep): number {
    const step = typeof keyOrStep === 'object' ? keyOrStep : getStep(keyOrStep)

    if (!step) {
      return -1
    }

    return stepsRef.value.indexOf(step)
  }

  function getStep(key: string): WizardStep | undefined
  function getStep(index: number): WizardStep | undefined
  function getStep(keyOrIndex: string | number): WizardStep | undefined
  function getStep(keyOrIndex: string | number): WizardStep | undefined {
    if (typeof keyOrIndex === 'number') {
      return stepsRef.value[keyOrIndex]
    }

    return stepsRef.value.find(step => getStepKey(step) === keyOrIndex)
  }

  function setStep(key: string, step: WizardStep): void {
    const index = getStepIndex(key)

    if (index === -1) {
      return
    }

    stepsRef.value.splice(index, 1, step)
  }

  function getValidators(index?: number): Promise<ValidationState>[] {
    const targetIndex = index ?? currentStepIndex.value + 1

    return stepsRef.value
      .slice(currentStepIndex.value, targetIndex)
      .map(async ({ validate }, index) => {
        const valid = validate ? await validate() : true

        return {
          valid,
          index: index + currentStepIndex.value,
        }
      })
  }

  async function isValid(index?: number): Promise<boolean> {
    const validators = getValidators(index)
    const valid = await Promise.all(validators)

    return valid.every(({ valid }) => valid)
  }

  const wizard = {
    steps: stepsRef,
    currentStepIndex,
    currentStep,
    loading,
    next,
    previous,
    goto,
    getStepIndex,
    getStep,
    setStep,
    isValid,
  }

  provide(useWizardKey, wizard)

  return wizard
}