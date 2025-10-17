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
import 'toastify-js/src/toastify.css'

const app = createApp(App)
const pinia = createPinia()
app.use(pinia)
app.use(router)
library.add(faFacebook, faInstagram, faLinkedin, faTwitter, faWhatsapp)
app.component('font-awesome-icon', FontAwesomeIcon)

const authStore = useAuthStore()
authStore.initAuth()
app.config.globalProperties.auth = authStore

app.use(Vue3Toastify, {
  autoClose: 3000,
});
app.config.globalProperties.$toast = toast

app.mount('#app')
