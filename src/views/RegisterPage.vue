<style scoped>
.error-message {
  color: #f44336;
  font-size: 0.85rem;
  margin-top: 4px;
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

.input-error {
  border: 1.5px solid #f44336 !important;
}

/* Eye icon styling */
.password-wrapper {
  position: relative;
  width: 100%;
}

.eye-icon {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  color: gray;
}

[data-theme="forest"] .eye-icon {
  color: white;
}
</style>

<template>
  <div class="bg-myprofile min-h-screen py-8 px-4" :dir="$i18n.locale === 'ar' ? 'rtl' : 'ltr'">
    <div class="w-full max-w-6xl mx-auto pt-4 sm:pt-6 md:pt-8 lg:pt-10">
      <div
        class="overflow-hidden flex flex-col lg:flex-row rounded-xl shadow-lg dark:bg-gray-800/50 dark:shadow-none dark:outline dark:-outline-offset-1 dark:outline-white/10">

        <!-- Left Section -->
        <div
          :class="[ 'w-full', 'lg:w-1/2', 'px-6', 'py-8', 'lg:py-12', 'bg-tabs', 'text-center', 'flex', 'flex-col', 'items-center', 'justify-center', 'rounded-t-xl', 'order-1', 'lg:order-1',
            $i18n.locale === 'ar' ? 'lg:rounded-r-xl lg:rounded-tl-none' : 'lg:rounded-l-xl lg:rounded-tr-none']">
          <img class="w-full max-w-xs lg:max-w-md mx-auto mb-6" src="/public/images/register.png" alt="Register Banner">
          <h1 class="font-extrabold text-2xl lg:text-3xl xl:text-4xl text-main mb-3">{{ $t('common.welcomeToKarakib') }}</h1>
          <p class="font-semibold text-base lg:text-xl px-4">{{ $t('common.everySmallActOfRecyclingCreatesCleanerTomorrow') }}</p>
        </div>

        <!-- Right Section -->
        <div
          :class="[ 'w-full', 'lg:w-1/2', 'px-6', 'py-8', 'lg:py-12', 'bg-primary', 'flex', 'justify-center', 'items-center', 'rounded-b-xl', 'order-2', 'lg:order-2',
            $i18n.locale === 'ar' ? 'lg:rounded-l-xl lg:rounded-br-none' : 'lg:rounded-r-xl lg:rounded-bl-none']">

          <div class="w-full max-w-md">
            <h1 class="font-extrabold text-2xl lg:text-3xl text-main text-center mb-6 lg:mb-8">{{ $t('common.register') }}</h1>

            <!-- User Type Selection -->
            <div class="mb-6 text-center">
              <p class="font-semibold text-base mb-3">Are you a user or joining as a Collector?</p>
              <div class="flex justify-center gap-4">
                <button
                  type="button"
                  @click="form.type = 'user'"
                  :class="['px-4 py-2 rounded-lg font-medium border transition-all',
                    form.type === 'user'
                      ? 'bg-[#317C31] text-white border-[#317C31]'
                      : 'bg-tabs text-section border-gray-300 hover:border-gray-400']">
                  User
                </button>
                <button
                  type="button"
                  @click="form.type = 'collector'"
                  :class="['px-4 py-2 rounded-lg font-medium border transition-all',
                    form.type === 'collector'
                      ? 'bg-[#317C31] text-white border-[#317C31]'
                      : 'bg-tabs text-section border-gray-300 hover:border-gray-400']">
                  Collector
                </button>
              </div>
            </div>

            <!-- Google Register Button (Hidden if Collector) -->
            <button v-if="form.type === 'user'" @click="handleGoogleRegister" type="button"
              class="w-full flex items-center justify-center gap-3 bg-tabs border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition-all font-medium text-section px-4 py-3 rounded-lg mb-6 shadow-sm">
              <svg class="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              <span class="text-sm lg:text-base">{{ $t('common.signUpWithGoogle') }}</span>
            </button>

            <!-- Divider -->
            <div v-if="form.type === 'user'" class="relative my-5 lg:my-6">
              <div class="absolute inset-0 flex items-center">
                <div class="w-full border-t border-gray-300"></div>
              </div>
              <div class="relative flex justify-center text-xs lg:text-sm">
                <span class="px-4 bg-white text-gray-500 font-medium">{{ $t('common.orRegisterWithEmail') }}</span>
              </div>
            </div>

            <!-- Register Form -->
            <form @submit.prevent="handleRegister" class="w-full flex flex-col">

              <!-- Name + Email -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div class="form-group flex flex-col w-full">
                  <label for="name" class="pb-2 font-medium text-sm lg:text-base">{{ $t('common.name') }}</label>
                  <input v-model="form.name" type="text" id="name" placeholder="Full Name"
                    class="shadow-[0_10px_20px_5px_rgba(0,0,0,0.1)] bg-tabs border-0 px-3 py-3 rounded-lg text-sm lg:text-base focus:outline-none focus:ring-2 focus:ring-[#317C31]" required>
                </div>

                <div class="form-group flex flex-col w-full">
                  <label for="email" class="pb-2 font-medium text-sm lg:text-base">{{ $t('common.email') }}</label>
                  <input v-model="form.email" type="email" id="email"
                    :class="['shadow-[0_10px_20px_5px_rgba(0,0,0,0.1)] bg-tabs border-0 px-3 py-3 rounded-lg text-sm lg:text-base focus:outline-none focus:ring-2', errors.email ? 'input-error' : 'focus:ring-[#317C31]']"
                    placeholder="email@gmail.com" required>
                  <span v-if="errors.email" class="error-message">{{ emailErrorMessage }}</span>
                </div>
              </div>

              <!-- Personal ID (Only for Collector) -->
              <div v-if="form.type === 'collector'" class="form-group mb-4 flex flex-col w-full">
                <label for="id" class="pb-2 font-medium text-sm lg:text-base">Upload Personal ID</label>
                <input type="file" id="id" accept="image/*,.pdf"
                  class="bg-tabs border-0 px-3 py-3 rounded-lg text-sm lg:text-base shadow-[0_10px_20px_5px_rgba(0,0,0,0.1)] focus:outline-none focus:ring-2 focus:ring-[#317C31]" required>
              </div>

              <!-- Phone -->
              <div class="form-group mb-4 flex flex-col w-full">
                <label for="phone" class="pb-2 font-medium text-sm lg:text-base">{{ $t('common.phone') }}</label>
                <input v-model="form.phone" type="tel" id="phone"
                  :class="['shadow-[0_10px_20px_5px_rgba(0,0,0,0.1)] bg-tabs border-0 px-3 py-3 rounded-lg text-sm lg:text-base focus:outline-none focus:ring-2', errors.phone ? 'input-error' : 'focus:ring-[#317C31]']"
                  :placeholder="$t('common.phonePlaceholder')" required>
                <span v-if="errors.phone" class="error-message">{{ phoneErrorMessage }}</span>
              </div>

              <!-- Password + Confirm -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div class="form-group flex flex-col w-full">
                  <label for="password" class="pb-2 font-medium text-sm lg:text-base">{{ $t('common.password') }}</label>
                  <div class="password-wrapper">
                    <input :type="showPassword ? 'text' : 'password'" v-model="form.password" id="password"
                      :class="['shadow-[0_10px_20px_5px_rgba(0,0,0,0.1)] bg-tabs border-0 px-3 py-3 rounded-lg w-full text-sm lg:text-base focus:outline-none focus:ring-2', errors.password ? 'input-error' : 'focus:ring-[#317C31]']"
                      :placeholder="$t('common.passwordPlaceholder')" required>
                    <span class="eye-icon" @click="showPassword = !showPassword">
                      <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                    </span>
                  </div>
                  <span v-if="errors.password" class="error-message">Password must be at least 8 characters</span>
                </div>

                <div class="form-group flex flex-col w-full">
                  <label for="password_confirmation" class="pb-2 font-medium text-sm lg:text-base">{{ $t('common.confirmPassword') }}</label>
                  <div class="password-wrapper">
                    <input :type="showConfirmPassword ? 'text' : 'password'" v-model="form.password_confirmation" id="password_confirmation"
                      :class="['shadow-[0_10px_20px_5px_rgba(0,0,0,0.1)] bg-tabs border-0 px-3 py-3 rounded-lg w-full text-sm lg:text-base focus:outline-none focus:ring-2', errors.confirmPassword ? 'input-error' : 'focus:ring-[#317C31]']"
                      :placeholder="$t('common.confirmPasswordPlaceholder')" required>
                    <span class="eye-icon" @click="showConfirmPassword = !showConfirmPassword">
                      <i :class="showConfirmPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                    </span>
                  </div>
                  <span v-if="errors.confirmPassword" class="error-message">Passwords do not match</span>
                </div>
              </div>

              <!-- Submit -->
              <button type="submit" :disabled="authStore.loading"
                class="w-full bg-[#317C31] hover:bg-[#275a27] transition-colors font-medium cursor-pointer text-white px-4 py-3 rounded-lg mt-2 mb-4 text-sm lg:text-base disabled:bg-gray-400 disabled:cursor-not-allowed">
                {{ authStore.loading ? $t('common.loading') : $t('common.createAccount') }}
              </button>
            </form>

            <p class="text-center font-medium text-xs lg:text-base mt-4">
              {{ $t('common.alreadyHaveAnAccount') }}
              <router-link to="/login" class="text-[#317C31] hover:underline font-semibold">{{ $t('common.loginHere') }}</router-link>
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
  name: 'RegisterPage',

  data() {
    return {
      form: {
        name: '',
        email: '',
        phone: '',
        type: 'user',
        password: '',
        password_confirmation: '',
      },
      errors: {
        email: false,
        phone: false,
        password: false,
        confirmPassword: false,
      },
      emailErrorMessage: '',
      phoneErrorMessage: '',
      showPassword: false,
      showConfirmPassword: false,
    };
  },

  setup() {
    const authStore = useAuthStore();
    return { authStore };
  },

  methods: {
    async handleRegister() {
      this.errors = { email: false, phone: false, password: false, confirmPassword: false };
      this.emailErrorMessage = '';
      this.phoneErrorMessage = '';

      if (this.form.password.length < 8) this.errors.password = true;
      if (this.form.password !== this.form.password_confirmation) this.errors.confirmPassword = true;
      if (!this.form.email.includes('@')) {
        this.errors.email = true;
        this.emailErrorMessage = 'Please enter a valid email address';
      }
      if (this.form.phone.length < 8) {
        this.errors.phone = true;
        this.phoneErrorMessage = 'Please enter a valid phone number';
      }

      if (Object.values(this.errors).includes(true)) return;

      try {
        await this.authStore.register(this.form);
        const cartStore = useCartStore();
        await cartStore.mergeOnLogin();
        await this.$router.push('/');
        nextTick(() => {
          this.$toast.success(this.$t('common.registeredSuccessfully'));
        });
      } catch (error) {
        console.error('Registration error:', error);
        if (this.authStore.error?.includes('email')) {
          this.errors.email = true;
          this.emailErrorMessage = 'Email already used';
        }
        if (this.authStore.error?.includes('phone')) {
          this.errors.phone = true;
          this.phoneErrorMessage = 'Phone already used';
        }
      }
    },

    handleGoogleRegister() {
      window.location.href = `${import.meta.env.VITE_URL}/auth/google/redirect`;
    },
  },
};
</script>

