import { Step } from '../types'
import { kebabCase } from '@/utilities'

export function getStepKey(step: Step): string {
  return step.key ?? kebabCase(step.title)
}