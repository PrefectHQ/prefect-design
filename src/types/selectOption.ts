export type SelectModelValue = string | number | boolean | null

export type SelectOption = {
  label: string,
  value: SelectModelValue,
  disabled?: boolean,
}

export type SelectOptionGroup = {
  label: string,
  options: SelectOption[],
}

export type SelectOptions = (string | number | boolean | SelectOption | SelectOptionGroup)[]

export function isSelectOption(value: unknown): value is SelectOption {
  return value !== null && typeof value === 'object' && 'label' in value && 'value' in value
}

export function isSelectOptionGroup(value: unknown): value is SelectOptionGroup {
  return value !== null && typeof value === 'object' && 'label' in value && 'options' in value && Array.isArray(value.options)
}

export function optionIncludes(option: SelectOption, target: string | null): boolean {
  if (typeof target !== 'string') {
    return true
  }

  return option.label.toLowerCase().includes(target.toLowerCase())
}

export function toSelectOption(value: SelectModelValue | SelectOption): SelectOption {
  if (isSelectOption(value)) {
    return value
  }

  return { label: value ? value.toLocaleString() : '', value }
}

export function toSelectOptionOrGroup(value: SelectModelValue | SelectOption | SelectOptionGroup): SelectOption | SelectOptionGroup {
  if (isSelectOptionGroup(value)) {
    return value
  }

  return toSelectOption(value)
}

export function flattenSelectOptions(value: (SelectOption | SelectOptionGroup)[]): SelectOption[] {
  return value.flatMap(optionOrGroup => {
    if (isSelectOption(optionOrGroup)) {
      return optionOrGroup
    }

    return optionOrGroup.options
  })
}