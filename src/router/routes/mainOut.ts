/**
 * 此文件的路由将不会显示布局。
 * 这是一个独立的新页面。
 * 文件的内容仍然需要登录才能访问
 */
import type { RouteRecordRaw } from 'vue-router';
import { PageEnum } from '@/enums/pageEnum';

export const mainOutRoutes: RouteRecordRaw[] = [
  {
    path: PageEnum.MAIN_OUT,
    name: 'MainOut',
    component: () => import('@/views/demo/mainOut/index.vue')
  }
];

export const mainOutRouteNames = mainOutRoutes.map((item) => item.name);
