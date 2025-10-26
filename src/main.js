import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { useAuthStore } from './stores/auth'
import '@tailwindplus/elements'
import '../style.css'
import Vue3Toastify, { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faFacebook, faInstagram, faLinkedin, faTwitter, faWhatsapp } from '@fortawesome/free-brands-svg-icons'
import { faPhone, faEnvelope, faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'
import { useCartStore } from './stores/cart'
import i18n from './i18n'



const app = createApp(App)

app.use(i18n)
const locale = localStorage.getItem('locale') || 'en'
document.documentElement.setAttribute('lang', locale)
document.documentElement.setAttribute('dir', locale === 'ar' ? 'rtl' : 'ltr')

const pinia = createPinia()
app.use(pinia)
app.use(router)
library.add(faFacebook, faInstagram, faLinkedin, faTwitter, faWhatsapp, faPhone, faEnvelope, faLocationDot, faTriangleExclamation)
app.component('font-awesome-icon', FontAwesomeIcon)

const authStore = useAuthStore()
authStore.initAuth()
app.config.globalProperties.auth = authStore



app.use(Vue3Toastify, {
  rtl: locale == 'ar' ? true : false,
  autoClose: 3000,
});
app.config.globalProperties.$toast = toast
const cartStore = useCartStore();
cartStore.fetchCart();
app.mount('#app')
