import { Icon } from '@/types/icon'
import { SelectModelValue } from '@/types/selectOption'

export type ButtonGroupOption = {
  label?: string,
  value: SelectModelValue,
  disabled?: boolean,
  icon?: Icon,
}

export function isButtonGroupOption(input: SelectModelValue | ButtonGroupOption): input is ButtonGroupOption {
  return typeof input === 'object'
}