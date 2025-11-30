<template>
  <div class="flex items-center justify-center min-h-screen bg-myprofile">
    <div class="bg-white rounded-2xl shadow-lg p-8 text-center max-w-md w-full">
      <img src="/images/pmtfailure.png" alt="Payment failed" class="w-32 mx-auto mb-4" />
      <h2 class="text-2xl font-bold text-green-700 mb-2">{{ $t('common.paymentFailureTitle') }}</h2>
      <p class="text-gray-600 mb-6">
        {{ $t('common.paymentFailureDescription') }}
      </p>

      <div class="bg-[#F7F9FC] rounded-lg p-4 mb-6 text-left text-sm text-gray-700">
        <p><span class="font-semibold text-green-700">{{ $t('common.orderNumber') }}:</span> {{ orderNumber }}</p>
        <p class="break-all"><span class="font-semibold text-green-700">{{ $t('common.transactionId') }}:</span> {{ transactionId }}</p>
      </div>

      <router-link to="/checkout"
        class="inline-block bg-green-600 text-white py-2 px-6 rounded-lg hover:bg-green-700 transition">
        {{ $t('common.tryAgain') }}
      </router-link>

      <button @click="$router.push('/')" class="block mx-auto mt-3 text-gray-500 text-sm hover:text-green-600">
        {{ $t('common.close') }}
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

<style scoped>

.text-primary {
  color: #2c702c !important;
}

[data-theme="forest"] .text-primary {
  color: #16af3f !important;
}

.bg-primary {
  background-color: rgb(235, 255, 235) !important;
}

[data-theme="forest"] .bg-primary {
  background-color: rgb(41, 41, 41) !important;
}

.text-secondary {
  color: #2c702c !important;
}

[data-theme="forest"] .text-secondary {
  color: rgb(9, 228, 75) !important;
}

.text-section {
  color: black !important;
}

[data-theme="forest"] .text-section {
  color: white !important;
}

.bg-myprofile {
  background-color: #E9EBF8;
}

[data-theme="forest"] .bg-myprofile {
  background-color: #424141;
}

.bg-tabs {
  background-color: #ffffff;
}

[data-theme="forest"] .bg-tabs {
  background-color: #2C2C2C;
}
</style>
