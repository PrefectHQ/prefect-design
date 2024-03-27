import { Icon } from '@/types/icon'

export type CascadeDataChildren<T, V> = CascadeData<T, V>[] | (() => CascadeData<T, V>[] | Promise<CascadeData<T, V>[]>)

export type CascadeData<T = unknown, V = unknown> = {
  id: string,
  value?: V,
  label?: string,
  icon?: Icon,
  children?: CascadeDataChildren<T, V>,
  data?: T,
}

export async function resolveChildren(item: CascadeData): Promise<CascadeData[] | undefined> {
  const { children } = item
  let _children: CascadeData[] | undefined

  if (typeof children === 'function') {
    _children = await children()
  } else {
    _children = children
  }

  return _children
}