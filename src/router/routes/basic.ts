import type { RouteRecordRaw } from 'vue-router';
import { PageEnum } from '@/enums/pageEnum';

// 404 on a page
export const PAGE_NOT_FOUND_ROUTE: RouteRecordRaw = {
  path: PageEnum.ERROR_PAGE,
  name: 'ErrorPage',
  component: () => import('@/views/sys/errorPage/index.vue')
};
