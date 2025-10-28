<template>
  <div class="bg-[#BFD6BF] min-h-screen py-8 px-4">
    <div class="w-full max-w-6xl mx-auto">
      <div
        class="overflow-hidden flex flex-col lg:flex-row rounded-xl shadow-lg dark:bg-gray-800/50 dark:shadow-none dark:outline dark:-outline-offset-1 dark:outline-white/10"
      >
        <!-- Form -->
        <div
          class="w-full lg:w-1/2 px-6 py-8 lg:py-12 bg-white flex justify-center items-center rounded-t-xl lg:rounded-l-xl lg:rounded-tr-none relative"
        >
          <div class="w-full max-w-md">
            <h1 class="font-extrabold text-3xl lg:text-4xl text-[#317C31] mb-4">
              Set password
            </h1>

            <p class="text-gray-400 text-base lg:text-lg mb-8">
              Your previous password has been reset. Please set a new password for your account.
            </p>

            <!-- Password Form -->
            <form @submit.prevent="handleSetPassword" class="w-full flex flex-col">
              <!-- Create Password -->
              <div class="form-group mb-5 flex flex-col w-full">
                <label class="pb-2 font-semibold text-base text-gray-800" for="password">
                  Create Password
                </label>
                <div class="relative">
                  <input
                    id="password"
                    v-model="password"
                    :type="showPassword ? 'text' : 'password'"
                    placeholder="Enter Password"
                    class="shadow-[0_10px_20px_5px_rgba(0,0,0,0.1)] border-0 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#317C31] w-full pr-12"
                    required
                  />
                  <button
                    type="button"
                    @click="togglePasswordVisibility"
                    class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <svg v-if="showPassword" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none"
                      viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none"
                      viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M3 3l3.59 3.59A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411L21 21" />
                    </svg>
                  </button>
                </div>

              </div>

              <!-- Re-enter Password -->
              <div class="form-group mb-5 flex flex-col w-full">
                <label class="pb-2 font-semibold text-base text-gray-800" for="confirmPassword">
                  Re-enter Password
                </label>
                <div class="relative">
                  <input
                    id="confirmPassword"
                    v-model="confirmPassword"
                    :type="showConfirm ? 'text' : 'password'"
                    placeholder="Re-enter Password"
                    class="shadow-[0_10px_20px_5px_rgba(0,0,0,0.1)] border-0 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#317C31] w-full pr-12"
                    required
                  />
                  <button
                    type="button"
                    @click="toggleConfirmVisibility"
                    class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <svg v-if="showConfirm" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none"
                      viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none"
                      viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M3 3l3.59 3.59A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411L21 21" />
                    </svg>
                  </button>
                </div>
                <p v-if="passwordMismatch" class="text-red-500 text-sm mt-2">
                  Passwords do not match.
                </p>
              </div>

              <!-- Submit Button -->
              <button
                type="submit"
                :disabled="loading"
                class="w-full bg-[#317C31] hover:bg-[#275a27] transition-colors font-semibold cursor-pointer text-white px-4 py-3 rounded-lg text-center disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {{ loading ? 'Setting password...' : 'Set password' }}
              </button>
            </form>
          </div>
        </div>

        <!-- Banner -->
        <div
          class="w-full lg:w-1/2 px-6 py-8 lg:py-12 bg-[#EAF2EA] text-center flex flex-col items-center justify-center rounded-b-xl lg:rounded-r-xl lg:rounded-tl-none"
        >
          <img
            class="w-full max-w-md mx-auto mb-8"
            src="../../public/images/young-guy-carrying-bag-with-garbage-trash-bin.png"
            alt="Recycling illustration"
          />
          <h2 class="font-extrabold text-2xl lg:text-3xl text-[#317C31] px-4">
            Let's get you back on your green journey!
          </h2>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { useAuthStore } from '@/stores/auth';
import { nextTick } from 'vue';

export default {
  name: "CreatePasswordView",
  setup() {
  const authStore = useAuthStore();
  return { authStore };
},
  data() {
    return {
      password: "",
      confirmPassword: "",
      showPassword: false,
      showConfirm: false,
      loading: false,
    };
  },
  computed: {
    passwordMismatch() {
      return this.confirmPassword && this.password !== this.confirmPassword;
    },
  },
  methods: {
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
    toggleConfirmVisibility() {
      this.showConfirm = !this.showConfirm;
    },
async handleSetPassword() {
  if (this.passwordMismatch) {
    this.$toast.error("Passwords do not match.");
    return;
  }

  this.loading = true;
  try {
    console.log("Setting password for user...");


    await new Promise((resolve) => setTimeout(resolve, 1000)); 


    this.authStore.isAuthenticated = true;
    this.authStore.user = { name: "Demo User" }; 
    localStorage.setItem('isAuthenticated', 'true'); 

    this.$toast.success("Password set successfully!");

    await this.$router.push("/");
    nextTick(() => {
      this.$toast.success("Logged in successfully!");
    });
  } catch (error) {
    console.error(error);
    this.$toast.error("Failed to set password. Try again.");
  } finally {
    this.loading = false;
  }
},

  },
};
</script>
