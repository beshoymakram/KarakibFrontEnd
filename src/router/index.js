import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

// Import all views
import HomePage from '@/views/HomePage.vue'
import AboutUs from '@/views/AboutUs.vue'
import ContactUs from '@/views/ContactUs.vue'
import AddWaste from '@/views/AddWaste.vue'
import ShopMerch from '@/views/ShopMerch.vue'
import LoginPage from '@/views/LoginPage.vue'
import RegisterPage from '@/views/RegisterPage.vue'

// Define routes
const routes = [
  // Public routes (accessible without login)
  { path: '/', name: 'Home', component: HomePage },
  { path: '/about', name: 'About', component: AboutUs },
  { path: '/contact', name: 'Contact', component: ContactUs },
  { path: '/add-waste', name: 'AddWaste', component: AddWaste },
  { path: '/shop', name: 'Shop', component: ShopMerch },

  // Auth-related routes
  { path: '/login', name: 'Login', component: LoginPage, meta: { requiresGuest: true } },
  { path: '/register', name: 'Register', component: RegisterPage, meta: { requiresGuest: true } },

  { path: '/logout', name: 'Logout', meta: { requiresAuth: true } },


  // Redirect unknown paths
  { path: '/:pathMatch(.*)*', redirect: '/' },
]

// Create router instance
const router = createRouter({
  history: createWebHistory(),
  routes,
})

// Navigation guard
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()

  if (to.name === 'Logout') {
    authStore.logout()
    return next('/login')
  }

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/login')
  } else if (to.meta.requiresGuest && authStore.isAuthenticated) {
    next('/')
  } else {
    next()
  }
})

export default router
