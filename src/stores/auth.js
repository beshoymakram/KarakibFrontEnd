import { defineStore } from 'pinia';
import authService from '../services/authService';
import router from '@/router';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: null,
    loading: false,
    error: null,
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
    isAdmin: (state) => state.user?.type === 'admin',
    isCourier: (state) => state.user?.type === 'courier',
    isUser: (state) => state.user?.type === 'user',
  },

  actions: {
    initAuth() {
      const { token, user } = authService.getAuthData();
      if (token && user) {
        this.token = token;
        this.user = user;
      }
    },

    async register(userData) {
      this.loading = true;
      this.error = null;
      try {
        const response = await authService.register(userData);
        this.token = response.data.token;
        this.user = response.data.user;
        authService.saveAuthData(this.token, this.user);
        return response.data;
      } catch (error) {
        this.error = error.response?.data?.message || 'Registration failed';
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async login(userData) {
      this.loading = true;
      this.error = null;
      try {
        const response = await authService.login(userData);
        if (response.data.status != 'onhold') {
          this.token = response.data.token;
          this.user = response.data.user;
          authService.saveAuthData(this.token, this.user);
          return response.data;
        } else {
          router.push('/pending-verification')
        }
      } catch (error) {
        this.error = error.response?.data?.message || 'Login failed';
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async logout() {
      try {
        await authService.logout();
      } catch (error) {
        console.error('Logout error:', error);
      } finally {
        this.token = null;
        this.user = null;
        authService.clearAuthData();
      }
    },

    async fetchUser() {
      try {
        const response = await authService.getUser();
        this.user = response.data;
        localStorage.setItem('user', JSON.stringify(this.user));
      } catch (error) {
        console.error('Fetch user error:', error);
        this.logout();
      }
    },
  },
});
