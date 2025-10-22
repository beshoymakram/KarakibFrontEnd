<template>
  <div class="flex items-center justify-center py-5 bg-[#E9EBF8]">
    <div class="bg-white rounded-2xl shadow-lg p-8 text-center max-w-md w-full">
      <img src="/images/pmtfailure.png" alt="Payment failed" class="w-32 mx-auto mb-4" />
      <h2 class="text-2xl font-bold text-green-700 mb-2">Oops!</h2>
      <p class="text-gray-600 mb-6">
        Something went wrong with your transaction.
      </p>

      <div class="bg-[#F7F9FC] rounded-lg p-4 mb-6 text-left text-sm text-gray-700">
        <p><span class="font-semibold text-green-700">Order Number:</span> {{ orderNumber }}</p>
        <p><span class="font-semibold text-green-700">Transaction ID:</span> {{ transactionId }}</p>
      </div>

      <router-link to="/checkout"
        class="inline-block bg-green-600 text-white py-2 px-6 rounded-lg hover:bg-green-700 transition">
        Try again
      </router-link>

      <button @click="$router.push('/')" class="block mx-auto mt-3 text-gray-500 text-sm hover:text-green-600">
        Close
      </button>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
const orderNumber = route.query.order_number || 'N/A'
const transactionId = route.query.transaction_id || 'N/A'
</script>
