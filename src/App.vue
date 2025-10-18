<template>
    <NavBar/>
    <router-view/>
    <FooterSection/>
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
