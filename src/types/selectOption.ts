export type SelectModelValue = string | number | boolean | null
export type SelectOption = string | number | boolean | {
  label: string,
  value: SelectModelValue,
  disabled?: boolean,
}
export type SelectOptionNormalized = Exclude<SelectOption, string | number | boolean>

export type SelectOptionGroup = {
  label: string,
  options: (SelectOption | SelectOptionGroup)[],
}
export type SelectOptionGroupNormalized = {
  label: string,
  options: (SelectOptionNormalized | SelectOptionGroupNormalized)[],
}

export function isSelectOptionNormalized(value: unknown): value is SelectOptionNormalized {
  return value !== null && typeof value === 'object' && 'label' in value && 'value' in value
}

export function isSelectOptionGroup(value: unknown): value is SelectOptionGroup {
  return value !== null && typeof value === 'object' && 'label' in value && 'options' in value && Array.isArray(value.options)
}

export function filterOptionGroup(optionGroup: SelectOptionGroupNormalized, term: string | null): SelectOptionGroupNormalized {
  return {
    ...optionGroup,
    options: filterOptionsOrOptionGroups(optionGroup.options, term),
  }
}

export function filterOptionsOrOptionGroups(optionsOrOptionGroups: (SelectOptionNormalized | SelectOptionGroupNormalized)[], term: string | null): (SelectOptionNormalized | SelectOptionGroupNormalized)[] {
  return optionsOrOptionGroups
    .map(optionOrGroup => {
      if (isSelectOptionGroup(optionOrGroup)) {
        return filterOptionGroup(optionOrGroup, term)
      }

      return optionOrGroup
    })
    .filter(optionOrGroup => {
      if (isSelectOptionGroup(optionOrGroup)) {
        return optionOrGroup.options.length > 0
      }

      return optionIncludes(optionOrGroup, term)
    })
}

export function optionIncludes(option: SelectOptionNormalized, term: string | null): boolean {
  if (typeof term !== 'string') {
    return true
  }

  return option.label.toLowerCase().includes(term.toLowerCase())
}

export function normalizeSelectOption(value: SelectOption): SelectOptionNormalized
export function normalizeSelectOption(value: SelectOptionGroup): SelectOptionGroupNormalized
export function normalizeSelectOption(value: SelectOption | SelectOptionGroup): SelectOptionNormalized | SelectOptionGroupNormalized
export function normalizeSelectOption(value: SelectOption | SelectOptionGroup): SelectOptionNormalized | SelectOptionGroupNormalized {
  if (isSelectOptionNormalized(value)) {
    return value
  }

  if (isSelectOptionGroup(value)) {
    return {
      ...value,
      options: value.options.map(normalizeSelectOption),
    }
  }

  return { label: value ? value.toLocaleString() : '', value }
}

export function flattenSelectOptions(value: (SelectOptionNormalized | SelectOptionGroupNormalized)[]): SelectOptionNormalized[] {
  return value.flatMap(optionOrGroup => {
    if (isSelectOptionNormalized(optionOrGroup)) {
      return optionOrGroup
    }

    return flattenSelectOptions(optionOrGroup.options)
  })
}