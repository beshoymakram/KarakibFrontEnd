<template>
  <nav  ref="navbar" class=" fixed  w-full
       shadow-sm z-50
           transition-transform duration-500 ease-in-out
           "
    :class="{ '-translate-y-full': isHidden }">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="flex h-12 sm:h-14 md:h-16 justify-between items-center ">
        <!-- Left Section -->
        <div class="flex items-center">
          <!-- Mobile Menu Button -->
          <div class="mx-1 flex items-center lg:hidden">
            <button type="button" @click="mobileMenuOpen = !mobileMenuOpen"
              class="relative inline-flex items-center justify-center rounded-md p-1 text-primary hover:bg-green-100 hover:text-primary focus:ring-primary focus:outline-hidden focus:ring-inset cursor-pointer">
              <svg v-if="!mobileMenuOpen" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"
                class="size-6">
                <path d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="size-6">
                <path d="M6 18 18 6M6 6l12 12" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </button>
          </div>

          <!-- Logo -->
          <div class="flex shrink-0 items-center">
            <router-link to="/" class="logo-link">
              <img src="/public/logos/logo_horizontal.svg" alt="Karakib"
                class="h-12 sm:h-14 md:h-16 w-auto cursor-pointer px-2" />
            </router-link>
          </div>

          <!-- Desktop Navigation -->
          <div class="hidden md:ml-4 lg:flex lg:space-x-6 md:space-x-1">
            <router-link to="/"
              class="inline-flex items-center px-2 py-2 my-4 text-sm font-bold rounded-lg text-primary hover:bg-[#E0EBE0]">
              {{ $t("common.home") }}
            </router-link>
            <router-link to="/shop"
              class="inline-flex items-center px-2 py-2 my-4 text-sm font-bold rounded-lg text-primary hover:bg-[#E0EBE0]">
              {{ $t("common.shop") }}
            </router-link>
            <router-link to="/add-waste"
              class="inline-flex items-center px-2 py-2 my-4 text-sm font-bold rounded-lg text-primary hover:bg-[#E0EBE0]">
              {{ $t("common.waste") }}
            </router-link>
            <router-link to="/about"
              class="inline-flex items-center px-2 py-2 my-4 text-sm font-bold rounded-lg text-primary hover:bg-[#E0EBE0]">
              {{ $t("common.about") }}
            </router-link>
          </div>
        </div>

        <!-- Right Section -->
        <div class="flex items-center space-x-2 md:space-x-4">
          <!-- Cart (Always visible) -->

          <NotificationDropdown v-if="auth.isAuthenticated" />
          <router-link to="/cart"
            class="relative inline-flex items-center justify-center px-2 pr-2 my-4  no-active-style  cursor-pointer rounded-lg  transition-transform duration-100 hover:scale-120">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32" role="img"
              aria-labelledby="cartTitle cartDesc"
              class="cart-icon  w-5 h-5 m:w-6 sm:h-6 md:w-7 md:h-7 text-primary   ">
              <title id="cartTitle">Shopping cart</title>
              <desc id="cartDesc">Outline icon of a shopping cart with two wheels</desc>
              <g fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                <path d="M3 3h2l1.6 9.6A2 2 0 0 0 8.5 15h8.9a2 2 0 0 0 1.9-1.5L21 6H6" />
                <circle cx="9" cy="20" r="1.6" />
                <circle cx="18" cy="20" r="1.6" />
              </g>
            </svg>

            <span v-if="cartStore.count > 0"
              class="absolute -top-1.5 right-0.5 md:right-0 bg-green-600 text-white text-[0.4rem] sm:text-[0.5rem] md:text-[0.6rem] font-semibold rounded-full w-3.5 h-3.5 sm:w-4 sm:h-4 md:size-4.5 flex items-center justify-center ">
              {{ cartStore.count }}
            </span>
          </router-link>

          <!-- Authenticated User Dropdown -->
          <div v-if="auth.isAuthenticated" class="relative " ref="profileDropdown">
            <button @click="profileDropdownOpen = !profileDropdownOpen"
              class="flex rounded-full    focus:ring-[#2c702c] forest-ring  forest-offset-ring  cursor-pointer hover:scale-110 focus:outline-none focus:ring-1
              focus:ring-offset-1 focus:ring-offset-[#e8f5e9]">
              <img :src="auth.user?.avatar_url ||
                'https://ui-avatars.com/api/?name=' + (auth.user?.name || 'User')
                " alt="Profile" class="size-6 sm:size-7 md:size-8 rounded-full " />
            </button>

            <Transition enter-active-class="transition ease-out duration-200"
              enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100"
              leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100"
              leave-to-class="transform opacity-0 scale-95">
              <div v-if="profileDropdownOpen" @click="profileDropdownOpen = false"
                class="absolute right-0 prof-dropdown z-10 mt-2 w-44 origin-top-right rounded-md bg-base-100 py-1 shadow-lg ring-1 ring-base-content/10 focus:outline-none">
                <router-link to="/profile" class="block px-3 py-2 text-sm text-primary  dark:hover:bg-gray-300">
                  {{ $t("common.profile") }}
                </router-link>
                <!-- <router-link to="/settings"
                  class="block px-3 py-2 text-sm text-primary dark:text-gray-200 dark:hover:bg-gray-300">
                  {{ $t("common.settings") }}
                </router-link> -->
                <button @click="handleLogout"
                  class="block px-3 py-2 text-sm text-primary dark:text-gray-200 dark:hover:bg-gray-300">
                  {{ $t("common.signOut") }}
                </button>
              </div>
            </Transition>

          </div>

          <!-- Desktop Auth Buttons -->
          <div v-if="!auth.isAuthenticated" class="hidden lg:flex space-x-3">
            <router-link to="/login"
              class="inline-flex items-center rounded-md border border-green-700 dark:border-green-600 px-3 py-2 text-sm font-semibold text-primary hover:bg-green-100 hover:text-base-content transition-colors">
              {{ $t("common.login") }}
            </router-link>
            <router-link to="/register"
              class="inline-flex items-center rounded-md bg-green-700 dark:bg-green-600 px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-green-600">
              {{ $t("common.register") }}
            </router-link>
          </div>
          <!-- Dashboard (Admin only) -->
          <router-link v-if="auth.isAuthenticated && auth.isAdmin" to="/admin"
            class="hidden md:inline-flex items-center rounded-md border border-green-300 px-3 py-2 text-sm font-semibold text-primary hover:bg-green-200 hover:text-primary-content transition-colors">
            {{ $t("common.dashboard") }}
          </router-link>

          <!-- Dashboard (Courier only) -->
          <router-link v-if="auth.isAuthenticated && auth.isCourier" to="/courier"
            class="hidden md:inline-flex items-center rounded-md border border-green-300 px-3 py-2 text-sm font-semibold text-primary hover:bg-green-200 hover:text-primary-content transition-colors">
            {{ $t("common.courierDashboard") }}
          </router-link>
          <!-- theme button -->
          <button @click="toggleTheme" class=" rounded-full transition-all duration-300 cursor-pointer hover:scale-120"
            aria-label="Toggle theme">
            <!-- Light Mode Icon -->
            <svg v-if="currentTheme === 'forest'" xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-sun w-5 h-5 m:w-6 sm:h-6 md:w-7 md:h-7 text-yellow-500" viewBox="0 0 16 16">
              <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6m0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8M8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0m0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13m8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5M3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8m10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0m-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0m9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707M4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708"/>
            </svg>

            <!-- Dark Mode Icon -->
            <svg v-else xmlns="http://www.w3.org/2000/svg" class=" w-5 h-5 m:w-6 sm:h-6 md:w-7 md:h-7 text-primary "
              fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
            </svg>
          </button>
          <!-- Language (always visible) -->
          <LanguageSwitcher />


        </div>
      </div>
    </div>

    <!-- Mobile Menu -->
    <Transition enter-active-class="transition ease-out duration-200" enter-from-class="opacity-0"
      enter-to-class="opacity-100" leave-active-class="transition ease-in duration-150" leave-from-class="opacity-100"
      leave-to-class="opacity-0">
      <div v-if="mobileMenuOpen" class="lg:hidden bg-base-100 border-t border-base-300">
        <div class="px-4 py-2 space-y-1 max-h-96 overflow-y-auto">
          <router-link to="/" @click="mobileMenuOpen = false"
            class="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base text-base-content font-medium hover:border-base-300 hover:bg-green-100">
            {{ $t("common.home") }}
          </router-link>
          <router-link to="/shop" @click="mobileMenuOpen = false"
            class="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-base-content hover:border-base-300 hover:bg-green-100">
            {{ $t("common.shop") }}
          </router-link>
          <router-link to="/add-waste" @click="mobileMenuOpen = false"
            class="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-base-content hover:border-base-300 hover:bg-green-100">
            {{ $t("common.waste") }}
          </router-link>
          <router-link to="/about" @click="mobileMenuOpen = false"
            class="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-base-content hover:border-base-300 hover:bg-green-100">
            {{ $t("common.about") }}
          </router-link>

          <!-- Mobile Auth -->
          <div v-if="!auth.isAuthenticated" class="pt-2 pb-2 border-t border-base-300">
            <router-link to="/login" @click="mobileMenuOpen = false"
              class="block py-2 pl-3 pr-4 text-base font-medium text-base-content hover:bg-green-100">
              {{ $t("common.login") }}
            </router-link>
            <router-link to="/register" @click="mobileMenuOpen = false"
              class="block py-2 pl-3 pr-4 text-base font-medium text-base-content hover:bg-green-100">
              {{ $t("common.register") }}
            </router-link>
          </div>

          <!-- Mobile Profile -->
          <div v-if="auth.isAuthenticated" class="pt-2 pb-2 border-t border-base-300">
            <router-link to="/profile" @click="mobileMenuOpen = false"
              class="block py-2 pl-3 pr-4 text-base font-medium text-base-content hover:bg-green-100">
              {{ $t("common.profile") }}
            </router-link>
            <!-- <router-link to="/settings" @click="mobileMenuOpen = false"
              class="block py-2 pl-3 pr-4 text-base font-medium text-base-content hover:bg-green-100">
              {{ $t("common.settings") }}
            </router-link> -->
            <router-link v-if="auth.isAdmin" to="/admin" @click="mobileMenuOpen = false"
              class="block py-2 pl-3 pr-4 text-base font-medium text-base-content hover:bg-green-100">
              {{ $t("common.dashboard") }}
            </router-link>
            <router-link v-if="auth.isCourier" to="/courier" @click="mobileMenuOpen = false"
              class="block py-2 pl-3 pr-4 text-base font-medium text-base-content hover:bg-green-100">
              {{ $t("common.courierDashboard") }}
            </router-link>
            <button @click="handleLogout(); mobileMenuOpen = false"
              class="block py-2 pl-3 pr-4 text-base font-medium text-[#2C702C] dark:text-green-400 hover:bg-gray-50 dark:hover:bg-gray-800">
              {{ $t("common.signOut") }}
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </nav>
</template>

<script>
import { useAuthStore } from "@/stores/auth";
import { useCartStore } from "@/stores/cart";
import LanguageSwitcher from "./LanguageSwitcher.vue";
import NotificationDropdown from "./NotificationDropdown.vue";

export default {
  name: "NavBar",

  data() {
    return {
      mobileMenuOpen: false,
      profileDropdownOpen: false,
      currentTheme: "light",
      isHidden: false,
      lastScrollTop: 0,

    };
  },

  components: {
    LanguageSwitcher,
    NotificationDropdown
  },

  computed: {
    auth() {
      return useAuthStore();
    },
    cartStore() {
      return useCartStore();
    },
  },

  methods: {
    async handleLogout() {
      await this.auth.logout();
      const cartStore = useCartStore();
      await cartStore.fetchCart();
      this.$router.push("/login");
    },

    handleClickOutside(event) {
      const dropdown = this.$refs.profileDropdown;
      if (dropdown && !dropdown.contains(event.target)) {
        this.profileDropdownOpen = false;
      }
    },
    toggleTheme() {
      const newTheme = this.currentTheme === "light" ? "forest" : "light";
      document.documentElement.dataset.theme = newTheme;
      this.currentTheme = newTheme;
      localStorage.setItem("theme", newTheme);
    },


    handleScroll() {
      const currentScroll =
        window.scrollY || document.documentElement.scrollTop

      // Hide when scrolling down, show when scrolling up
      if (currentScroll > this.lastScrollTop && currentScroll > 100) {
        this.isHidden = true
      } else {
        this.isHidden = false
      }

      this.lastScrollTop = currentScroll <= 0 ? 0 : currentScroll
    },
  },

  mounted() {
    document.addEventListener("click", this.handleClickOutside);
    const savedTheme = localStorage.getItem("theme") || "light";
    this.currentTheme = savedTheme;
    document.documentElement.dataset.theme = savedTheme;
     window.addEventListener('scroll', this.handleScroll)
  },

  beforeUnmount() {
    document.removeEventListener("click", this.handleClickOutside);

    window.removeEventListener('scroll', this.handleScroll);

  },
};
</script>

<style scoped>

[data-theme="forest"] .forest-ring {
  --tw-ring-color: #16af3f !important;
}
[data-theme="forest"] .forest-offset-ring {
  --tw-ring-offset-color: rgb(62, 62, 62) !important;
}
.router-link-exact-active:not(.no-active-style) {
  /*padding: 10px;*/
  background-color: #e0ebe0;
}

/* Custom hover effect for navigation links */
.router-link:not(.router-link-exact-active):hover {
  background-color: #e0ebe0 !important;
}

[data-theme="forest"] .router-link-exact-active:not(.no-active-style) {
  background-color: rgb(62, 62, 62) !important;
}


.logo-link.router-link-exact-active {
  background-color: transparent !important;
}

[data-theme="forest"] .logo-link.router-link-exact-active {
  background-color: transparent !important;
}

.cart-icon {
  color: hsl(var(--p));
  cursor: pointer;
  transition: color 0.3s ease, transform 0.2s ease;
}

/* .cart-icon:hover {
  color: hsl(var(--p) / 0.8);
  transform: scale(1.1);
} */

/* Force override DaisyUI primary colors */
.text-primary {
  color: #2c702c !important;
}

[data-theme="forest"] .text-primary {
  color: #16af3f !important;
}

.bg-primary {
  background-color: rgb(235, 255, 235) !important;
}

[data-theme="forest"] .bg-primary {
  background-color: rgb(41, 41, 41) !important;
}

.bg-secondary {
  background-color: #4b934b !important;
}

.bg-secondary:hover {
  background-color: #38a838 !important;
}

[data-theme="forest"] .bg-secondary {
  background-color: rgb(38, 154, 73) !important;
}

.text-secondary {
  color: #2c702c !important;
}

[data-theme="forest"] .text-secondary {
  color: rgb(9, 228, 75) !important;
}

.text-section {
  color: black !important;
}

[data-theme="forest"] .text-section {
  color: white !important;
}




nav {
  backdrop-filter: blur(10px);
  background-color: rgba(255, 255, 255, 0.8);
}

/* Forest theme override */
[data-theme='forest'] nav {
  background-color: rgba(0, 0, 0, 0.8);
}

/* RTL Support */
html[dir="rtl"] .prof-dropdown {
  left: 0;
  right: auto;
}

</style>
