import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    cartItems: JSON.parse(localStorage.getItem('cartItems')) || [],
    checkoutData: JSON.parse(localStorage.getItem('checkoutData')) || null,
  }),

  getters: {
    totalItems: (state) => state.cartItems.reduce((sum, item) => sum + item.quantity, 0),
    totalPrice: (state) => state.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
  },

  actions: {
    addToCart(product, type) {
      const existingItem = this.cartItems.find(item => item.id === product.id && item.type === type)
      if (existingItem) {
        existingItem.quantity++
      } else {
        this.cartItems.push({ ...product, type, quantity: 1 })
      }
      this.saveToLocalStorage()
    },

    removeFromCart(productId, type) {
      this.cartItems = this.cartItems.filter(item => !(item.id === productId && item.type === type))
      this.saveToLocalStorage()
    },

    clearCart() {
      this.cartItems = []
      localStorage.removeItem('cartItems')
    },

    getCheckoutData() {
      const merchItems = this.cartItems
        .filter(item => item.type === 'merch')
        .map(({ id, quantity }) => ({ id, quantity }))

      const wasteItems = this.cartItems
        .filter(item => item.type === 'waste')
        .map(({ id, quantity }) => ({ id, quantity }))

      return { merchItems, wasteItems }
    },

    saveCheckoutData() {
      const data = this.getCheckoutData()
      this.checkoutData = data
      localStorage.setItem('checkoutData', JSON.stringify(data))
    },

    saveToLocalStorage() {
      localStorage.setItem('cartItems', JSON.stringify(this.cartItems))
    },
  },
})
