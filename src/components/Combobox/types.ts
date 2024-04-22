export type ComboboxOption<T> = T | ComboboxOptionObject<T>
export type ComboboxGroupedOption<T> = { label: string, options: ComboboxOption<T>[] }

export function isComboboxGroupedOption<T>(option: ComboboxOption<T> | ComboboxGroupedOption<T>): option is { label: string, options: ComboboxOption<T>[] } {
  return typeof option === 'object' && option != null && 'label' in option && 'options' in option && Array.isArray(option.options)
}

export type ComboboxOptionObject<T> = {
  label: string,
  value: T,
  disabled?: boolean,
}

export function isComboboxOptionObject<T>(option: ComboboxOption<T>): option is { label: string, value: T, disabled?: boolean } {
  return typeof option === 'object' && option != null && 'label' in option && 'value' in option
}