
import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router'
import { routes as componentRoutes } from '../components/components'
import { routes as layoutRoutes } from '../components/layouts'

const routeRecords: RouteRecordRaw[] = [
  {
    name: 'components',
    path: '/components',
    children: componentRoutes,
  },
  {
    name: 'layouts',
    path: '/layouts',
    children: layoutRoutes,
  },
  {
    name: 'icons',
    path: '/icons',
    component: () => import('../components/IconsSection.vue'),
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