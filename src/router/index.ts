import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
console.log("import.env: ", import.meta);

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: "/router",
      name: "vue-router",
      component: () => import("../views/RouterDemo/RouterDemo.vue"),
    },
    {
      path: "/transition-demo",
      name: "transition-demo",
      meta: {
        name: import.meta.env.VITE_APP_TITLE,
      },
      component: () => import("../views/transitionDemo.vue"),
    },
  ],
});

export default router;
