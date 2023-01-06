export type SelectModelValue = string | number | boolean | null

export type SelectOption = {
  label: string,
  value: SelectModelValue,
  disabled?: boolean,
  group?: string,
}

export type SelectOptions = (string | number | boolean | SelectOption)[]

export function isSelectOption(value: unknown): value is SelectOption {
  return value !== null && typeof value === 'object' && 'label' in value && 'value' in value
}

export function optionIncludes(option: SelectOption, target: string | null): boolean {
  if (typeof target !== 'string') {
    return true
  }

  return option.label.toLowerCase().includes(target.toLowerCase())
}

export function toSelectOptions(value: SelectModelValue | SelectOption): SelectOption {
  if (isSelectOption(value)) {
    return value
  }

  return { label: value ? value.toLocaleString() : '', value }
}