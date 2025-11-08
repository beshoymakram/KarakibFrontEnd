<template>
  <NavBar />
  <router-view  class="pt-12 lg:pt-16"/>
  <ChatbotWidget/>
  <FooterSection />
  <SkeletonLoader v-if="loadingStore.isLoading" />
</template>

<script>
import ChatbotWidget from './components/ChatbotWidget.vue'
import FooterSection from './components/FooterSection.vue'
import NavBar from './components/NavBar.vue'
import SkeletonLoader from './views/SkeletonLoader.vue'
import { useLoadingStore } from '@/stores/loading'
import { onMounted } from 'vue'

export default {
  name: 'App',
  components: {
    NavBar,
    FooterSection,
    SkeletonLoader,
    ChatbotWidget
  },
  setup() {
    const loadingStore = useLoadingStore()

    // ✅ Theme logic
    onMounted(() => {
      const savedTheme = localStorage.getItem('theme')

      if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme)
      } else {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
        document.documentElement.setAttribute('data-theme', prefersDark ? 'forest' : 'light')

        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
          document.documentElement.setAttribute('data-theme', e.matches ? 'forest' : 'light')
        })
      }
    })

    return { loadingStore }
  },
}
</script>

<style>
/* keep your styles here if needed */
</style>
