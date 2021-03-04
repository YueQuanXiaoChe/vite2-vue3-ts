import { RouteRecordRaw } from "vue-router";

const homeRoutes: Array<RouteRecordRaw> = [
  {
    path: "welcome",
    name: "Welcome",
    component: () => import("@/views/Home/welcome.vue"),
  },
];

export default homeRoutes;
