<template>
  <div class="bg-myprofile min-h-screen py-8 px-4" :dir="$i18n.locale === 'ar' ? 'rtl' : 'ltr'">
    <div class="w-full max-w-6xl mx-auto pt-4 sm:pt-6 md:pt-8 lg:pt-10 ">
      <div
        class="overflow-hidden flex flex-col lg:flex-row rounded-xl shadow-lg dark:bg-gray-800/50 dark:shadow-none dark:outline dark:-outline-offset-1 dark:outline-white/10">

        <!-- Left Side - Banner -->
        <div
          :class="[
            'w-full', 'lg:w-1/2', 'px-6', 'py-8', 'lg:py-12', 'bg-tabs', 'text-center', 'flex', 'flex-col', 'items-center', 'justify-center', 'rounded-t-xl',
            $i18n.locale === 'ar' ? 'lg:rounded-r-xl lg:rounded-tl-none' : 'lg:rounded-l-xl lg:rounded-tr-none'
          ]">
          <img class="w-full max-w-xs lg:max-w-md mx-auto mb-6" src="/public/images/login.png" alt="Login Banner">
          <h1 class="font-extrabold text-2xl lg:text-3xl xl:text-4xl text-main text-shadow-lg mb-3">
            {{ $t('common.welcomeToKarakib') }}
          </h1>
          <p class="font-semibold text-base lg:text-xl px-4">
            {{ $t('common.everySmallActOfRecyclingCreatesCleanerTomorrow') }}
          </p>
        </div>

        <!-- Right Side - Form -->
        <div
          :class="[
            'w-full', 'lg:w-1/2', 'px-6', 'py-8', 'lg:py-12', 'bg-primary', 'flex', 'justify-center', 'items-center', 'rounded-b-xl',
            $i18n.locale === 'ar' ? 'lg:rounded-l-xl lg:rounded-br-none' : 'lg:rounded-r-xl lg:rounded-bl-none'
          ]">

          <div class="w-full max-w-md" v-if="!authStore.isAuthenticated">
            <h1 class="font-extrabold text-2xl lg:text-3xl text-main text-shadow-lg text-center mb-8">
              {{ $t('common.login') }}
            </h1>

            <!-- Google Login Button -->
            <button @click="handleGoogleLogin" type="button"
              class="w-full flex items-center justify-center gap-3 bg-tabs border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition-all font-medium text-section px-4 py-3 rounded-lg mb-6 shadow-sm">
              <svg class="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4" />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853" />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05" />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335" />
              </svg>
              {{ $t('common.continueWithGoogle') }}
            </button>

            <!-- Divider -->
            <div class="relative my-6">
              <div class="absolute inset-0 flex items-center">
                <div class="w-full border-t border-gray-300"></div>
              </div>
              <div class="relative flex justify-center text-sm">
                <span class="px-4 bg-white text-gray-500 font-medium">{{ $t('common.orContinueWithEmail') }}</span>
              </div>
            </div>

            <!-- Login Form -->
            <form @submit.prevent="handleLogin" class="w-full flex flex-col">
              <!-- Error Message -->
              <transition name="fade">
                <p v-if="errorMessage" class="text-red-600 text-center mb-4 font-medium">
                  {{ errorMessage }}
                </p>
              </transition>

              <div class="form-group mb-5 flex flex-col w-full">
                <label class="pb-2 font-medium text-sm lg:text-base" for="email">{{ $t('common.email') }}</label>
                <input
                  :class="[
                    'shadow-[0_10px_20px_5px_rgba(0,0,0,0.1)] px-3 py-3 rounded-lg focus:outline-none bg-tabs focus:ring-2 transition-all',
                    errorMessage ? 'border border-red-500' : 'border-0 focus:ring-[#317C31]'
                  ]"
                  placeholder="email@gmail.com" id="email" v-model="form.email" type="email"
                  @input="clearError" required />
              </div>

              <div class="form-group mb-2 flex flex-col w-full">
                <label class="pb-2 font-medium text-sm lg:text-base" for="password">{{ $t('common.password') }}</label>
                <input
                  :class="[
                    'shadow-[0_10px_20px_5px_rgba(0,0,0,0.1)] px-3 py-3 rounded-lg focus:outline-none bg-tabs focus:ring-2 transition-all',
                    errorMessage ? 'border border-red-500' : 'border-0 focus:ring-[#317C31]'
                  ]"
                  :placeholder="$t('common.passwordPlaceholder')" id="password" v-model="form.password" type="password"
                  @input="clearError" required />
              </div>

              <!-- Forgot Password Link -->
              <div class="mb-5 text-right">
                <router-link to="/forgot-password"
                  class="text-[#317C31] hover:underline font-medium text-sm lg:text-base">
                  {{ $t('common.forgotPassword') }}
                </router-link>
              </div>

              <button type="submit" :disabled="authStore.loading"
                class="w-full bg-[#317C31] hover:bg-[#275a27] transition-colors font-medium cursor-pointer text-white px-4 py-3 rounded-lg my-4 text-center disabled:bg-gray-400 disabled:cursor-not-allowed">
                {{ authStore.loading ? $t('common.loading') : $t('common.login') }}
              </button>
            </form>

            <p class="text-center font-medium text-sm lg:text-base mt-4">
              {{ $t('common.dontHaveAnAccount') }}
              <router-link to="/register" class="text-[#317C31] hover:underline font-semibold">
                {{ $t('common.registerHere') }}
              </router-link>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from '@/stores/auth';
import { useCartStore } from '@/stores/cart';
import { nextTick } from 'vue';

export default {
  name: 'LoginView',

  data() {
    return {
      form: {
        email: '',
        password: '',
      },
      errorMessage: '', // error state
    };
  },

  setup() {
    const authStore = useAuthStore();
    return { authStore };
  },

  mounted() {
    this.authStore.error = null;
  },

  methods: {
    clearError() {
      this.errorMessage = '';
    },

    async handleLogin() {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      // Validate email and password
      if (!emailRegex.test(this.form.email) || this.form.password.length < 3) {
        this.errorMessage = 'Wrong email or password';
        return;
      }

      try {
        await this.authStore.login(this.form);

        const cartStore = useCartStore();
        await cartStore.mergeOnLogin();

        await this.$router.push('/');
        nextTick(() => {
          this.$toast.success(this.$t('common.loggedInSuccessfully'));
        });
      } catch (error) {
        this.errorMessage = 'Wrong email or password';
      }
    },

    async handleGoogleLogin() {
      window.location.href = `${import.meta.env.VITE_URL}/auth/google/redirect`;
    },
  },
};
</script>

<style scoped>
/* smooth fade for error message */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.router-link-exact-active {
  background-color: #e0ebe0;
}

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

.bg-myprofile {
  background-color: #BFD6BF;
}

[data-theme="forest"] .bg-myprofile {
  background-color: #424141;
}

.bg-tabs {
  background-color: #ffffff;
}

[data-theme="forest"] .bg-tabs {
  background-color: #2C2C2C;
}
</style>

