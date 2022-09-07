import { kebabCase } from '@/utilities'
import { RouteLocationNormalizedLoaded, RouteLocationRaw, RouteRecordName, RouteRecordRaw } from 'vue-router'
import { routeRecords } from '.'

export type RouteRecordsFlat = Record<string, RouteLocationRaw>

export const routeRecordsFlat = flattenRouteRecords(routeRecords)

function flattenRouteRecords(records: RouteRecordRaw[]): RouteRecordsFlat {
  return records.reduce((reduced, record) => {
    return {
      ...reduced,
      ...flattenRouteRecord(record),
    }
  }, {})
}

function flattenRouteRecord(record: RouteRecordRaw): RouteRecordsFlat | undefined {
  if (!record.children) {
    const route = { name: record.name }
    if (record.path.startsWith('/')) {
      return undefined
    }

    return { [getRouteRecordKey(route)]: route }
  }

  return flattenRouteRecords(record.children)
}

function getRouteRecordKey(route: { name?: RouteRecordName | null }): string {
  return `p-${kebabCase(route.name?.toString() ?? '')}`
}

export function getRouteRecordIndex(route: RouteLocationNormalizedLoaded): number {
  return Object.keys(routeRecordsFlat).indexOf(getRouteRecordKey(route))
}