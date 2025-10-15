<template>
  <div>
    <div class="navbar bg-gray-100 shadow-lg">
      <div class="flex-1 px-4">
        <router-link to="/" class="btn btn-ghost text-3xl text-green-700">
          Karakib
        </router-link>
      </div>

      <div class="flex-7 space-x-2">
        <router-link
          to="/"
          class="btn btn-ghost btn-sm text-xl text-green-700 rounded-btn"
        >
          Home
        </router-link>
        <router-link
          to="/about"
          class="btn btn-ghost btn-sm text-xl text-green-700 rounded-btn"
        >
          About
        </router-link>
        <router-link
          to="/add-waste"
          class="btn btn-ghost btn-sm text-xl text-green-700 rounded-btn"
        >
          Services
        </router-link>
        <router-link
          to="/contact"
          class="btn btn-ghost btn-sm text-xl text-green-700 rounded-btn"
        >
          Contact
        </router-link>
        <router-link
          to="/shop"
          class="btn btn-ghost btn-sm text-xl text-green-700 rounded-btn"
        >
          Shop
        </router-link>
      </div>

      <div class="flex-none">
        <button class="btn btn-ghost">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            class="inline-block h-5 w-5 stroke-current"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NavBar'
}
</script>

<style scoped>
/* Optional active link styling */
.router-link-exact-active {
  background-color: #16a34a; /* Tailwind green-600 */
  color: white !important;
}
</style>
