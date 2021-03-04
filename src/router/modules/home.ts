import { RouteRecordRaw } from "vue-router";

const homeRoutes: Array<RouteRecordRaw> = [
  {
    path: "welcome",
    name: "Welcome",
    meta: {
      title: "欢迎",
    },
    component: () => import("@/views/Home/welcome.vue"),
  },
];

export default homeRoutes;
