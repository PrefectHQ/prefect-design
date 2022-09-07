export type SelectModelValue = string | number | null

export type SelectOption = {
  label: string,
  value: SelectModelValue,
  disabled?: boolean,
}

export function isSelectOption(input: string | number | SelectOption): input is SelectOption {
  return typeof input === 'object'
}

export function optionStartsWith(option: SelectOption, target: string | null): boolean {
  if (typeof target !== 'string') {
    return true
  }

  return option.label.toLowerCase().startsWith(target.toLowerCase())
}