import { Section } from '@/demo/router/routeRecords'

export const layouts: Section = {
  layoutDefault: () => import('./LayoutDefault.vue'),
  layoutFull: () => import('./LayoutFull.vue'),
  layoutSidebar: () => import('./LayoutSidebar.vue'),
  layoutTable: () => import('./LayoutTable.vue'),
  layoutWell: () => import('./LayoutWell.vue'),
}