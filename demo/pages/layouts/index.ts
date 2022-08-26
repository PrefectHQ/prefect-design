export const routes = [
  {
    name: 'LayoutDefault',
    path: 'layout-default',
    component: () => import('./LayoutDefaultSection.vue'),
  },
  {
    name: 'LayoutFull',
    path: 'layout-full',
    component: () => import('./LayoutFullSection.vue'),
  },
  {
    name: 'LayoutSidebar',
    path: 'layout-sidebar',
    component: () => import('./LayoutSidebarSection.vue'),
  },
  {
    name: 'LayoutWell',
    path: 'layout-well',
    component: () => import('./LayoutWellSection.vue'),
  },
]