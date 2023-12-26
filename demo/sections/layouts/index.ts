import { Section } from '@/demo/router/routeRecords'

export const layouts: Section = {
  layoutDefault: () => import('./LayoutDefault.vue'),
  layoutFull: () => import('./LayoutFull.vue'),
  layoutResizable: () => import('./LayoutResizable.vue'),
  layoutWell: () => import('./LayoutWell.vue'),
}