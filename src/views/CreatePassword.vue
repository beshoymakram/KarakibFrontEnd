<template>
  <div class="bg-[#BFD6BF] min-h-screen py-8 px-4" :dir="$i18n.locale === 'ar' ? 'rtl' : 'ltr'">
    <div class="w-full max-w-6xl mx-auto pt-4 sm:pt-6 md:pt-8 lg:pt-10">
      <div
        class="overflow-hidden flex flex-col lg:flex-row rounded-xl shadow-lg dark:bg-gray-800/50 dark:shadow-none dark:outline dark:-outline-offset-1 dark:outline-white/10">

        <!-- Form -->
        <div
          :class="[ 'w-full', 'lg:w-1/2', 'px-6', 'py-8', 'lg:py-12', 'bg-white', 'flex', 'justify-center', 'items-center', 'rounded-t-xl', 'relative',
            $i18n.locale === 'ar' ? 'lg:rounded-r-xl lg:rounded-tl-none' : 'lg:rounded-l-xl lg:rounded-tr-none'
          ]">

          <div class="w-full max-w-md">
            <h1 class="font-extrabold text-3xl lg:text-4xl text-[#317C31] mb-4">
              {{ $t('common.resetPasswordTitle') }}
            </h1>

            <p class="text-gray-400 text-base lg:text-lg mb-8">
              {{ $t('common.resetPasswordDescription') }}
            </p>

            <!-- Password Form -->
            <form @submit.prevent="handleSetPassword" class="w-full flex flex-col">

              <!-- Create Password -->
              <div class="form-group mb-5 flex flex-col w-full">
                <label class="pb-2 font-semibold text-base text-gray-800" for="password">
                  {{ $t('common.createPassword') }}
                </label>
                <div class="relative">
                  <input
                    id="password"
                    v-model="password"
                    :type="showPassword ? 'text' : 'password'"
                    :placeholder="$t('common.enterPassword')"
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
                    <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M3 3l3.59 3.59A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411L21 21" />
                    </svg>
                  </button>
                </div>
                <!-- Password Error -->
                <p v-if="passwordError" class="text-red-500 text-sm mt-2">
                  {{ passwordError }}
                </p>
              </div>

              <!-- Re-enter Password -->
              <div class="form-group mb-5 flex flex-col w-full">
                <label class="pb-2 font-semibold text-base text-gray-800" for="confirmPassword">
                  {{ $t('common.reenterPassword') }}
                </label>
                <div class="relative">
                  <input
                    id="confirmPassword"
                    v-model="confirmPassword"
                    :type="showConfirm ? 'text' : 'password'"
                    :placeholder="$t('common.reenterPassword')"
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
                    <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M3 3l3.59 3.59A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411L21 21" />
                    </svg>
                  </button>
                </div>
                <!-- Confirm Password Error -->
                <p v-if="passwordMismatch" class="text-red-500 text-sm mt-2">
                  {{ $t('common.passwordsDoNotMatch') }}
                </p>
              </div>

              <!-- Submit Button -->
              <button
                type="submit"
                :disabled="loading"
                class="w-full bg-[#317C31] hover:bg-[#275a27] transition-colors font-semibold cursor-pointer text-white px-4 py-3 rounded-lg text-center disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {{ loading ? $t('common.settingPassword') : $t('common.setPassword') }}
              </button>
            </form>
          </div>
        </div>

        <!-- Banner -->
        <div
          :class="[
            'w-full', 'lg:w-1/2', 'px-6', 'py-8', 'lg:py-12', 'bg-[#EAF2EA]', 'text-center', 'flex', 'flex-col', 'items-center', 'justify-center', 'rounded-b-xl',
            $i18n.locale === 'ar' ? 'lg:rounded-l-xl lg:rounded-br-none' : 'lg:rounded-r-xl lg:rounded-tl-none'
          ]">
          <img class="w-full max-w-md mx-auto mb-8"
            src="../../public/images/young-guy-carrying-bag-with-garbage-trash-bin.png"
            alt="Recycling illustration" />
          <h2 class="font-extrabold text-2xl lg:text-3xl text-[#317C31] px-4">
            {{ $t('common.letsGetBackOnJourney') }}
          </h2>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import resetPasswordService from '@/services/resetPasswordService';
import { useAuthStore } from '@/stores/auth';

export default {
  name: "CreatePasswordView",
  setup() {
    const authStore = useAuthStore();
    return { authStore };
  },
  data() {
    return {
      email: "",
      resetToken: "",
      password: "",
      confirmPassword: "",
      showPassword: false,
      showConfirm: false,
      loading: false,
      passwordError: "", // 👈 added
    };
  },
  mounted() {
    this.email = sessionStorage.getItem('reset_email');
    this.resetToken = sessionStorage.getItem('reset_token');
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
      this.passwordError = "";

      if (this.password.length < 8) {
        this.passwordError = "Password must be at least 8 characters.";
        return;
      }

      if (this.passwordMismatch) {
        this.$toast.error("Passwords do not match.");
        return;
      }

      this.loading = true;
      try {
        const response = await resetPasswordService.resetPassword({
          email: this.email,
          reset_token: this.resetToken,
          password: this.password,
          password_confirmation: this.confirmPassword,
        });

        sessionStorage.removeItem('reset_email');
        sessionStorage.removeItem('reset_token');
        this.$toast.success(response.data.message);

        setTimeout(() => {
          this.$router.push('/login');
        }, 1500);
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

