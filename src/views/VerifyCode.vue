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
              {{ $t('common.verifyCodeTitle') }}
            </h1>

            <p class="text-gray-400 text-base lg:text-lg mb-8">
              {{ $t('common.verifyCodeDescription') }}
            </p>

            <!-- Verification Code Form -->
            <form @submit.prevent="handleVerify" class="w-full flex flex-col">
              <div class="form-group mb-4 flex flex-col w-full">
                <label class="pb-2 font-semibold text-base text-gray-800" for="code">{{ $t('common.verificationCode') }}</label>
                <div class="relative">
                  <input
                    class="shadow-[0_10px_20px_5px_rgba(0,0,0,0.1)] border-0 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#317C31] w-full pr-12"
                    :placeholder="$t('common.enterCode')" id="code" v-model="otp" type="text" required />
                  <!-- Eye Icon -->
                  <button type="button" @click="toggleCodeVisibility"
                    :class="['absolute', 'top-1/2', '-translate-y-1/2', 'text-gray-400', 'hover:text-gray-600', $i18n.locale === 'ar' ? 'left-4' : 'right-4']">
                    <svg v-if="showCode" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none"
                      viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  </button>
                </div>
              </div>

              <!-- Resend Code -->
              <div class="mb-6" :class="$i18n.locale === 'ar' ? 'text-right' : 'text-left'">
                <span class="text-gray-400 text-sm">{{ $t('common.didntReceiveCode') }} </span>
                <button type="button" @click="handleResend" :disabled="resendLoading"
                  class="text-[#710900] hover:underline font-semibold text-sm">
                  {{ resendLoading ? $t('common.sending') : $t('common.resend') }}
                </button>
              </div>

              <button type="submit" :disabled="loading"
                class="w-full bg-[#317C31] hover:bg-[#275a27] transition-colors font-semibold cursor-pointer text-white px-4 py-3 rounded-lg text-center disabled:bg-gray-400 disabled:cursor-not-allowed">
                {{ loading ? $t('common.verifying') : $t('common.verify') }}
              </button>
            </form>
          </div>

          <!-- Go Back Link -->
          <router-link to="/forgot-password"
            :class="['absolute', 'bottom-8', $i18n.locale === 'ar' ? 'right-8' : 'left-8', 'flex', 'items-center', 'gap-2', 'text-[#317C31]', 'hover:underline', 'font-semibold', 'text-base']">
            <svg xmlns="http://www.w3.org/2000/svg" :class="['h-5', 'w-5', $i18n.locale === 'ar' ? 'rotate-180' : '']" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            {{ $t('common.goBack') }}
          </router-link>
        </div>

        <!-- Banner -->
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
  name: 'VerifyCodeView',

  data() {
    return {
      otp: '',
      loading: false,
      resendLoading: false,
      showCode: false,
      email: '',
    };
  },

  mounted() {
    this.email = sessionStorage.getItem('reset_email')
    if (!this.email) {
      this.$router.push('/forgot-password');
    }
  },

  methods: {
    toggleCodeVisibility() {
      this.showCode = !this.showCode;
      const input = document.getElementById('code');
      input.type = this.showCode ? 'text' : 'password';
    },

    async handleVerify() {
      this.loading = true;

      try {
        const response = await resetPasswordService.verifyCode({ email: this.email, otp: this.otp });

        sessionStorage.setItem('reset_token', response.data.reset_token)

        this.$toast.success(response.data.message);
        setTimeout(() => {
          this.$router.push({ name: 'reset-password' })
        }, 1500);
      } catch (error) {
        this.$toast.error('Invalid verification code. Please try again.');
        console.error('Error:', error);
      } finally {
        this.loading = false;
      }
    },

    async handleResend() {
      this.resendLoading = true;

      try {

        console.log('Resending verification code to:', this.email);


        await new Promise(resolve => setTimeout(resolve, 1000));

        this.$toast.success('Verification code sent again!');

      } catch (error) {
        this.$toast.error('Failed to resend code. Please try again.');
        console.error('Error:', error);
      } finally {
        this.resendLoading = false;
      }
    },
  },
};
</script>
