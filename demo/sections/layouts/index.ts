import { Section } from '../../router/routeRecords'

export const layouts: Section = {
  layoutDefault: () => import('./LayoutDefaultDemo.vue'),
  layoutFull: () => import('./LayoutFullDemo.vue'),
  layoutSidebar: () => import('./LayoutSidebarDemo.vue'),
  layoutWell: () => import('./LayoutWellDemo.vue'),
}