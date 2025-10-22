<template>
  <div class="cart-page bg-[#F5F7F5] min-h-screen py-10">
    <div class="container mx-auto px-4 max-w-6xl">
      <h1 class="text-4xl font-bold text-[#2C702C] mb-8">Your Cart</h1>

      <!-- Products Section -->
      <div class="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div class="flex items-center gap-3 mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
            class="w-7 h-7 text-[#2C702C]">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
          </svg>
          <h2 class="text-2xl font-bold text-[#2C702C]">Shop Products</h2>
          <span class="ml-auto bg-[#2C702C] text-white px-3 py-1 rounded-full text-sm font-semibold">
            {{ cartStore.items.length }} items
          </span>
        </div>

        <div v-if="cartStore.items.length > 0" class="space-y-4">
          <div v-for="item in cartStore.items" :key="item.id"
            class="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all duration-200">
            <!-- Product Image -->
            <img :src="item.product.image_url" :alt="item.product.name"
              class="w-24 h-24 object-cover rounded-lg bg-[#E0EBE0]" />

            <!-- Product Info -->
            <div class="flex-1">
              <h3 class="font-bold text-lg text-[#2C702C]">{{ item.product.name }}</h3>
              <p class="text-gray-600 text-sm">{{ item.product.description }}</p>
              <p class="text-[#2C702C] font-bold text-lg mt-2">{{ item.product.price }} EGP</p>
            </div>

            <!-- Quantity Controls -->
            <div class="flex items-center gap-3">
              <button @click="decrementQuantity(item.id, item.quantity)"
                class="w-8 h-8 flex items-center justify-center bg-gray-200 hover:bg-gray-300 rounded-full transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                  stroke="currentColor" class="w-5 h-5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14" />
                </svg>
              </button>

              <span class="w-12 text-center font-bold text-lg">{{ item.quantity }}</span>

              <button @click="incrementQuantity(item.id, item.quantity)"
                class="w-8 h-8 flex items-center justify-center bg-[#2C702C] hover:bg-[#1a4d1a] text-white rounded-full transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                  stroke="currentColor" class="w-5 h-5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
              </button>
            </div>

            <!-- Subtotal & Remove -->
            <div class="text-right">
              <p class="font-bold text-xl text-[#2C702C] mb-2">
                {{ (item.product.price * item.quantity).toFixed(2) }} EGP
              </p>
              <button @click="removeItem(item.id)"
                class="text-red-600 hover:text-red-800 text-sm font-semibold flex items-center gap-1 ml-auto">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                  stroke="currentColor" class="w-4 h-4">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                </svg>
                Remove
              </button>
            </div>
          </div>

          <!-- Total & Checkout -->
          <div class="bg-[#E0EBE0] rounded-lg p-6 mt-6">
            <div class="flex justify-between items-center mb-4">
              <span class="text-xl font-semibold text-gray-700">Subtotal:</span>
              <span class="text-3xl font-bold text-[#2C702C]">{{ cartStore.total }} EGP</span>
            </div>
            <button @click="checkoutProducts"
              class="w-full bg-[#2C702C] hover:bg-[#1a4d1a] text-white font-bold py-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" />
              </svg>
              Proceed to Checkout
            </button>
          </div>
        </div>

        <div v-else class="text-center py-12">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="w-24 h-24 mx-auto text-gray-300 mb-4">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007Z" />
          </svg>
          <p class="text-gray-500 text-lg mb-4">Your shopping cart is empty</p>
          <router-link to="/shop"
            class="inline-block bg-[#2C702C] text-white px-6 py-3 rounded-lg hover:bg-[#1a4d1a] transition-colors">
            Continue Shopping
          </router-link>
        </div>
      </div>

      <!-- Waste Collection Section -->
      <div class="bg-white rounded-xl shadow-lg p-6">
        <div class="flex items-center gap-3 mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
            class="w-7 h-7 text-[#2C702C]">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m8.25 3v6.75m0 0-3-3m3 3 3-3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
          </svg>
          <h2 class="text-2xl font-bold text-[#2C702C]">Waste Collection Request</h2>
          <span class="ml-auto bg-[#2C702C] text-white px-3 py-1 rounded-full text-sm font-semibold">
            {{ wasteItems.length }} items
          </span>
        </div>

        <div v-if="wasteItems.length > 0" class="space-y-4">
          <div v-for="(item, index) in wasteItems" :key="index"
            class="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all duration-200">
            <!-- Waste Type Icon -->
            <div class="w-20 h-20 bg-[#E0EBE0] rounded-lg flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="w-10 h-10 text-[#2C702C]">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
              </svg>
            </div>

            <!-- Waste Info -->
            <div class="flex-1">
              <h3 class="font-bold text-lg text-[#2C702C]">{{ item.waste_type }}</h3>
              <p class="text-gray-600 text-sm">{{ item.description }}</p>
              <p class="text-[#2C702C] font-bold mt-2">Estimated: {{ item.weight }} kg</p>
            </div>

            <!-- Points Estimate -->
            <div class="text-right">
              <p class="text-sm text-gray-500">Estimated Points</p>
              <p class="font-bold text-2xl text-green-600">+{{ item.estimated_points }}</p>
            </div>

            <!-- Remove -->
            <button @click="removeWasteItem(index)" class="text-red-600 hover:text-red-800">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- Request Collection Button -->
          <div class="bg-green-50 rounded-lg p-6 mt-6">
            <div class="flex justify-between items-center mb-4">
              <span class="text-xl font-semibold text-gray-700">Total Estimated Points:</span>
              <span class="text-3xl font-bold text-green-600">+{{ totalWastePoints }}</span>
            </div>
            <button @click="requestCollection"
              class="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.125-.504 1.125-1.125V11.25m-8.25.75h.008v.008h-.008V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
              </svg>
              Request Collection
            </button>
          </div>
        </div>

        <div v-else class="text-center py-12">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="w-24 h-24 mx-auto text-gray-300 mb-4">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
          </svg>
          <p class="text-gray-500 text-lg mb-4">No waste collection requests yet</p>
          <router-link to="/add-waste"
            class="inline-block bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors">
            Add Waste Items
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useCartStore } from '@/stores/cart';

