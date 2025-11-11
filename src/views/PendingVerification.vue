<template>
  <div class="flex items-center justify-center min-h-screen bg-[#E9EBF8]">
    <div class="bg-white rounded-2xl shadow-lg p-8 text-center max-w-md w-full">
      <!-- Animated Clock Icon -->
      <div class="relative w-32 h-32 mx-auto mb-6">
        <div class="absolute inset-0 bg-yellow-100 rounded-full animate-pulse"></div>
        <div class="relative flex items-center justify-center w-full h-full">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="w-20 h-20 text-yellow-600">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
        </div>
      </div>

      <h2 class="text-2xl font-bold text-[#2C702C] mb-2">{{ $t('common.accountPendingVerification') }}</h2>
      <p class="text-gray-600 mb-6">
        {{ $t('common.accountPendingDescription') }}
      </p>

      <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6 text-left">
        <div class="flex items-start gap-3">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
            class="w-6 h-6 text-yellow-600 flex-shrink-0 mt-0.5">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
          </svg>
          <div class="text-sm text-gray-700">
            <p class="font-semibold text-yellow-800 mb-1">{{ $t('common.whatsNext') }}</p>
            <ul class="space-y-1 text-gray-600">
              <li>• {{ $t('common.adminWillReviewYourApplication') }}</li>
              <li>• {{ $t('common.youWillReceiveEmailNotification') }}</li>
              <li>• {{ $t('common.verificationUsuallyTakes24Hours') }}</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="flex flex-col gap-3">
        <button @click="$router.push('/login')"
          class="w-full bg-[#2C702C] text-white py-3 px-6 rounded-lg hover:bg-[#1a4d1a] transition font-semibold">
          {{ $t('common.backToLogin') }}
        </button>

        <button @click="$router.push('/')"
          class="w-full border border-gray-300 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-50 transition">
          {{ $t('common.goToHomepage') }}
        </button>
      </div>

      <p class="text-xs text-gray-500 mt-6">
        {{ $t('common.needHelp') }}
        <a href="mailto:support@karakib.com" class="text-[#2C702C] hover:underline font-semibold">
          {{ $t('common.contactSupport') }}
        </a>
      </p>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Optional: Auto-redirect to login after 30 seconds
// onMounted(() => {
//   setTimeout(() => {
//     router.push('/login')
//   }, 30000)
// })
</script>

<style scoped>
@keyframes pulse {

  0%,
  100% {
    opacity: 1;
  }

  50% {
    opacity: 0.5;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>
