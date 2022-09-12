import { WizardStep } from '../types'
import { kebabCase } from '@/utilities'

export function getStepKey(step: WizardStep): string {
  return step.key ?? kebabCase(step.title)
}