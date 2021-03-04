import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeRoutes from "./modules/home";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    name: "Login",
    meta: {
      title: "登录",
    },
    component: () => import("@/views/Login/index.vue"),
  },
  {
    path: "/home",
    name: "Home",
    meta: {
      title: "首页",
    },
    component: () => import("@/views/Home/index.vue"),
    children: HomeRoutes,
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("@/views/NotFound/index.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  strict: true,
});

export default router;
