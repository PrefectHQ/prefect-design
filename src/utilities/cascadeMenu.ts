import { Icon } from '@/types/icon'

export type CascadeMenuValue<V = unknown> = (V | CascadeMenuValue<V>[])[]

export type CascadeDataChildren<T, V> = CascadeData<T, V>[] | (() => CascadeData<T, V>[] | Promise<CascadeData<T, V>[]>)

export type CascadeData<T = unknown, V = unknown> = {
  label: string,
  value?: V,
  multiple?: boolean,
  icon?: Icon,
  children?: CascadeDataChildren<T, V>,
  data?: T,
}

export async function resolveChildren<T = unknown, V = unknown>(item: CascadeData<T, V>): Promise<CascadeData<T, V>[] | undefined> {
  const { children } = item
  let _children: CascadeData<T, V>[] | undefined

  if (typeof children === 'function') {
    _children = await children()
  } else {
    _children = children
  }

  return _children
}