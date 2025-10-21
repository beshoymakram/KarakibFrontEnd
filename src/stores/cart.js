import { defineStore } from 'pinia';
import apiClient from '@/config/api';
import { useAuthStore } from './auth';
import { toast } from 'vue3-toastify'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [],
    total: 0,
    count: 0,
    sessionId: null,
    loading: false
  }),

  actions: {
    getSessionId() {
      if (!this.sessionId) {
        this.sessionId = localStorage.getItem('cart_session');
        if (!this.sessionId) {
          this.sessionId = crypto.randomUUID();
          localStorage.setItem('cart_session', this.sessionId);
        }
      }
      return this.sessionId;
    },

    async fetchCart() {
      this.loading = true;
      try {
        const response = await apiClient.get('/cart', {
          headers: {
            'X-Cart-Session': this.getSessionId()
          }
        });

        this.items = response.data.items;
        this.total = response.data.total;
        this.count = response.data.count;

        if (response.data.session_id) {
          this.sessionId = response.data.session_id;
          localStorage.setItem('cart_session', this.sessionId);
        }
      } catch (error) {
        this.$toast.error(error.response?.data.message || error);
      } finally {
        this.loading = false;
      }
    },

    async addToCart(productId, quantity = 1) {
      try {
        await apiClient.post('/cart', {
          product_id: productId,
          quantity
        }, {
          headers: {
            'X-Cart-Session': this.getSessionId()
          }
        });

        await this.fetchCart();
        return true;
      } catch (error) {
        this.$toast.error(error.response?.data.message || error);
        return false;
      }
    },

    async updateQuantity(itemId, quantity) {
      try {
        await apiClient.put(`/cart/${itemId}`, { quantity }, {
          headers: {
            'X-Cart-Session': this.getSessionId()
          }
        });
        await this.fetchCart();
      } catch (error) {
        this.$toast.error(error.response?.data.message || error);
      }
    },

    async removeItem(itemId) {
      try {
        await apiClient.delete(`/cart/${itemId}`, {
          headers: {
            'X-Cart-Session': this.getSessionId()
          }
        });
        await this.fetchCart();
      } catch (error) {
        this.$toast.error(error.response?.data.message || error);
      }
    },

    async clearCart() {
      try {
        await apiClient.delete('/cart', {
          headers: {
            'X-Cart-Session': this.getSessionId()
          }
        });
        this.items = [];
        this.total = 0;
        this.count = 0;
      } catch (error) {
        this.$toast.error(error.response?.data.message || error);
      }
    },

    async mergeOnLogin() {
      const authStore = useAuthStore();

      if (!authStore.isAuthenticated) {
        return;
      }

      try {
        await apiClient.post('/cart/merge', {}, {
          headers: {
            'X-Cart-Session': this.getSessionId()
          }
        });

        localStorage.removeItem('cart_session');
        this.sessionId = null;

        await this.fetchCart();
      } catch (error) {
        this.$toast.error(error.response?.data.message || error);
      }
    }
  }
});
