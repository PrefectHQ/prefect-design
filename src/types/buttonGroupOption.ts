import { Icon } from '@/types/icon'

export type ButtonGroupValue = string | number | boolean | null

export type ButtonGroupOption<T extends ButtonGroupValue = ButtonGroupValue> = {
  label?: string,
  value: T,
  disabled?: boolean,
  icon?: Icon,
}

export function isButtonGroupOption<T extends ButtonGroupValue>(input: T | ButtonGroupOption<T>): input is ButtonGroupOption<T> {
  return typeof input === 'object'
}