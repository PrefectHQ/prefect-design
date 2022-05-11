import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('../App.vue'),
  },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
