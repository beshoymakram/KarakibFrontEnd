<template>
  <div class="cart container mx-auto py-10">
    <h1 class="text-3xl font-bold mb-6">Your Cart</h1>

    <div v-if="cartItems.length">
      <div
        v-for="item in cartItems"
        :key="item.id"
        class="flex items-center justify-between border-b py-4"
      >
        <div class="flex items-center gap-4">
          <img :src="item.image" class="w-20 h-20 object-cover rounded" />
          <div>
            <h2 class="font-semibold">{{ item.name }}</h2>
            <p>{{ item.price }} EGP</p>
          </div>
        </div>

        <div class="flex items-center gap-2">
          <p>Qty: {{ item.quantity }}</p>
          <button @click="remove(item.id)" class="text-red-500">Remove</button>
        </div>
      </div>

      <div class="mt-6 flex justify-between items-center">
        <p class="text-xl font-bold">Total: {{ totalPrice }} EGP</p>
        <button @click="checkout" class="bg-green-600 text-white px-6 py-2 rounded">Checkout</button>
      </div>
    </div>

    <div v-else>
      <p>Your cart is empty.</p>
    </div>
  </div>
</template>

<script>
import { useCartStore } from '@/stores/cart'
import { mapState, mapActions } from 'pinia'

export default {
  name: 'CartPage',
  computed: {
    ...mapState(useCartStore, ['cartItems', 'totalPrice']),
  },
  methods: {
    ...mapActions(useCartStore, ['removeFromCart', 'clearCart']),
    remove(id) {
      this.removeFromCart(id)
    },
    checkout() {
      alert('Checkout complete!')
      this.clearCart()
    },
  },
}
</script>
