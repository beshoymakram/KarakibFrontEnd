// src/config/api.js
import axios from 'axios'
import { useLoadingStore } from '@/stores/loading'

export const API_BASE_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:8000/api'

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

// 🔹 Request Interceptor
apiClient.interceptors.request.use(
  (config) => {
    const loading = useLoadingStore()

    // ✅ Only show loader for GET requests
    if (config.method?.toLowerCase() === 'get') {
      // loading.show()
    }

    const locale = localStorage.getItem('locale') || 'en'
    config.headers['Accept-Language'] = locale

    const token = localStorage.getItem('auth-token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => {
    const loading = useLoadingStore()
    // loading.hide()
    return Promise.reject(error)
  }
)

// 🔹 Response Interceptor
apiClient.interceptors.response.use(
  (response) => {
    const loading = useLoadingStore()

    // ✅ Hide loader only if it was triggered by GET
    if (response.config.method?.toLowerCase() === 'get') {
      // loading.hide()
    }

    return response
  },
  (error) => {
    const loading = useLoadingStore()

    // ✅ Hide loader only if it was triggered by GET
    if (error.config?.method?.toLowerCase() === 'get') {
      // loading.hide()
    }

    // Handle unauthorized user (401)
    if (error.response && error.response.status === 401) {
      const hadToken = localStorage.getItem('auth-token')
      localStorage.removeItem('auth-token')
      localStorage.removeItem('user')
      if (hadToken && !error.config.url.includes('/login')) {
        window.location.href = '/login'
      }
    }

    return Promise.reject(error)
  }
)

export default apiClient
