export type SelectOption = {
  label: string,
  value: string | number | null,
}

export function isSelectOption(input: string | number | SelectOption): input is SelectOption {
  return typeof input === 'object'
}