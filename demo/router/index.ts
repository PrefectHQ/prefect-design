import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

export const routes: RouteRecordRaw[] = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('../App.vue'),
  },
  {
    path: '/flows',
    name: 'Flows',
    component: () => import('../App.vue'),
  },
  {
    path: '/edit',
    name: 'Edit',
    component: () => import('../App.vue'),
  },
  {
    path: '/leave',
    name: 'Leave',
    component: () => import('../App.vue'),
  },
  {
    path: '/',
    component: () => import('../App.vue'),
  },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
