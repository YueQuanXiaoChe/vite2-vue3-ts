import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import homeRoutes from './modules/home';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login/index.vue')
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/views/Home/index.vue'),
    children: homeRoutes
  },
  {
    path: '/demo',
    name: 'Demo',
    component: () => import('@/views/Demo/index.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/NotFound/index.vue')
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  strict: true
});

export default router;
