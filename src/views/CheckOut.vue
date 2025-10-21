<template>
  <div class="checkout-page bg-[#F5F7F5] min-h-screen py-10">
    <div class="container mx-auto px-4 max-w-5xl bg-white rounded-xl shadow-md p-8">
      <h1 class="text-4xl font-bold text-[#2C702C] mb-8">Checkout</h1>

      <!-- Order Summary -->
      <div class="mb-8">
        <h2 class="text-2xl font-semibold text-[#2C702C] mb-4">Order Summary</h2>

        <div v-if="cartStore.items.length > 0" class="space-y-4">
          <div
            v-for="item in cartStore.items"
            :key="item.id"
            class="flex justify-between border-b pb-3"
          >
            <div>
              <p class="font-semibold text-gray-800">{{ item.product.name }}</p>
              <p class="text-sm text-gray-500">Qty: {{ item.quantity }}</p>
            </div>
            <p class="text-[#2C702C] font-semibold">
              {{ (item.product.price * item.quantity).toFixed(2) }} EGP
            </p>
          </div>

          <div class="flex justify-between mt-6 text-xl font-bold">
            <span>Total</span>
            <span class="text-[#2C702C]">{{ cartStore.total }} EGP</span>
          </div>
        </div>

        <div v-else class="text-center text-gray-500 mt-6">
          Your cart is empty. <router-link to="/shop" class="text-[#2C702C] underline">Go shopping</router-link>.
        </div>
      </div>

      <!-- Shipping Information -->
      <div class="mb-8">
        <h2 class="text-2xl font-semibold text-[#2C702C] mb-4">Shipping Information</h2>
        <form @submit.prevent="placeOrder" class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            v-model="shipping.name"
            type="text"
            placeholder="Full Name"
            required
            class="border border-gray-300 rounded-md px-4 py-2"
          />
          <input
            v-model="shipping.phone"
            type="text"
            placeholder="Phone Number"
            required
            class="border border-gray-300 rounded-md px-4 py-2"
          />
          <input
            v-model="shipping.address"
            type="text"
            placeholder="Address"
            required
            class="md:col-span-2 border border-gray-300 rounded-md px-4 py-2"
          />
        </form>
      </div>

      <!-- Payment -->
      <div class="mb-8">
        <h2 class="text-2xl font-semibold text-[#2C702C] mb-4">Payment Method</h2>
        <div class="flex flex-col gap-3">
          <label class="flex items-center gap-3">
            <input type="radio" value="cash" v-model="paymentMethod" />
            <span>Cash on Delivery</span>
          </label>
          <label class="flex items-center gap-3">
            <input type="radio" value="card" v-model="paymentMethod" />
            <span>Credit / Debit Card</span>
          </label>
        </div>
      </div>

      <!-- Confirm Order -->
      <button
        @click="placeOrder"
        class="w-full bg-[#2C702C] hover:bg-[#1a4d1a] text-white font-bold py-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
      >
        Confirm Order
      </button>
    </div>
  </div>
</template>

<script>
import { useCartStore } from '@/stores/cart';

export default {
  name: 'CheckoutPage',
  data() {
    return {
      shipping: {
        name: '',
        phone: '',
        address: '',
      },
      paymentMethod: 'cash',
    };
  },
  computed: {
    cartStore() {
      return useCartStore();
    },
  },
  methods: {
    async placeOrder() {
      if (!this.shipping.name || !this.shipping.phone || !this.shipping.address) {
        this.$toast.error('Please fill in all shipping fields.');
        return;
      }

      const orderData = {
        items: this.cartStore.items.map((i) => ({
          product_id: i.product.id,
          quantity: i.quantity,
        })),
        total: this.cartStore.total,
        shipping: this.shipping,
        payment_method: this.paymentMethod,
      };

      try {
        console.log('Order placed:', orderData);
        this.$toast.success('Order placed successfully!');
        this.cartStore.clearCart();
        this.$router.push('/');
      } catch (err) {
        this.$toast.error('Failed to place order.');
      }
    },
  },
  mounted() {
    this.cartStore.fetchCart();
  },
};
</script>
