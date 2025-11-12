<template>
  <div class="bg-myprofile min-h-screen py-8 px-4" :dir="$i18n.locale === 'ar' ? 'rtl' : 'ltr'">
    <div class="w-full max-w-6xl mx-auto pt-4 sm:pt-6 md:pt-8 lg:pt-10">
      <div
        class="overflow-hidden flex flex-col lg:flex-row rounded-xl shadow-lg dark:bg-gray-800/50 dark:shadow-none dark:outline dark:-outline-offset-1 dark:outline-white/10">

        <!-- Left (Form) -->
        <div :class="[
          'w-full', 'lg:w-1/2', 'px-6', 'py-8', 'lg:py-12', 'bg-tabs', 'flex', 'justify-center', 'items-center', 'rounded-t-xl', 'relative',
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
                <input v-model="email" type="email" id="email" placeholder="email@gmail.com"
                  :class="['shadow-[0_10px_20px_5px_rgba(0,0,0,0.1)] border-0 px-4 py-3 rounded-lg text-base focus:outline-none focus:ring-2', errorMessage ? 'input-error' : 'focus:ring-[#317C31]']"
                  required />
                <span v-if="errorMessage" class="error-message">{{ errorMessage }}</span>
              </div>

              <button type="submit" :disabled="loading"
                class="w-full bg-[#317C31] hover:bg-[#275a27] transition-colors font-semibold cursor-pointer text-white px-4 py-3 rounded-lg text-center disabled:bg-gray-400 disabled:cursor-not-allowed">
                {{ loading ? $t('common.sending') : $t('common.submitButton') }}
              </button>
            </form>
          </div>

          <!-- Go Back -->
          <router-link to="/login"
            :class="['absolute', 'bottom-8', $i18n.locale === 'ar' ? 'right-8' : 'left-8', 'flex', 'items-center', 'gap-2', 'text-[#317C31]', 'hover:underline', 'font-semibold', 'text-base']">
            {{ $t('common.goBack') }}
          </router-link>
        </div>

        <!-- Right (Banner) -->
        <div :class="[
          'w-full', 'lg:w-1/2', 'px-6', 'py-8', 'lg:py-12', 'bg-img', 'text-center', 'flex', 'flex-col', 'items-center', 'justify-center', 'rounded-b-xl',
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

    <!-- ✅ Popup Modal -->
    <transition name="fade">
      <div v-if="showPopup" class="popup-overlay">
        <div class="popup-box">
          <div class="icon">✅</div>
          <p>{{ $t('common.codeSentSuccess') }}</p>
        </div>
      </div>
    </transition>
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
      errorMessage: '',
      showPopup: false,
    };
  },

  methods: {
    async handleSubmit() {
      this.loading = true;
      this.errorMessage = '';

      try {
        await resetPasswordService.forgotPassword({ email: this.email });

        // ✅ Show popup message
        this.showPopup = true;

        sessionStorage.setItem('reset_email', this.email);
        sessionStorage.removeItem('reset_token');

        // Hide popup and redirect
        setTimeout(() => {
          this.showPopup = false;
          this.$router.push({ name: 'verify-code' });
        }, 2000);
      }
      catch (error) {
        console.error('Error:', error);
        if (error.response && error.response.data && error.response.data.message) {
          this.errorMessage = error.response.data.message;
        } else {
          this.errorMessage = 'No account found with this email address';
        }
      }
      finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
.error-message {
  color: #f44336;
  font-size: 0.85rem;
  margin-top: 4px;
}

.input-error {
  border: 1.5px solid #f44336 !important;
}

/* ✅ Popup styles */
.popup-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.popup-box {
  background: white;
  padding: 2rem 3rem;
  border-radius: 15px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.25);
  font-size: 1rem;
  font-weight: 600;
  color: #2c702c;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
}

.icon {
  font-size: 2.5rem;
  color: #2c702c;
  animation: pop 0.4s ease;
}

/* Simple pop animation */
@keyframes pop {
  0% {
    transform: scale(0);
    opacity: 0;
  }

  100% {
    transform: scale(1);
    opacity: 1;
  }
}

/* Smooth fade animation */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
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

.bg-img {
  background-color: #EAF2EA;
}

[data-theme="forest"] .bg-img {
  background-color: #353535;
}
</style>
