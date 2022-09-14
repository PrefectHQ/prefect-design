import { WizardStep } from '@/types/wizard'
import { kebabCase } from '@/utilities/strings'

export function getStepKey(step: WizardStep): string {
  return step.key ?? kebabCase(step.title)
}