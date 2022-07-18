
import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router'


const routeRecords: RouteRecordRaw[] = [
  {
    name: 'components',
    path: '/components',
    component: () => import('../pages/ComponentsPage.vue'),
  },
  {
    name: 'tables',
    path: '/tables',
    component: () => import('../pages/TablesPage.vue'),
  },
  {
    name: 'layouts',
    path: '/layouts',
    component: () => import('../pages/LayoutsPage.vue'),
  },
  {
    name: 'icons',
    path: '/icons',
    component: () => import('../pages/IconsPage.vue'),
  },
  {
    path: '/',
    redirect: 'components',
  },
]

export const router = createRouter({
  history: createWebHistory(),
  routes: routeRecords,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    return { top: 0 }
  },
})

export default router