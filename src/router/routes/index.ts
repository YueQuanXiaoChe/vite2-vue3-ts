import type { RouteRecordRaw } from 'vue-router';

import { PageEnum } from '@/enums/pageEnum';
import { mainOutRoutes } from './mainOut';
import { PAGE_NOT_FOUND_ROUTE } from './basic';

export const RootRoute: RouteRecordRaw = {
  path: PageEnum.ROOT,
  name: 'Root',
  redirect: PageEnum.LOGIN
};

export const LoginRoute: RouteRecordRaw = {
  path: PageEnum.LOGIN,
  name: 'Login',
  component: () => import('@/views/sys/login/Login.vue')
};

export const DashboardRoute: RouteRecordRaw = {
  path: PageEnum.DASHBOARD,
  name: 'Dashboard',
  component: () => import('@/views/dashboard/index.vue')
};

// Basic routing without permission
export const basicRoutes: Array<RouteRecordRaw> = [
  RootRoute,
  LoginRoute,
  DashboardRoute,
  ...mainOutRoutes,
  PAGE_NOT_FOUND_ROUTE
];
