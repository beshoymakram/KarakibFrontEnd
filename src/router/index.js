import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

// Import all views
import HomePage from '@/views/HomePage.vue'
import AboutUs from '@/views/AboutUs.vue'
// import ContactUs from '@/views/ContactUs.vue'
import AddWaste from '@/views/AddWaste.vue'
import ShopMerch from '@/views/ShopMerch.vue'
import LoginPage from '@/views/LoginPage.vue'
import RegisterPage from '@/views/RegisterPage.vue'
import CartPage from '@/views/CartPage.vue'
import AdminLayout from '@/views/Admin/AdminLayout.vue'
import Users from '@/views/Admin/Users.vue'
import WasteItems from '@/views/Admin/WasteItems.vue'
import WasteTypes from '@/views/Admin/WasteTypes.vue'
import ProfileLayout from '@/views/Profile/ProfileLayout.vue'
import PersonalInfo from '@/views/Profile/PersonalInfo.vue'
import Products from '@/views/Admin/Products.vue'
import ProductsCategories from '@/views/Admin/ProductsCategories.vue'
import ProductDesc from '@/views/ProductDesc.vue'
import CheckOut from '@/views/CheckOut.vue'
import TestPayment from '@/views/Admin/TestPayment.vue'
import MyAddresses from '@/views/Profile/MyAddresses.vue'
import PmtFailure from '@/views/PmtFailure.vue'
import PmtSuccess from '@/views/PmtSuccess.vue'

// Define routes
const routes = [
  // Public routes (accessible without login)
  { path: '/', name: 'Home', component: HomePage },
  { path: '/about', name: 'About', component: AboutUs },
  // { path: '/contact', name: 'Contact', component: ContactUs },
  { path: '/add-waste', name: 'AddWaste', component: AddWaste },
  { path: '/shop', name: 'Shop', component: ShopMerch },
  { path: '/cart', name: 'cart', component: CartPage },
  { path: '/admin', redirect: '/admin/users' },
  { path: '/profile', redirect: '/profile/personal-info' },
  { path: '/test-payment', component: TestPayment },
  {
    path: '/profile',
    component: ProfileLayout,
    meta: { requiresAuth: true },
    children: [
      {
        path: 'personal-info',
        name: 'PersonalInfo',
        component: PersonalInfo
      },
      {
        path: 'my-addresses',
        name: 'MyAddresses',
        component: MyAddresses
      },
      {
        path: 'my-requests',
        name: 'MyRequests',
        component: WasteTypes
      },
      {
        path: 'my-orders',
        name: 'MyOrders',
        component: WasteItems
      },
      {
        path: 'my-points',
        name: 'MyPoints',
        component: WasteItems
      },

    ]
  },
  {
    path: '/admin',
    component: AdminLayout,
    meta: { requiresAuth: true, requiresAdmin: true },
    children: [
      {
        path: 'users',
        name: 'AdminUsers',
        component: Users
      },
      {
        path: 'waste-types',
        name: 'AdminWasteTypes',
        component: WasteTypes
      },
      {
        path: 'waste-items',
        name: 'AdminWasteItems',
        component: WasteItems
      },
      {
        path: 'products',
        name: 'AdminProducts',
        component: Products
      },
      {
        path: 'products-categories',
        name: 'AdminProductsCategories',
        component: ProductsCategories
      },
    ]
  },
  {
    path: '/product/:id', // dynamic route with product ID
    name: 'product-desc',
    component: ProductDesc,
    props: true // lets ProductDesc receive `id` as a prop
  },
  {
    path: '/checkout', name: 'checkout', component: CheckOut, meta: { requiresAuth: true }
  },
  {
    path: '/payment-success',
    name: 'PmtSuccess',
    component: PmtSuccess,
  },
  {
    path: '/payment-failure',
    name: 'PmtFailure',
    component: PmtFailure,
  },

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
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
      }
    } else {
      return { top: 0 }
    }
  },
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

  } else if (to.meta.requiresAdmin && !authStore.isAdmin) {
    next('/')
  }
  else {
    next()
  }
})

export default router
