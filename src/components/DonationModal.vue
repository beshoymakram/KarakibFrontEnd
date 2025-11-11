<template>
  <!-- DaisyUI Modal -->
  <div
    v-if="isOpen"
    class="fixed inset-0 flex items-center justify-center bg-black/50 z-50 px-4 py-6"
  >
    <div
      class="
        relative
        w-[94%] sm:w-full
        max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl
        bg-white rounded-2xl shadow-lg flex flex-col p-0
        transform mobile-scale
      "
      style="border-radius: 1.25rem"
    >
      <!-- Close button -->
      <button
        @click="closeModal"
        class="btn border-0 btn-sm btn-circle btn-ghost absolute right-3 top-3 text-gray-500 hover:bg-gray-200 z-10"
      >
        ✕
      </button>

      <!-- Green Header Section -->
      <div class="bg-[#2C702C] text-white text-center py-5 px-4 sm:py-8 sm:px-6">
        <div class="flex justify-center mb-3">
          <div class="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white/20 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 sm:h-8 sm:w-8" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
        </div>
        <h2 class="text-xl sm:text-2xl font-bold mb-1">{{ $t('common.secureDonation') }}</h2>
        <p class="text-xs sm:text-sm text-white/90">{{ fundTitle }}</p>
      </div>

      <!-- White Content Section -->
      <div class="bg-white px-4 py-4 sm:px-6 sm:py-6">
        <!-- Security Info -->
        <div class="flex items-center justify-center gap-2 text-xs sm:text-sm text-gray-700 mb-5 pb-3 border-b border-gray-200">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 sm:h-5 sm:w-5 text-[#2C702C]" fill="none" viewBox="0 0 24 24"
            stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <span class="font-medium">{{ $t('common.yourTransactionIsProtected') }}</span>
        </div>

        <!-- Info Box -->
        <div class="bg-gray-50 rounded-lg p-4 sm:p-5 mb-5 text-xs sm:text-sm text-gray-600 leading-relaxed space-y-2">
          <p>{{ $t('common.yourDonationIsCompletelySecure') }}</p>
        </div>

        <!-- Donation Amount Section -->
        <div class="mb-5">
          <label class="block text-sm sm:text-base font-bold text-gray-900 mb-2 sm:mb-3">
            {{ $t('common.donationAmount') }}
          </label>

          <!-- Amount Input -->
          <div class="relative mb-3 sm:mb-4">
            <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-700 font-semibold text-sm sm:text-lg">E£</span>
            <input
              type="number"
              v-model="donationAmount"
              :placeholder="$t('common.enterAmount')"
              class="w-full pl-12 pr-4 py-2 sm:py-3 border-2 border-gray-300 rounded-lg text-sm sm:text-base"
            />
          </div>

          <!-- Quick Amount Buttons -->
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
            <button
              v-for="amount in quickAmounts"
              :key="amount"
              @click="selectAmount(amount)"
              :class="[
                'py-2 px-2 sm:py-2.5 sm:px-3 rounded-lg border-2 font-semibold text-xs sm:text-sm transition-all',
                donationAmount === amount
                  ? 'bg-gray-900 text-white border-gray-900'
                  : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
              ]"
            >
              {{ amount }} {{ $t('common.currency') }}
            </button>
          </div>
        </div>

        <!-- Complete Donation Button -->
        <button
          @click="completeDonation"
          class="btn w-full bg-[#2C702C] hover:bg-[#265C26] text-white border-0 rounded-lg py-3 text-sm sm:text-base font-semibold flex items-center justify-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24"
            stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
          {{ $t('common.completeSecureDonation') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DonationModal",
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
    fundName: {
      type: String,
      required: true,
    },
    fundTitle: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      donationAmount: null,
      quickAmounts: [25, 50, 100, 250],
    };
  },
  methods: {
    closeModal() {
      this.$emit("close");
    },
    selectAmount(amount) {
      this.donationAmount = amount;
    },
    completeDonation() {
      if (this.donationAmount && this.donationAmount > 0) {
        this.$emit("donate", {
          amount: this.donationAmount,
          fund_name: this.fundName,
        });
        this.closeModal();
      } else {
        this.$toast.error(this.$t('common.pleaseEnterAValidDonationAmount'));
      }
    },
  },
  watch: {
    isOpen(newVal) {
      // Prevent body scroll when modal is open
      if (newVal) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }
    },
  },
  beforeUnmount() {
    // Cleanup: restore body scroll
    document.body.style.overflow = "";
  },
};
</script>

<style scoped>
/* Remove spinner arrows from number input */
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield;
}

/* Custom focus styles */
input:focus {
  box-shadow: 0 0 0 3px rgba(44, 112, 44, 0.1);
}
</style>
