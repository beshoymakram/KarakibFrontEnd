<template>
  <nav class="relative bg-white shadow-sm">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="flex h-20 justify-between">
        <!-- Left side: Logo & Links -->
        <div class="flex">
          <!-- Mobile Menu Button -->
          <div class="mr-2 -ml-2 flex items-center md:hidden">
            <button
              type="button"
              command="--toggle"
              commandfor="mobile-menu"
              class="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-[#2C702C] focus:ring-2 focus:ring-[#2C702C] focus:outline-hidden focus:ring-inset"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                data-slot="icon"
                aria-hidden="true"
                class="size-6"
              >
                <path
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
          </div>

          <!-- Logo -->
          <div class="flex shrink-0 items-center">
            <router-link to="/" custom v-slot="{ navigate }">
              <img
                src="/public/logos/logo_horizontal.svg"
                alt="Your Company"
                class="h-20 w-auto cursor-pointer"
                @click="navigate"
              />
            </router-link>
          </div>

          <!-- Navigation Links -->
          <div class="hidden md:ml-6 md:flex md:space-x-8">
            <router-link to="/" class="inline-flex items-center px-4 my-3 text-sm font-bold rounded-lg text-[#2C702C] hover:bg-[#E0EBE0]">
              Home
            </router-link>
            <router-link to="/shop" class="inline-flex items-center border-transparent px-4 my-3 text-sm font-bold rounded-lg text-[#2C702C] hover:bg-[#E0EBE0]">
              Shop
            </router-link>
            <router-link to="/add-waste" class="inline-flex items-center border-transparent px-4 my-3 text-sm font-bold rounded-lg text-[#2C702C] hover:bg-[#E0EBE0]">
              Waste
            </router-link>
            <router-link to="/about" class="inline-flex items-center border-transparent px-4 my-3 text-sm font-bold rounded-lg text-[#2C702C] hover:bg-[#E0EBE0]">
              About Us
            </router-link>
          </div>
        </div>

        <!-- Right side: Cart + Auth -->
        <div class="flex items-center space-x-4">
          <!-- 🛒 Cart -->
          <router-link
            to="/cart"
            class="relative inline-flex items-center justify-center text-[#2C702C] hover:text-green-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.8"
              stroke="currentColor"
              class="w-7 h-7"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M2.25 3h1.386a.75.75 0 0 1 .728.568L5.82 9.75H19.5a.75.75 0 0 1 .728.932l-1.5 6a.75.75 0 0 1-.728.568H8.25M5.25 9.75l1.5 6M8.25 21a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm10.5 0a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
              />
            </svg>

            <!-- Cart item count badge -->
            <span
              v-if="cart.totalItems > 0"
              class="absolute -top-1 -right-2 bg-red-600 text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center"
            >
              {{ cart.totalItems }}
            </span>
          </router-link>

          <!-- Auth Buttons -->
          <div v-if="!auth.isAuthenticated">
            <router-link
              to="/login"
              class="relative inline-flex items-center gap-x-1.5 mx-3 rounded-md cursor-pointer text-[#2C702C] border border-[#2C702C] px-3 py-2 text-sm font-semibold hover:bg-[#2C702C] hover:text-white"
            >
              Login
            </router-link>
            <router-link
              to="/register"
              class="relative inline-flex items-center gap-x-1.5 mx-3 rounded-md cursor-pointer bg-[#2C702C] px-3 py-2 text-sm font-semibold text-white"
            >
              Register
            </router-link>
          </div>

          <div v-else>
            <router-link
              to="/logout"
              class="relative inline-flex items-center gap-x-1.5 mx-3 rounded-md cursor-pointer bg-[#2C702C] px-3 py-2 text-sm font-semibold text-white"
            >
              Logout
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { useCartStore } from '@/stores/cart'
/* import authService from "@/services/authService"; */ // Uncomment if needed

export default {
  name: 'NavBar',
  computed: {
    cart() {
      return useCartStore()
    },
    auth() {
      return { isAuthenticated: false } // replace with your actual auth logic
    }
  },
}
</script>

<style scoped>
.router-link-exact-active {
  background-color: #e0ebe0;
}
</style>
