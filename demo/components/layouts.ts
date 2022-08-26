export const routes = [
  {
    name: 'LayoutDefault',
    path: 'layout-default',
    component: () => import('../components/LayoutDefaultSection.vue'),
  },
  {
    name: 'LayoutFull',
    path: 'layout-full',
    component: () => import('../components/LayoutFullSection.vue'),
  },
  {
    name: 'LayoutSidebar',
    path: 'layout-sidebar',
    component: () => import('../components/LayoutSidebarSection.vue'),
  },
  {
    name: 'LayoutWell',
    path: 'layout-well',
    component: () => import('../components/LayoutWellSection.vue'),
  },
]