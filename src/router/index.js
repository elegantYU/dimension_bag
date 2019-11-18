import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/home"
  },
  {
    path: "/home",
    name: "home",
    component: () => import("../views/Home.vue")
  },
  {
    path: "/setting",
    name: "setting",
    component: () => import("../views/Settings.vue")
  },
  {
    path: "/recommend",
    name: "recommend",
    component: () => import("../views/Recommend.vue")
  }
];

const router = new VueRouter({
  routes
});

export default router;
