export type SelectModelValue = string | number | null

export type SelectOption = {
  label: string,
  value: SelectModelValue,
  disabled?: boolean,
}

export function isSelectOption(input: string | number | SelectOption): input is SelectOption {
  return typeof input === 'object'
}