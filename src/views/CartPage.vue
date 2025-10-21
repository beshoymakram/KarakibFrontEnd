<template>
  <div class="cart container mx-auto py-10">
    <h1 class="text-3xl font-bold mb-6">Your Cart</h1>

    <div v-if="cartStore.items.length">
      <div v-for="item in cartStore.items" :key="item.id" class="flex items-center justify-between border-b py-4">
        <div class="flex items-center gap-4">
          <img :src="item.product.image_url" class="w-20 h-20 object-cover rounded" />
          <div>
            <h2 class="font-semibold">{{ item.name }}</h2>
            <p>{{ item.product.price }} EGP</p>
          </div>
        </div>

        <div class="flex items-center gap-2">
          <p>Qty: {{ item.quantity }}</p>
          <button @click="removeItem(item.id)" class="text-red-500 cursor-pointer">Remove</button>
        </div>
      </div>

      <div class="mt-6 flex justify-between items-center">
        <p class="text-xl font-bold">Total: {{ cartStore.total }} EGP</p>
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

export default {
  name: 'CartPage',
  computed: {
    cartStore() {
      return useCartStore();
    },
  },
  methods: {
    async removeItem(itemId) {
      const success = await this.cartStore.removeItem(itemId);

      if (success) {
        this.$toast.success('Item removed!');
      } else {
        this.$toast.error('Failed to remove item');
      }
    },
  },
}
</script>
