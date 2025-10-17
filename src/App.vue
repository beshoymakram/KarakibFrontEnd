<template>
  <div id="app">
    <NavBar />

    <router-view class="" />
        <FooterSection />
  </div>
</template>

<script>
import FooterSection from './components/FooterSection.vue';
import NavBar from './components/NavBar.vue'

export default {
  name: 'App',
  components: {
    NavBar,
    FooterSection
  }
}
</script>

<style>

</style>
