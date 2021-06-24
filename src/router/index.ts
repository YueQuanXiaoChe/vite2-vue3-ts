import type { App } from 'vue';
// import type { RouteRecordRaw } from 'vue-router';

import { createRouter, createWebHashHistory } from 'vue-router';
import { basicRoutes } from './routes';

// app router
export const router = createRouter({
  history: createWebHashHistory(),
  routes: basicRoutes,
  strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 })
});

// config router
export function setupRouter(app: App<Element>) {
  app.use(router);
}
