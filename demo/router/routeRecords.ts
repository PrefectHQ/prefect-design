import { kebabCase } from '@/utilities'
import { RouteComponent, RouteRecordRaw } from 'vue-router'

export type ImportComponent = RouteComponent | (() => Promise<RouteComponent>)
export type Section = Record<string, ImportComponent>

export function isSection(value: unknown): value is Section {
  return typeof (value as Promise<unknown>).then !== 'function' && !(value as RouteComponent).name
}

export function convertSectionToRouteRecords(section: Section, isRoot = true): RouteRecordRaw[] {
  return Object.keys(section).map(name => {
    const componentOrSection = section[name]
    const path = isRoot ? `/${kebabCase(name)}` : kebabCase(name)
    const record = { name, path }

    if (isSection(componentOrSection)) {
      return {
        ...record,
        children: convertSectionToRouteRecords(componentOrSection, false),
      }
    }

    return {
      ...record,
      component: componentOrSection,
    }
  })
}