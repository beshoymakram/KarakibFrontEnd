import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    cartItems: [],
  }),

  getters: {
    totalItems: (state) => state.cartItems.reduce((sum, item) => sum + item.quantity, 0),
    totalPrice: (state) => state.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
  },

  actions: {
    addToCart(product) {
      const existingItem = this.cartItems.find(item => item.id === product.id)
      if (existingItem) {
        existingItem.quantity++
      } else {
        this.cartItems.push({ ...product, quantity: 1 })
      }
    },

    removeFromCart(productId) {
      this.cartItems = this.cartItems.filter(item => item.id !== productId)
    },

    clearCart() {
      this.cartItems = []
    },
  },
})
