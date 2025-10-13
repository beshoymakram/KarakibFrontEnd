import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import { useAuthStore } from './stores/auth';
import LoginPage from './views/LoginPage.vue';
import RegisterPage from './views/RegisterPage.vue';
import { createRouter, createWebHistory } from 'vue-router';

const app = createApp(App)
const pinia = createPinia()

const routes = [
  { path: '/login', name: 'Login', component: LoginPage, meta: { requiresGuest: true }, },
  { path: '/register', name: 'Register', component: RegisterPage, meta: { requiresGuest: true }, },
  // { path: '/', redirect: '/login' },

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/login')
  } else if (to.meta.requiresGuest && authStore.isAuthenticated) {
    next('/home')
  } else {
    next()
  }
})

app.use(pinia)
app.use(router)
const authStore = useAuthStore();
authStore.initAuth();
app.mount('#app')
