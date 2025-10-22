<template>
    <NavBar/>
    <router-view/>
    <FooterSection/>
    <SkeletonLoader v-if="loadingStore.isLoading" />

</template>

<script>
import FooterSection from './components/FooterSection.vue';
import NavBar from './components/NavBar.vue'
import SkeletonLoader from './views/SkeletonLoader.vue';
import { useLoadingStore } from "@/stores/loading";

export default {
  name: 'App',
  components: {
    NavBar,
    FooterSection,
    SkeletonLoader
  }
  ,
  setup() {
    const loadingStore = useLoadingStore();
    return { loadingStore };
  }
}
</script>

<style>

</style>
