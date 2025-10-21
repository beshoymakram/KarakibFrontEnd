<template>
  <nav class="relative bg-white shadow-sm">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="flex h-20 justify-between">
        <div class="flex">
          <!-- Mobile menu button -->
          <div class="mr-2 -ml-2 flex items-center md:hidden">
            <button type="button" @click="mobileMenuOpen = !mobileMenuOpen"
              class="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-[#2C702C] focus:ring-2 focus:ring-[#2C702C] focus:outline-hidden focus:ring-inset">
              <svg v-if="!mobileMenuOpen" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"
                class="size-6">
                <path d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="size-6">
                <path d="M6 18 18 6M6 6l12 12" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </button>
          </div>


          <div class="flex shrink-0 items-center">
            <router-link to="/" class="logo-link">
              <img src="/public/logos/logo_horizontal.svg" alt="Karakib" class="h-20 w-auto cursor-pointer" />
            </router-link>
          </div>

          <!-- Desktop Navigation -->
          <div class="hidden md:ml-6 md:flex md:space-x-8">
            <router-link to="/"
              class="inline-flex items-center px-4 my-3 text-sm font-bold rounded-lg text-[#2C702C] hover:bg-[#E0EBE0]">
              Home
            </router-link>
            <router-link to="/shop"
              class="inline-flex items-center px-4 my-3 text-sm font-bold rounded-lg text-[#2C702C] hover:bg-[#E0EBE0]">
              Shop
            </router-link>
            <router-link to="/add-waste"
              class="inline-flex items-center px-4 my-3 text-sm font-bold rounded-lg text-[#2C702C] hover:bg-[#E0EBE0]">
              Waste
            </router-link>
            <router-link to="/about"
              class="inline-flex items-center px-4 my-3 text-sm font-bold rounded-lg text-[#2C702C] hover:bg-[#E0EBE0]">
              About Us
            </router-link>
            <router-link to="/cart"
              class="inline-flex items-center px-4 my-3 text-sm font-bold rounded-lg text-[#2C702C] hover:bg-[#E0EBE0]">
              Cart <span class="text-warning px-2"> ({{ cartStore.count }}) </span>
            </router-link>
            <router-link to="/ar"
              class="inline-flex items-center px-4 my-3 text-sm font-bold rounded-lg text-[#2C702C] hover:bg-[#E0EBE0]">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="m10.5 21 5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 0 1 6-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 0 1-3.827-5.802" />
              </svg>
            </router-link>
          </div>
        </div>

        <div class="flex items-center space-x-4">
          <div v-if="auth.isAuthenticated" class="relative" ref="profileDropdown">
            <button @click="profileDropdownOpen = !profileDropdownOpen"
              class="flex rounded-full focus:outline-none focus:ring-2 focus:ring-[#2C702C] focus:ring-offset-2">
              <img :src="auth.user?.avatar_url || 'https://ui-avatars.com/api/?name=' + (auth.user?.name || 'User')"
                alt="Profile" class="size-8 rounded-full bg-gray-100" />
            </button>

            <Transition enter-active-class="transition ease-out duration-200"
              enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100"
              leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100"
              leave-to-class="transform opacity-0 scale-95">
              <div v-if="profileDropdownOpen" @click="profileDropdownOpen = false"
                class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <router-link to="/profile" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Your Profile
                </router-link>
                <router-link to="/settings" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Settings
                </router-link>
                <button @click="handleLogout"
                  class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Sign out
                </button>
              </div>
            </Transition>
          </div>

          <!-- Auth Buttons -->
          <div v-if="!auth.isAuthenticated" class="flex space-x-3">
            <router-link to="/login"
              class="inline-flex items-center rounded-md border border-[#2C702C] px-3 py-2 text-sm font-semibold text-[#2C702C] hover:bg-[#2C702C] hover:text-white transition-colors">
              Login
            </router-link>
            <router-link to="/register"
              class="inline-flex items-center rounded-md bg-[#2C702C] px-3 py-2 text-sm font-semibold text-white hover:bg-[#1a4d1a] transition-colors">
              Register
            </router-link>
          </div>

          <!-- Dashboard Button (Admin only) -->
          <router-link v-if="auth.isAuthenticated && auth.isAdmin" to="/admin"
            class="inline-flex items-center rounded-md border border-[#2C702C] px-3 py-2 text-sm font-semibold text-[#2C702C] hover:bg-[#2C702C] hover:text-white transition-colors">
            Dashboard
          </router-link>
        </div>
      </div>
    </div>

    <!-- Mobile menu -->
    <Transition enter-active-class="transition ease-out duration-200" enter-from-class="opacity-0"
      enter-to-class="opacity-100" leave-active-class="transition ease-in duration-150" leave-from-class="opacity-100"
      leave-to-class="opacity-0">
      <div v-if="mobileMenuOpen" class="md:hidden">
        <div class="space-y-1 pt-2 pb-3">
          <router-link to="/" @click="mobileMenuOpen = false"
            class="block border-l-4 border-[#2C702C] bg-[#E0EBE0] py-2 pl-3 pr-4 text-base font-medium text-[#2C702C]">
            Home
          </router-link>
          <router-link to="/shop" @click="mobileMenuOpen = false"
            class="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-[#2C702C] hover:border-gray-300 hover:bg-gray-50">
            Shop
          </router-link>
          <router-link to="/add-waste" @click="mobileMenuOpen = false"
            class="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-[#2C702C] hover:border-gray-300 hover:bg-gray-50">
            Waste
          </router-link>
          <router-link to="/about" @click="mobileMenuOpen = false"
            class="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-[#2C702C] hover:border-gray-300 hover:bg-gray-50">
            About Us
          </router-link>
        </div>
      </div>
    </Transition>
  </nav>
</template>

<script>
import { useAuthStore } from '@/stores/auth';
import { useCartStore } from '@/stores/cart';

export default {
  name: "NavBar",

  data() {
    return {
      mobileMenuOpen: false,
      profileDropdownOpen: false
    }
  },

  computed: {
    auth() {
      return useAuthStore();
    },
    cartStore() {
      return useCartStore();
    }
  },

  methods: {
    async handleLogout() {
      await this.auth.logout();
      this.$router.push('/login');
    },

    handleClickOutside(event) {
      const dropdown = this.$refs.profileDropdown;
      if (dropdown && !dropdown.contains(event.target)) {
        this.profileDropdownOpen = false;
      }
    }
  },


  mounted() {
    document.addEventListener('click', this.handleClickOutside);
  },

  beforeUnmount() {
    document.removeEventListener('click', this.handleClickOutside);
  }
};
</script>

<style scoped>
.router-link-exact-active {
  background-color: #e0ebe0;
}

.logo-link.router-link-exact-active {
  background-color: transparent !important;
}
</style>
