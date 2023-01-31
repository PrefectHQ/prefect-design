export type TagValue = {
  label: string,
  value: unknown,
}

export function isTagValue(value: unknown): value is TagValue {
  return value !== null
    && typeof value === 'object'
    && 'label' in value
    && typeof value.label === 'string'
    && 'value' in value
}

export function normalize(value: string | TagValue): TagValue {
  if (isTagValue(value)) {
    return value
  }

  return {
    label: value,
    value,
  }
}