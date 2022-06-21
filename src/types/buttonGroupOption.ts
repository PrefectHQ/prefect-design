import { Icon } from './icon'
import { SelectModelValue } from './selectOption'

export type ButtonGroupOption = {
  label: string,
  value: SelectModelValue,
  disabled?: boolean,
  icon?: Icon,
}

export function isButtonGroupOption(input: string | number | ButtonGroupOption): input is ButtonGroupOption {
  return typeof input === 'object'
}