export type SelectModelValue = string | number | boolean | null

export type SelectOption = {
  label: string,
  value: SelectModelValue,
  disabled?: boolean,
}

export function isSelectOption(input: string | number | boolean | SelectOption): input is SelectOption {
  return typeof input === 'object'
}

export function optionIncludes(option: SelectOption, target: string | null): boolean {
  if (typeof target !== 'string') {
    return true
  }

  return option.label.toLowerCase().includes(target.toLowerCase())
}