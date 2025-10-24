<template>
  <nav class="relative bg-white shadow-sm">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="flex h-20 justify-between">
        <div class="flex">
          <!-- Mobile menu button -->
          <div class="mr-2 -ml-2 flex items-center md:hidden">
            <button
              type="button"
              @click="mobileMenuOpen = !mobileMenuOpen"
              class="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-[#2C702C] focus:ring-2 focus:ring-[#2C702C] focus:outline-hidden focus:ring-inset"
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
              class="inline-flex items-center px-2 my-4 text-sm font-bold rounded-lg text-[#2C702C] hover:bg-[#E0EBE0]"
            >
              {{ $t("common.home") }}
            </router-link>
            <router-link
              to="/shop"
              class="inline-flex items-center px-2 my-4 text-sm font-bold rounded-lg text-[#2C702C] hover:bg-[#E0EBE0]"
            >
              {{ $t("common.shop") }}
            </router-link>
            <router-link
              to="/add-waste"
              class="inline-flex items-center px-2 my-4 text-sm font-bold rounded-lg text-[#2C702C] hover:bg-[#E0EBE0]"
            >
              {{ $t("common.waste") }}
            </router-link>
            <router-link
              to="/about"
              class="inline-flex items-center px-2 my-4 text-sm font-bold rounded-lg text-[#2C702C] hover:bg-[#E0EBE0]"
            >
              {{ $t("common.about") }}
            </router-link>

          </div>
        </div>

        <div class="flex items-center space-x-4">
