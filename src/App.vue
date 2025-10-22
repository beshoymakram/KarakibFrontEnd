<template>
    <NavBar/>
    <router-view/>
    <FooterSection/>
      <SkeletonLoader />

</template>

<script>
import FooterSection from './components/FooterSection.vue';
import NavBar from './components/NavBar.vue'
import SkeletonLoader from './views/SkeletonLoader.vue';

export default {
  name: 'App',
  components: {
    NavBar,
    FooterSection,
    SkeletonLoader
  }
}
</script>

<style>

</style>
