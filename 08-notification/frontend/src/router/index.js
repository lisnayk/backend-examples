import { createWebHashHistory, createRouter } from "vue-router";
import { useAuthStore } from "@/stores/authStore";

// COMPONENTS
import Home from '@components/Home.vue';
import Categories from '@components/Categories.vue';
import LogoutRedirect from '@components/Logout.vue';
import Profile from '@components/Profile.vue';
import AuthCallback from '@components/AuthCallback.vue';

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: { requiresAuth: true }
  },
  {
    path: "/categories",
    name: "Categories",
    component: Categories,
    meta: { requiresAuth: true }
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    meta: { requiresAuth: true }
  },
  {
    path: "/logout-redirect",
    name: "LogoutRedirect",
    component: LogoutRedirect,
    meta: { requiresAuth: false }
  },
  {
    path: "/auth-callback",
    name: "AuthCallback",
    component: AuthCallback,
    meta: { requiresAuth: false }
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  console.log('Router beforeEach', authStore.authenticated, to);

  if (to.path.startsWith('/auth-callback') && to.name !== 'AuthCallback') {
    return next({name: 'AuthCallback'})
  }
  if (to.path.startsWith('/logout-redirect') && to.name !== 'LogoutRedirect') {
    console.log('Redirecting to LogoutRedirect')
    return next({name: 'LogoutRedirect'})
  }
  if (to.meta.requiresAuth && !authStore.authenticated) {
    console.warn(`Маршрут ${to.path} требует авторизации`);
    window.location.href="/"
  }
  if (to.name === "LogoutRedirect" && authStore.authenticated){
    console.log('Redirecting to Home')
    return next({name: 'Home'})
  }

  next();
});

export default router;