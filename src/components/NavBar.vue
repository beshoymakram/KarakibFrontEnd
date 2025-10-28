<template>
  <nav class="relative bg-base-100 shadow-sm">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="flex h-20 justify-between items-center">
        <!-- Left Section -->
        <div class="flex items-center">
          <!-- Mobile Menu Button -->
          <div class="mr-2 -ml-2 flex items-center md:hidden">
            <button
              type="button"
              @click="mobileMenuOpen = !mobileMenuOpen"
              class="relative inline-flex items-center justify-center rounded-md p-2 text-primary hover:bg-green-100 hover:text-primary focus:ring-primary focus:outline-hidden focus:ring-inset cursor-pointer"
            >
              <svg
                v-if="!mobileMenuOpen"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                class="size-6"
              >
                <path
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <svg
                v-else
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                class="size-6"
              >
                <path d="M6 18 18 6M6 6l12 12" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </button>
          </div>

          <!-- Logo -->
          <div class="flex shrink-0 items-center">
            <router-link to="/" class="logo-link">
              <img
                src="/public/logos/logo_horizontal.svg"
                alt="Karakib"
                class="h-20 w-auto cursor-pointer"
              />
            </router-link>
          </div>

          <!-- Desktop Navigation -->
          <div class="hidden md:ml-4 md:flex lg:space-x-6 md:space-x-1">
            <router-link
              to="/"
              class="inline-flex items-center px-2 py-2 my-4 text-sm font-bold rounded-lg text-primary hover:bg-[#E0EBE0]"
            >
              {{ $t("common.home") }}
            </router-link>
            <router-link
              to="/shop"
              class="inline-flex items-center px-2 py-2 my-4 text-sm font-bold rounded-lg text-primary hover:bg-[#E0EBE0]"
            >
              {{ $t("common.shop") }}
            </router-link>
            <router-link
              to="/add-waste"
              class="inline-flex items-center px-2 py-2 my-4 text-sm font-bold rounded-lg text-primary hover:bg-[#E0EBE0]"
            >
              {{ $t("common.waste") }}
            </router-link>
            <router-link
              to="/about"
              class="inline-flex items-center px-2 py-2 my-4 text-sm font-bold rounded-lg text-primary hover:bg-[#E0EBE0]"
            >
              {{ $t("common.about") }}
            </router-link>
          </div>
        </div>

        <!-- Right Section -->
        <div class="flex items-center space-x-4">
          <!-- Cart (Always visible) -->
           <!-- theme button -->
        <button
          @click="toggleTheme"
          class="btn btn-ghost btn-circle transition-all duration-300 hover:bg-base-200"
          aria-label="Toggle theme"
        >
          <!-- Light Mode Icon -->
          <svg
            v-if="currentTheme === 'forest'"
            xmlns="http://www.w3.org/2000/svg"
            class="w-6 h-6 md:w-7 md:h-7 text-yellow-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 3v1m0 16v1m8.485-8.485l-.707.707M4.222 4.222l.707.707M21 12h1M2 12H1m16.97 6.97l.707.707M4.222 19.778l.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z"
            />
          </svg>

          <!-- Dark Mode Icon -->
          <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            class="w-6 h-6 md:w-7 md:h-7 text-green-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"
            />
          </svg>
        </button>

          <router-link
            to="/cart"
            class="relative inline-flex items-center justify-center px-2 pr-2 my-4 text-md font-bold no-active-style text-primary rounded-lg"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 576 512"
              fill="none"
              stroke="currentColor"
              stroke-width="32"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="cart-icon size-7"
            >
              <path
                d="M160 416a48 48 0 1 0 48 48 48 48 0 0 0-48-48Zm288 0a48 48 0 1 0 48 48 48 48 0 0 0-48-48Zm-279.6-96h281.2a32 32 0 0 0 31.1-24.3l47.6-208A16 16 0 0 0 512 80H128L112.5 16.5A16 16 0 0 0 97 8H24A8 8 0 0 0 16 16v16a8 8 0 0 0 8 8h58.8l70.3 281.2A32 32 0 0 0 168.4 320Z"
              />
            </svg>
            <span
              v-if="cartStore.count > 0"
              class="absolute -top-3 -right-0 bg-green-600 text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center"
            >
              {{ cartStore.count }}
            </span>
          </router-link>

          <!-- Authenticated User Dropdown -->
          <div v-if="auth.isAuthenticated" class="relative hidden md:block" ref="profileDropdown">
            <button
              @click="profileDropdownOpen = !profileDropdownOpen"
              class="flex rounded-full focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
            >
              <img
                :src="
                  auth.user?.avatar_url ||
                  'https://ui-avatars.com/api/?name=' + (auth.user?.name || 'User')
                "
                alt="Profile"
                class="size-8 rounded-full bg-base-200"
              />
            </button>

            <Transition
              enter-active-class="transition ease-out duration-200"
              enter-from-class="transform opacity-0 scale-95"
              enter-to-class="transform opacity-100 scale-100"
              leave-active-class="transition ease-in duration-75"
              leave-from-class="transform opacity-100 scale-100"
              leave-to-class="transform opacity-0 scale-95"
            >
              <div
                v-if="profileDropdownOpen"
                @click="profileDropdownOpen = false"
                class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-base-100 py-1 shadow-lg ring-1 ring-base-content/10 focus:outline-none"
              >
                <router-link
                  to="/profile"
                  class="block px-3 py-2 text-sm text-primary  dark:hover:bg-gray-300"
                >
                  {{ $t("common.profile") }}
                </router-link>
                <router-link
                  to="/settings"
                  class="block px-3 py-2 text-sm text-primary dark:text-gray-200 dark:hover:bg-gray-300"
                >
                  {{ $t("common.settings") }}
                </router-link>
                <button
                  @click="handleLogout"
                  class="block w-full text-left px-3 py-2 text-sm text-primary dark:text-gray-200 dark:hover:bg-gray-300"
                >
                  {{ $t("common.signOut") }}
                </button>
              </div>
            </Transition>
          </div>

          <!-- Desktop Auth Buttons -->
          <div v-if="!auth.isAuthenticated" class="hidden md:flex space-x-3">
            <router-link
              to="/login"
              class="inline-flex items-center rounded-md border border-green-300 px-3 py-2 text-sm font-semibold text-primary hover:bg-green-100 hover:text-base-content transition-colors"
            >
              {{ $t("common.login") }}
            </router-link>
            <router-link
              to="/register"
              class="inline-flex items-center rounded-md bg-green-700 px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-green-600"
            >
              {{ $t("common.register") }}
            </router-link>
          </div>

          <!-- Language (always visible) -->
          <LanguageSwitcher />

          <!-- Dashboard (Admin only) -->
          <router-link
            v-if="auth.isAuthenticated && auth.isAdmin"
            to="/admin"
            class="hidden md:inline-flex items-center rounded-md border border-green-300 px-3 py-2 text-sm font-semibold text-primary hover:bg-green-200 hover:text-primary-content transition-colors"
          >
            {{ $t("common.dashboard") }}
          </router-link>
        </div>
      </div>
    </div>

    <!-- Mobile Menu -->
    <Transition
      enter-active-class="transition ease-out duration-200"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition ease-in duration-150"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="mobileMenuOpen" class="md:hidden bg-base-100 border-t border-base-300">
        <div class="px-4 py-2 space-y-1 max-h-96 overflow-y-auto">
          <router-link
            to="/"
            @click="mobileMenuOpen = false"
            class="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base text-base-content font-medium hover:border-base-300 hover:bg-green-100"
          >
            {{ $t("common.home") }}
          </router-link>
          <router-link
            to="/shop"
            @click="mobileMenuOpen = false"
            class="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-base-content hover:border-base-300 hover:bg-green-100"
          >
            {{ $t("common.shop") }}
          </router-link>
          <router-link
            to="/add-waste"
            @click="mobileMenuOpen = false"
            class="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-base-content hover:border-base-300 hover:bg-green-100"
          >
            {{ $t("common.waste") }}
          </router-link>
          <router-link
            to="/about"
            @click="mobileMenuOpen = false"
            class="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-base-content hover:border-base-300 hover:bg-green-100"
          >
            {{ $t("common.about") }}
          </router-link>

          <!-- Mobile Auth -->
          <div v-if="!auth.isAuthenticated" class="pt-2 pb-2 border-t border-base-300">
            <router-link
              to="/login"
              @click="mobileMenuOpen = false"
              class="block py-2 pl-3 pr-4 text-base font-medium text-base-content hover:bg-green-100"
            >
              {{ $t("common.login") }}
            </router-link>
            <router-link
              to="/register"
              @click="mobileMenuOpen = false"
              class="block py-2 pl-3 pr-4 text-base font-medium text-base-content hover:bg-green-100"
            >
              {{ $t("common.register") }}
            </router-link>
          </div>

          <!-- Mobile Profile -->
          <div v-if="auth.isAuthenticated" class="pt-2 pb-2 border-t border-base-300">
            <router-link
              to="/profile"
              @click="mobileMenuOpen = false"
              class="block py-2 pl-3 pr-4 text-base font-medium text-base-content hover:bg-green-100"
            >
              {{ $t("common.profile") }}
            </router-link>
            <router-link
              to="/settings"
              @click="mobileMenuOpen = false"
              class="block py-2 pl-3 pr-4 text-base font-medium text-base-content hover:bg-green-100"
            >
              {{ $t("common.settings") }}
            </router-link>
            <router-link
              v-if="auth.isAdmin"
              to="/admin"
              @click="mobileMenuOpen = false"
              class="block py-2 pl-3 pr-4 text-base font-medium text-base-content hover:bg-green-100"
            >
              {{ $t("common.dashboard") }}
            </router-link>
            <button
              @click="handleLogout(); mobileMenuOpen = false"
              class="block w-full text-left py-2 pl-3 pr-4 text-base font-medium text-[#2C702C] dark:text-green-400 hover:bg-gray-50 dark:hover:bg-gray-800"
            >
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

export default {
  name: "NavBar",

  data() {
    return {
      mobileMenuOpen: false,
      profileDropdownOpen: false,
      currentTheme: "light",

    };
  },

  components: {
    LanguageSwitcher,
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
  },

  mounted() {
    document.addEventListener("click", this.handleClickOutside);
  },

  beforeUnmount() {
    document.removeEventListener("click", this.handleClickOutside);
    const savedTheme = localStorage.getItem("theme") || "light";
    this.currentTheme = savedTheme;
    document.documentElement.dataset.theme = savedTheme;
  },
};
</script>

<style scoped>
.router-link-exact-active:not(.no-active-style) {
  padding: 10px ;
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

.cart-icon:hover {
  color: hsl(var(--p) / 0.8);
  transform: scale(1.1);
}

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
  background-color: rgb(41, 41, 41)!important;
}
.bg-secondary {
  background-color: #4b934b !important;
  hover: #38a838 !important;
}
[data-theme="forest"] .bg-secondary {
  background-color: rgb(38, 154, 73)!important;
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


</style>
