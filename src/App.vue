<template>
  <div id="app" class="min-h-screen bg-gray-50">
    <!-- Navbar (always visible) -->
    <NavBar />

    <!-- Page content rendered here -->
    <router-view />
  </div>
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
/* You can put global styles here or leave it empty if you’re using Tailwind */
body {
  margin: 0;
  font-family: 'Inter', sans-serif;
}
</style>
