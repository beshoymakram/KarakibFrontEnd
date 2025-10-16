<template>
  <NavBar />
  <router-view class="" />
</template>

<script>
import NavBar from './components/NavBar.vue' // adjust path if NavBar.vue is in a different folder

export default {
  name: 'App',
  components: {
    NavBar
  }
}
</script>

<style>

</style>
