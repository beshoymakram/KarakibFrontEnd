<template>
  <nav class="relative bg-white shadow-sm">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="flex h-20 justify-between">
        <div class="flex">
          <div class="mr-2 -ml-2 flex items-center md:hidden">
            <button
              type="button"
              command="--toggle"
              commandfor="mobile-menu"
              class="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-[#2C702C] focus:ring-2 focus:ring-[#2C702C] focus:outline-hidden focus:ring-inset"
            >
              <span class="absolute -inset-0.5"></span>
              <span class="sr-only">Open main menu</span>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                data-slot="icon"
                aria-hidden="true"
                class="size-6 in-aria-expanded:hidden"
              >
                <path
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                data-slot="icon"
                aria-hidden="true"
                class="size-6 not-in-aria-expanded:hidden"
              >
                <path d="M6 18 18 6M6 6l12 12" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </button>
          </div>
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

          <div class="hidden md:ml-6 md:flex md:space-x-8">
            <router-link
              to="/"
              class="inline-flex items-center px-4 my-3 text-sm font-bold rounded-lg text-[#2C702C] hover:bg-[#E0EBE0]"
              >Home</router-link
            >
            <router-link
              to="/shop"
              class="inline-flex items-center border-transparent px-4 my-3 text-sm font-bold rounded-lg text-[#2C702C] hover:border-gray-300 hover:bg-[#E0EBE0]"
              >Shop</router-link
            >
            <router-link
              to="/add-waste"
              class="inline-flex items-center border-transparent px-4 my-3 text-sm font-bold rounded-lg text-[#2C702C] hover:border-gray-300 hover:bg-[#E0EBE0]"
              >Waste</router-link
            >
            <router-link
              to="/about"
              class="inline-flex items-center border-transparent px-4 my-3 text-sm font-bold rounded-lg text-[#2C702C] hover:border-gray-300 hover:bg-[#E0EBE0]"
              >About Us</router-link
            >
            <router-link
              to="/ar"
              class="inline-flex items-center border-transparent px-4 my-3 text-sm font-bold rounded-lg text-[#2C702C] hover:border-gray-300 hover:bg-[#E0EBE0]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m10.5 21 5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 0 1 6-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 0 1-3.827-5.802"
                />
              </svg>
            </router-link>
          </div>
        </div>
        <div class="flex items-center">
          <div class="shrink-0" v-if="!auth.isAuthenticated">
            <router-link
              to="/login"
              class="relative inline-flex items-center gap-x-1.5 mx-3 rounded-md cursor-pointer text-[#2C702C] border-1 border-[#2C702C] px-3 py-2 text-sm font-semibold shadow-xs hover:bg-[#2C702C] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2C702C]"
            >
              Login
            </router-link>
            <router-link
              to="/register"
              class="relative inline-flex items-center gap-x-1.5 mx-3 rounded-md cursor-pointer bg-[#2C702C] px-3 py-2 text-sm font-semibold text-white shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2C702C]"
            >
              Register
            </router-link>
          </div>
          <div class="shrink-0" v-if="auth.isAuthenticated">
            <router-link
              to="/logout"
              class="relative inline-flex items-center gap-x-1.5 mx-3 rounded-md cursor-pointer bg-[#2C702C] px-3 py-2 text-sm font-semibold text-white shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2C702C]"
            >
              Logout
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <el-disclosure id="mobile-menu" hidden class="block md:hidden">
      <div class="space-y-1 pt-2 pb-3">
        <router-link
          to="/"
          class="block border-l-4 py-2 pr-4 pl-3 text-base font-medium text-[#2C702C] sm:pr-6 sm:pl-5 bg-[#E0EBE0]"
          >Home</router-link
        >
        <router-link
          to="/"
          class="block border-l-4 border-transparent py-2 pr-4 pl-3 text-base font-medium text-[#2C702C] hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800 sm:pr-6 sm:pl-5"
          >Shop</router-link
        >
        <router-link
          to="/"
          class="block border-l-4 border-transparent py-2 pr-4 pl-3 text-base font-medium text-[#2C702C] hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800 sm:pr-6 sm:pl-5"
          >Waste</router-link
        >
        <router-link
          to="/"
          class="block border-l-4 border-transparent py-2 pr-4 pl-3 text-base font-medium text-[#2C702C] hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800 sm:pr-6 sm:pl-5"
          >About Us</router-link
        >
      </div>
    </el-disclosure>
  </nav>
</template>

<script>
/* import authService from "@/services/authService"; */ /* uncomment at use  //maryam */

export default {
  name: "NavBar",
};
</script>

<style scoped>
/* Optional active link styling */
.router-link-exact-active {
  background-color: #e0ebe0;
}
</style>
