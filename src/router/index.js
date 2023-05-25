import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";
Vue.use(VueRouter);

const routes = [
  {
    name: "Master",
    redirect: "/login",
    path: "/",
    component: () => import("../views/layout/Master.vue"),
    children: [
      {
        name: "Dashboard",
        path: "/dashboard",
        component: () => import("../views/Dashboard.vue"),
      },

      {
        name: "Profile",
        path: "/profile",
        component: () => import("../views/Profile.vue"),
      },
      {
        name: "History",
        path: "/history",
        component: () => import("../views/History.vue"),
      },
      {
        name: "Settings",
        path: "/settings",
        component: () => import("../views/Settings.vue"),
      },
      {
        name: "ABCD",
        path: "/abcd",
        component: () => import("../views/ABCD.vue"),
      },
      {
        name: "EFGH",
        path: "/efgh",
        component: () => import("../views/EFGH.vue"),
      },
      {
        name: "RoleManager",
        path: "/role",
        component: () => import("../views/RoleManager.vue"),
      },
    ],
  },
  {
    name: "Login",
    path: "/login",
    component: () => import("../views/Login.vue"),
  },
  {
    name: "ChangePassword",
    path: "/changepassword",
    component: () => import("../views/ChangePassword.vue"),
  },
  {
    path: "*",
    component: () => import("../views/404NotFound.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.name !== "Login" && store.getters.token === "")
    next({ name: "Login" });
  else next();
});

export default router;
