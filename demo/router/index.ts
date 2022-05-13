
import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router'


const routeRecords: RouteRecordRaw[] = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('../pages/ComponentsPage.vue'),
  },
  {
    path: '/flows',
    name: 'Flows',
    component: () => import('../pages/ComponentsPage.vue'),
  },
  {
    path: '/edit',
    name: 'Edit',
    component: () => import('../pages/ComponentsPage.vue'),
  },
  {
    path: '/leave',
    name: 'Leave',
    component: () => import('../pages/ComponentsPage.vue'),
  },
  {
    name: 'components',
    path: '/components',
    component: () => import('../pages/ComponentsPage.vue'),
  },
  {
    path: '/',
    redirect: 'components',
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes: routeRecords,
})


export default router