<!------ Cart  ------->
          <router-link
            to="/cart"
            class="relative inline-flex items-center justify-center px-2 my-4 text-sm font-bold text-[#2C702C] hover:bg-[#E0EBE0] rounded-lg"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 576 512"
              fill="none"
              stroke="currentColor"
              stroke-width="32"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="cart-icon size-6"
            >
              <path
                d="M160 416a48 48 0 1 0 48 48 48 48 0 0 0-48-48Zm288 0a48 48 0 1 0 48 48 48 48 0 0 0-48-48Zm-279.6-96h281.2a32 32 0 0 0 31.1-24.3l47.6-208A16 16 0 0 0 512 80H128L112.5 16.5A16 16 0 0 0 97 8H24A8 8 0 0 0 16 16v16a8 8 0 0 0 8 8h58.8l70.3 281.2A32 32 0 0 0 168.4 320Z"
              />
            </svg>

            <span
              v-if="cartStore.count > 0"
              class="absolute -top-2 -right-2 bg-green-600 text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center"
            >
              {{ cartStore.count }}
            </span>
          </router-link>

          <div v-if="auth.isAuthenticated" class="relative" ref="profileDropdown">
            <button
              @click="profileDropdownOpen = !profileDropdownOpen"
              class="flex rounded-full focus:outline-none focus:ring-2 focus:ring-[#2C702C] focus:ring-offset-2"
            >
              <img
                :src="
                  auth.user?.avatar_url ||
                  'https://ui-avatars.com/api/?name=' + (auth.user?.name || 'User')
                "
                alt="Profile"
                class="size-8 rounded-full bg-gray-100"
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
                class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              >
                <router-link
                  to="/profile"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  {{ $t("common.profile") }}
                </router-link>
                <router-link
                  to="/settings"
                  class="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  {{ $t("common.settings") }}
                </router-link>
                <button
                  @click="handleLogout"
                  class="block w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  {{ $t("common.signOut") }}
                </button>
              </div>
            </Transition>
          </div>

          <!-- Auth Buttons -->
          <div v-if="!auth.isAuthenticated" class="flex space-x-3">
            <router-link
              to="/login"
              class="inline-flex items-center rounded-md border border-[#2C702C] px-3 py-2 text-sm font-semibold text-[#2C702C] hover:bg-[#2C702C] hover:text-white transition-colors"
            >
              {{ $t("common.login") }}
            </router-link>
            <router-link
              to="/register"
              class="inline-flex items-center rounded-md bg-[#2C702C] px-3 py-2 text-sm font-semibold text-white hover:bg-[#1a4d1a] transition-colors"
            >
              {{ $t("common.register") }}
            </router-link>
          </div>
          <LanguageSwitcher />
          <!-- Dashboard Button (Admin only) -->
          <router-link
            v-if="auth.isAuthenticated && auth.isAdmin"
            to="/admin"
            class="inline-flex items-center rounded-md border border-[#2C702C] px-3 py-2 text-sm font-semibold text-[#2C702C] hover:bg-[#2C702C] hover:text-white transition-colors"
          >
            {{ $t("common.dashboard") }}
          </router-link>
        </div>
      </div>
    </div>

    <!-- Mobile menu -->
    <Transition
      enter-active-class="transition ease-out duration-200"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition ease-in duration-150"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="mobileMenuOpen" class="md:hidden bg-white border-t border-gray-200">
        <div class="px-4 py-2 space-y-1 max-h-96 overflow-y-auto">
          <router-link
            to="/"
            @click="mobileMenuOpen = false"
            class="block border-l-4 border-[#2C702C] bg-[#E0EBE0] py-2 pl-3 pr-4 text-base font-medium text-[#2C702C]"
          >
            {{ $t("common.home") }}
          </router-link>
          <router-link
            to="/shop"
            @click="mobileMenuOpen = false"
            class="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-[#2C702C] hover:border-gray-300 hover:bg-gray-50"
          >
            {{ $t("common.shop") }}
          </router-link>
          <router-link
            to="/add-waste"
            @click="mobileMenuOpen = false"
            class="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-[#2C702C] hover:border-gray-300 hover:bg-gray-50"
          >
            {{ $t("common.waste") }}
          </router-link>
          <router-link
            to="/about"
            @click="mobileMenuOpen = false"
            class="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-[#2C702C] hover:border-gray-300 hover:bg-gray-50"
          >
            {{ $t("common.about") }}
          </router-link>
          <router-link
            to="/cart"
            @click="mobileMenuOpen = false"
            class="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-[#2C702C] hover:border-gray-300 hover:bg-gray-50"
          >
            {{ $t("common.cart") }} <span class="text-warning px-2">({{ cartStore.count }})</span>
          </router-link>

          <!-- Mobile Auth Buttons -->
          <div v-if="!auth.isAuthenticated" class="pt-2 pb-2 border-t border-gray-200">
            <router-link
              to="/login"
              @click="mobileMenuOpen = false"
              class="block py-2 pl-3 pr-4 text-base font-medium text-[#2C702C] hover:bg-gray-50"
            >
              {{ $t("common.login") }}
            </router-link>
            <router-link
              to="/register"
              @click="mobileMenuOpen = false"
              class="block py-2 pl-3 pr-4 text-base font-medium text-[#2C702C] hover:bg-gray-50"
            >
              {{ $t("common.register") }}
            </router-link>
          </div>

          <!-- Mobile Profile Links -->
          <div v-if="auth.isAuthenticated" class="pt-2 pb-2 border-t border-gray-200">
            <router-link
              to="/profile"
              @click="mobileMenuOpen = false"
              class="block py-2 pl-3 pr-4 text-base font-medium text-[#2C702C] hover:bg-gray-50"
            >
              {{ $t("common.profile") }}
            </router-link>
            <router-link
              to="/settings"
              @click="mobileMenuOpen = false"
              class="block py-2 pl-3 pr-4 text-base font-medium text-[#2C702C] hover:bg-gray-50"
            >
              {{ $t("common.settings") }}
            </router-link>
            <router-link
              v-if="auth.isAdmin"
              to="/admin"
              @click="mobileMenuOpen = false"
              class="block py-2 pl-3 pr-4 text-base font-medium text-[#2C702C] hover:bg-gray-50"
            >
              {{ $t("common.dashboard") }}
            </router-link>
            <button
              @click="
                handleLogout;
                mobileMenuOpen = false;
              "
              class="block w-full text-left py-2 pl-3 pr-4 text-base font-medium text-[#2C702C] hover:bg-gray-50"
            >
              {{ $t("common.signOut") }}
            </button>
          </div>

          <!-- Language Switcher in Mobile -->
          <div class="pt-2 pb-2 border-t border-gray-200">
            <div class="px-3 py-2">
              <LanguageSwitcher />
            </div>
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
  },

  mounted() {
    document.addEventListener("click", this.handleClickOutside);
  },

  beforeUnmount() {
    document.removeEventListener("click", this.handleClickOutside);
  },
};
</script>

<style scoped>
.router-link-exact-active {
  background-color: #e0ebe0;
}

.logo-link.router-link-exact-active {
  background-color: transparent !important;
}
.cart-icon {
  color: #2c702c;
  cursor: pointer;
  transition: color 0.3s ease, transform 0.2s ease;
}

.cart-icon:hover {
  color: #265c26;
  transform: scale(1.1);
}
</style>
