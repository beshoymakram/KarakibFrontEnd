<template>
  <div class="flex items-center justify-center min-h-screen bg-[#E9EBF8]">
    <div class="bg-white rounded-2xl shadow-lg p-8 text-center max-w-md w-full">
      <div class="flex justify-center mb-4">
        <svg class="h-20 w-20 text-green-600" width="92" height="74" viewBox="0 0 92 74" fill="none"
          xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
          <rect width="92" height="74" fill="url(#pattern0_771_1926)" />
          <defs>
            <pattern id="pattern0_771_1926" patternContentUnits="objectBoundingBox" width="1" height="1">
              <use xlink:href="#image0_771_1926" transform="matrix(0.00804348 0 0 0.01 0.0978261 0)" />
            </pattern>
            <image id="image0_771_1926" width="100" height="100" preserveAspectRatio="none"
              xlink:href="data:image/png;base64,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" />
          </defs>
        </svg>
      </div>

      <h2 class="text-xl font-semibold text-green-700 mb-2">
        Your payment has been processed successfully!
      </h2>
      <p class="text-gray-600 mb-6">
        Thank you for supporting Karakib and our green mission
      </p>

      <div class="bg-[#F7F9FC] rounded-lg p-4 mb-6 text-left text-sm text-gray-700">
        <p><span class="font-semibold text-green-700">Order Number:</span> {{ orderNumber }}</p>
        <p class="break-all"><span class="font-semibold text-green-700">Transaction ID:</span> {{ transactionId }}</p>
      </div>

      <router-link to="/shop"
        class="inline-block bg-green-600 text-white py-2 px-6 rounded-lg hover:bg-green-700 transition">
        Continue Shopping
      </router-link>
    </div>
  </div>
</template>

<script>
import apiClient from '@/config/api'
import { nextTick } from 'vue';
import { useRoute } from 'vue-router'

export default {
  name: 'PaymentSuccess',
  data() {
    return {
      orderNumber: '',
      transactionId: ''
    }
  },
  mounted() {
    const route = useRoute()
    this.orderNumber = route.query.order_number
    this.transactionId = route.query.transaction_id

    this.verifyPayment()
  },
  methods: {
    async verifyPayment() {
      try {
        const response = await apiClient.get('/verify-payment', {
          params: {
            order_number: this.orderNumber,
            transaction_id: this.transactionId
          }
        })
      } catch (err) {
        this.$router.push('/')
      }
    }
  }
}
</script>
