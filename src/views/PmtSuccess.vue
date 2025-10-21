<template>
  <div class="flex items-center justify-center min-h-screen bg-[#E9EBF8]">
    <div class="bg-white rounded-2xl shadow-lg p-8 text-center max-w-md w-full">
      <div class="flex justify-center mb-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-14 w-14 text-green-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M9 12l2 2 4-4m5 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>

      <h2 class="text-xl font-semibold text-green-700 mb-2">
        Your payment has been processed successfully
      </h2>
      <p class="text-gray-600 mb-6">
        Thank you for supporting Karakib and our green mission 🌿
      </p>

      <div class="bg-[#F7F9FC] rounded-lg p-4 mb-6 text-left text-sm text-gray-700">
        <p><span class="font-semibold text-green-700">Order Number:</span> {{ orderNumber }}</p>
        <p><span class="font-semibold text-green-700">Transaction ID:</span> {{ transactionId }}</p>
      </div>

      <router-link
        to="/shop"
        class="inline-block bg-green-600 text-white py-2 px-6 rounded-lg hover:bg-green-700 transition"
      >
        Continue Shopping
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
const orderNumber = route.query.order || 'N/A'
const transactionId = route.query.tx || 'N/A'
</script>