export default {
  name: 'CartPage',

  data() {
    return {
      wasteItems: [
        // Demo data - replace with actual data from API
        { waste_type: 'Plastic Bottles', description: '5 large bottles', weight: 2.5, estimated_points: 50 },
        { waste_type: 'Cardboard', description: '3 boxes', weight: 5, estimated_points: 100 }
      ]
    };
  },

  computed: {
    cartStore() {
      return useCartStore();
    },

    totalWastePoints() {
      return this.wasteItems.reduce((sum, item) => sum + item.estimated_points, 0);
    }
  },

  methods: {
    async incrementQuantity(itemId, currentQuantity) {
      await this.cartStore.updateQuantity(itemId, currentQuantity + 1);
    },

    async decrementQuantity(itemId, currentQuantity) {
      if (currentQuantity > 1) {
        await this.cartStore.updateQuantity(itemId, currentQuantity - 1);
      } else {
        // If quantity is 1, remove item instead
        await this.removeItem(itemId);
      }
    },

    async removeItem(itemId) {
      await this.cartStore.removeItem(itemId);
      this.$toast.success('Item removed from cart');
    },

    removeWasteItem(index) {
      this.wasteItems.splice(index, 1);
      this.$toast.success('Waste item removed');
    },

    checkoutProducts() {
      this.$router.push('/checkout');
    },

    requestCollection() {
      this.$router.push('/waste-collection-checkout');
    }
  },

 mounted() {
  this.cartStore.fetchCart();

  // Load waste items from localStorage to handle the waste process statically
  const stored = localStorage.getItem('cart_waste_items');
  if (stored) {
    this.wasteItems = JSON.parse(stored);
  }
}
};
</script>
