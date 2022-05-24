import { RouteLocationRaw } from 'vue-router'

export type Crumb = {
  text: string,
  to?: RouteLocationRaw | string,
}

export type BreadCrumbs = Crumb[]