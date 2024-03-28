import { Icon } from '@/types/icon'
import { isDefined } from '@/utilities/isDefined'

export type CascadeValue<V = unknown> = V | V[] | undefined
export type CascadeDataFunction<V> = (() => Promise<CascadeData<V>[]>) | (() => CascadeData<V>[])

export type CascadeData<V = unknown> = {
  label?: string,
  value?: CascadeValue<V>,
  multiple?: boolean,
  icon?: Icon,
  children?: CascadeData<V>[] | CascadeDataFunction<V>,
}

export async function resolveChildren<V = unknown>(item: CascadeData<V>): Promise<CascadeData<V>[] | undefined> {
  const { children } = item
  let _children: CascadeData<V>[] | undefined

  if (typeof children === 'function') {
    _children = await children()
  } else if (Array.isArray(children)) {
    _children = children
  }

  return _children
}

export function valueIsSet<V = unknown>(value: CascadeValue<V>): boolean {
  return Array.isArray(value) ? value.length > 0 : isDefined(value)
}


export function valueIncludesValue<V = unknown>(value: CascadeValue<V>, target: V): boolean {
  if (Array.isArray(value)) {
    return value.includes(target)
  }

  return value === target
}

// Need a way to resolve a value that might not be present in the original list
// maybe provide an accessor function?
// this method is very slow (O(n^2))
export async function valueIsInDescendants<V = unknown>(value: CascadeValue<V>, item: CascadeData<V>): Promise<boolean> {
  const children = await resolveChildren(item)

  if (children) {
    for await (const child of children) {
      const isInDescendent = await valueIsInDescendants(value, child)
      if (isInDescendent) {
        return true
      }
    }
  }

  return valueIncludesValue(value, item.value)
}