<template>
  <transition name="fade">
    <div
      v-if="visible"
      class="fixed inset-0 flex items-center justify-center bg-white/80 z-[9999]"
    >
      <div class="space-y-4 text-center">
        <div class="w-16 h-16 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin mx-auto"></div>
        <p class="text-gray-600 font-medium text-lg">Loading...</p>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { computed } from 'vue';
import { useLoadingStore } from '@/stores/loading';

const loadingStore = useLoadingStore();
const visible = computed(() => loadingStore.isLoading);
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
