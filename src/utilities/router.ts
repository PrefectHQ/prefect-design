import { RouteLocationNamedRaw, RouteLocationRaw } from 'vue-router'

export function getRouteName(route: RouteLocationRaw): string | undefined {
  if (typeof route === 'string') {
    return route
  }

  if (isRouteLocationNamedRaw(route)) {
    return route.name?.toString()
  }

  return route.path
}

export function isRouteLocationNamedRaw(route: RouteLocationRaw): route is RouteLocationNamedRaw {
  return !!(route as RouteLocationNamedRaw).name
}