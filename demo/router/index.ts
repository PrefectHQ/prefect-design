
import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router'
import { routes as componentRoutes } from '../sections/components'
import { routes as layoutRoutes } from '../sections/layouts'
import { close } from './menu'

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
    component: () => import('../sections/IconsDoc.vue'),
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

router.beforeEach(() => close())