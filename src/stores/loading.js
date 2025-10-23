// src/stores/loading.js
import { defineStore } from 'pinia'

export const useLoadingStore = defineStore('loading', {
  state: () => ({
    isLoading: false,
    counter: 0,
    _delayTimer: null, // internal delay timer
  }),

  actions: {
    show() {
      this.counter++

      // Only set timer if no other loaders are active
      if (this.counter === 1) {
        clearTimeout(this._delayTimer)
        this._delayTimer = setTimeout(() => {
          this.isLoading = true
        }, 400) // <-- delay before showing loader (ms)
      }
    },

    hide() {
      this.counter = Math.max(0, this.counter - 1)

      // When no active requests remain
      if (this.counter === 0) {
        clearTimeout(this._delayTimer)
        this._delayTimer = null

        // small delay before hiding to prevent flicker when switching quickly
        setTimeout(() => {
          if (this.counter === 0) this.isLoading = false
        }, 150)
      }
    },

    reset() {
      this.counter = 0
      clearTimeout(this._delayTimer)
      this._delayTimer = null
      this.isLoading = false
    },
  },
})
