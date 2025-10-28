// src/router/index.js
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
import ForgotPassword from '@/views/ForgotPassword.vue'
import VerifyCode from '@/views/VerifyCode.vue'
import CreatePassword from '@/views/CreatePassword.vue'
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
import PaymentSuccess from '@/views/PaymentSuccess.vue'
import PaymentFailure from '@/views/PaymentFailure.vue'
import WastesDesc from '@/views/WastesDesc.vue'
import MyOrders from '@/views/Profile/MyOrders.vue'
import Orders from '@/views/Admin/Orders.vue'
import DonationSuccess from '@/views/DonationSuccess.vue'
import GoogleCallback from '@/views/GoogleCallback.vue'
import MyPoints from '@/views/Profile/MyPoints.vue'
import Collect from '@/views/Collect.vue'
import MyRequests from '@/views/Profile/MyRequests.vue'
import Requests from '@/views/Admin/Requests.vue'
import DonatedPoints from '@/views/Admin/DonatedPoints.vue'

// Define routes
const routes = [
  // Public routes
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
      { path: 'personal-info', name: 'PersonalInfo', component: PersonalInfo },
      { path: 'my-addresses', name: 'MyAddresses', component: MyAddresses },
      { path: 'my-orders', name: 'MyOrders', component: MyOrders },
      { path: 'my-requests', name: 'MyRequests', component: MyRequests },
      { path: 'my-points', name: 'MyPoints', component: MyPoints },
    ],
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
        path: 'orders',
        name: 'AdminOrders',
        component: Orders
      },
      {
        path: 'requests',
        name: 'AdminRequests',
        component: Requests
      },
      {
        path: 'donated-points',
        name: 'DonatedPoints',
        component: DonatedPoints
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
    path: '/waste/:id',
    name: 'WasteDesc',
    component: WastesDesc,
    props: true
  },
  {
    path: '/checkout',
    name: 'Checkout',
    component: CheckOut,
    meta: { requiresAuth: true }
  },
  {
    path: '/collect',
    name: 'collect',
    component: Collect,
    meta: { requiresAuth: true }
  },
  {
    path: '/checkout/success',
    name: 'PaymentSuccess',
    component: PaymentSuccess,
    meta: { requiresAuth: true }
  },
  {
    path: '/checkout/failed',
    name: 'PaymentFailure',
    component: PaymentFailure,
    meta: { requiresAuth: true }
  },
  {
    path: '/donate/success',
    name: 'DonationSuccess',
    component: DonationSuccess,
  },
  {
    path: '/donate/failed',
    name: 'PaymentFailure',
    component: PaymentFailure,
  },

  { path: '/product/:id', name: 'product-desc', component: ProductDesc, props: true },
  { path: '/waste/:id', name: 'WasteDesc', component: WastesDesc, props: true },
  { path: '/checkout', name: 'checkout', component: CheckOut },
  { path: '/checkout/success', name: 'PaymentSuccess', component: PaymentSuccess, meta: { requiresAuth: true } },
  { path: '/checkout/failed', name: 'PaymentFailure', component: PaymentFailure, meta: { requiresAuth: true } },

  // Auth routes
  { path: '/login', name: 'Login', component: LoginPage, meta: { requiresGuest: true } },
  { path: '/register', name: 'Register', component: RegisterPage, meta: { requiresGuest: true } },
  { path: '/forgot-password', name: 'forgot-password', component: ForgotPassword, meta: { requiresGuest: true } },
  { path: '/verify-code', name: 'verify-code', component: VerifyCode, meta: { requiresGuest: true } },
  { path: '/reset-password', name: 'reset-password', component: CreatePassword, meta: { requiresGuest: true } },
  { path: '/logout', name: 'Logout', meta: { requiresAuth: true } },
  {
    path: '/auth/callback',
    name: 'AuthCallback',
    component: GoogleCallback,
  },
  // Fallback
  { path: '/:pathMatch(.*)*', redirect: '/' },
]

// Create router instance
const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
      }
    }
    return { top: 0 }
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
  } else {
    next()
  }
})

export default router