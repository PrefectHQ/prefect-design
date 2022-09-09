/* eslint-disable no-redeclare */
import { computed, InjectionKey, provide, Ref, ref } from 'vue'
import { Step, UseWizard, ValidationState } from '../types'
import { getStepKey } from '../utilities'

export const useWizardKey: InjectionKey<UseWizard> = Symbol('UseWizard')

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function useWizard(steps: Step[] | Ref<Step[]>) {
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

  function goto(key: string): void
  function goto(index: number): void
  function goto(step: Step): void
  function goto(keyIndexOrStep: Step | string | number): void
  function goto(keyIndexOrStep: Step | string | number): void {
    const index = typeof keyIndexOrStep === 'number' ? getZeroBasedIndex(keyIndexOrStep) : getStepIndex(keyIndexOrStep)

    new Promise<ValidationState[]>(resolve => {
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
  function getStepIndex(step: Step): number
  function getStepIndex(keyOrStep: string | Step): number
  function getStepIndex(keyOrStep: string | Step): number {
    const step = typeof keyOrStep === 'object' ? keyOrStep : getStep(keyOrStep)

    if (!step) {
      return -1
    }

    return stepsRef.value.indexOf(step)
  }

  function getStep(key: string): Step | undefined
  function getStep(index: number): Step | undefined
  function getStep(keyOrIndex: string | number): Step | undefined
  function getStep(keyOrIndex: string | number): Step | undefined {
    if (typeof keyOrIndex === 'number') {
      return stepsRef.value[keyOrIndex]
    }

    return stepsRef.value.find(step => getStepKey(step) === keyOrIndex)
  }

  function setStep(key: string, step: Step): void {
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