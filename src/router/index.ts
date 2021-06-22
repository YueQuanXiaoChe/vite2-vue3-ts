import type { App } from 'vue';

import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import homeRoutes from './modules/home';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login/login.vue')
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/views/Home/home.vue'),
    children: homeRoutes
  },
  {
    path: '/demo',
    name: 'Demo',
    component: () => import('@/views/Demo/demo.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/NotFound/notFound.vue')
  }
];

// app router
export const router = createRouter({
  history: createWebHashHistory(),
  routes,
  strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 })
});

// config router
export function setupRouter(app: App<Element>) {
  app.use(router);
}
