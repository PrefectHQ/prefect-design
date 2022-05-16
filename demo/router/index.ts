
import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router'


const routeRecords: RouteRecordRaw[] = [
  {
    name: 'components',
    path: '/components',
    component: () => import('../pages/ComponentsPage.vue'),
  },
  {
    name: 'layouts',
    path: '/layouts',
    component: () => import('../pages/LayoutsPage.vue'),
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
