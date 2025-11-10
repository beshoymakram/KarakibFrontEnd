<template>
  <transition name="fade">
    <div v-if="loading" class="fixed inset-0 flex flex-col items-center justify-center bg-white z-9999">
      <!-- Bouncing Logo -->
      <img src="/public/logos/K.png" alt="Logo" class="w-28 h-28 animate-bounce mb-6" />

      <!-- Moving Text -->
      <div class="flex flex-col items-center space-y-2">
        <p class="text-xl font-semibold text-[#2C702C] animate-text-bounce">
          {{ $t('common.loading') }}
        </p>
        <div class="flex space-x-2 mt-3">
          <span class="w-3 h-3 bg-[#2C702C] rounded-full animate-dot delay-0"></span>
          <span class="w-3 h-3 bg-[#2C702C] rounded-full animate-dot delay-150"></span>
          <span class="w-3 h-3 bg-[#2C702C] rounded-full animate-dot delay-300"></span>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { computed } from 'vue'
import { useLoadingStore } from '@/stores/loading'

const loadingStore = useLoadingStore()
const loading = computed(() => loadingStore.isLoading)
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Custom bounce animation for the logo */
@keyframes bounce-slow {

  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-15px);
  }
}

.animate-bounce-slow {
  animation: bounce-slow 2s infinite;
}

/* Text bounce */
@keyframes text-bounce {

  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(8px);
  }
}

.animate-text-bounce {
  animation: text-bounce 1.8s infinite ease-in-out;
}

/* Dots pulsing */
@keyframes dot {

  0%,
  80%,
  100% {
    opacity: 0.2;
    transform: scale(0.9);
  }

  40% {
    opacity: 1;
    transform: scale(1.3);
  }
}

.animate-dot {
  animation: dot 1.4s infinite ease-in-out;
}

.delay-0 {
  animation-delay: 0s;
}

.delay-150 {
  animation-delay: 0.15s;
}

.delay-300 {
  animation-delay: 0.3s;
}
</style>
