<template>
  <div class="bg-[#BFD6BF] min-h-screen py-8 px-4" :dir="$i18n.locale === 'ar' ? 'rtl' : 'ltr'">
    <div class="w-full max-w-6xl mx-auto">
      <div
        class="overflow-hidden flex flex-col lg:flex-row rounded-xl shadow-lg dark:bg-gray-800/50 dark:shadow-none dark:outline dark:-outline-offset-1 dark:outline-white/10">
        <!-- Form -->
        <div
          :class="[
            'w-full', 'lg:w-1/2', 'px-6', 'py-8', 'lg:py-12', 'bg-white', 'flex', 'justify-center', 'items-center', 'rounded-t-xl', 'relative',
            $i18n.locale === 'ar' ? 'lg:rounded-r-xl lg:rounded-tl-none' : 'lg:rounded-l-xl lg:rounded-tr-none'
          ]">
          <div class="w-full max-w-md">
            <h1 class="font-extrabold text-3xl lg:text-4xl text-[#317C31] mb-4">
              {{ $t('common.forgotPasswordTitle') }}
            </h1>

            <p class="text-gray-500 text-base lg:text-lg mb-8">
              {{ $t('common.forgotPasswordDescription') }}
            </p>

            <!-- Email Form -->
            <form @submit.prevent="handleSubmit" class="w-full flex flex-col">
              <div class="form-group mb-6 flex flex-col w-full">
                <label class="pb-2 font-medium text-base" for="email">{{ $t('common.email') }}</label>
                <input
                  class="shadow-[0_10px_20px_5px_rgba(0,0,0,0.1)] border-0 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#317C31]"
                  placeholder="email@gmail.com" id="email" v-model="email" type="email" required />
              </div>

              <button type="submit" :disabled="loading"
                class="w-full bg-[#317C31] hover:bg-[#275a27] transition-colors font-semibold cursor-pointer text-white px-4 py-3 rounded-lg text-center disabled:bg-gray-400 disabled:cursor-not-allowed">
                {{ loading ? $t('common.sending') : $t('common.submitButton') }}
              </button>
            </form>
          </div>

          <!-- Go Back Link -->
          <router-link to="/login"
            :class="['absolute', 'bottom-8', $i18n.locale === 'ar' ? 'right-8' : 'left-8', 'flex', 'items-center', 'gap-2', 'text-[#317C31]', 'hover:underline', 'font-semibold', 'text-base']">
            <svg xmlns="http://www.w3.org/2000/svg" :class="['h-5', 'w-5', $i18n.locale === 'ar' ? 'rotate-180' : '']"
              fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            {{ $t('common.goBack') }}
          </router-link>
        </div>

        <!-- Right Side - Banner -->
        <div
          :class="[
            'w-full', 'lg:w-1/2', 'px-6', 'py-8', 'lg:py-12', 'bg-[#EAF2EA]', 'text-center', 'flex', 'flex-col', 'items-center', 'justify-center', 'rounded-b-xl',
            $i18n.locale === 'ar' ? 'lg:rounded-l-xl lg:rounded-br-none' : 'lg:rounded-r-xl lg:rounded-tl-none'
          ]">

          <img class="w-full max-w-md mx-auto mb-8"
            src="../../public/images/young-guy-carrying-bag-with-garbage-trash-bin.png" alt="Recycling illustration">

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

export default {
  name: 'ForgotPasswordView',

  data() {
    return {
      email: '',
      loading: false,
    };
  },

  methods: {
    async handleSubmit() {
      this.loading = true;

      try {
        const response = await resetPasswordService.forgotPassword({ email: this.email });
        this.$toast.success(response.data.message);

        sessionStorage.setItem('reset_email', this.email)
        sessionStorage.removeItem('reset_token')

        setTimeout(() => {
          this.$router.push({ name: 'verify-code' })
        }, 1500);

      }
      catch (error) {
        this.$toast.error('Failed to send verification code. Please try again.');
        console.error('Error:', error);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
