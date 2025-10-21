<template>
  <!-- DaisyUI Modal -->
  <div v-if="isOpen" class="modal modal-open">
    <div class="modal-box relative max-w-md bg-white p-0 rounded-2xl overflow-hidden">
      <!-- Close button -->
      <button 
        @click="closeModal" 
        class="btn btn-sm btn-circle btn-ghost absolute right-3 top-3 text-gray-500 hover:bg-gray-200 z-10"
      >
        ✕
      </button>
      
      <!-- Green Header Section -->
      <div class="bg-[#2C702C] text-white text-center py-8 px-6">
        <div class="flex justify-center mb-3">
          <div class="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
        </div>
        <h2 class="text-2xl font-bold mb-1">Secure Donation</h2>
        <p class="text-sm text-white/90">{{ fundName }}</p>
      </div>

      <!-- White Content Section -->
      <div class="bg-white px-6 py-6">
        <!-- Security Info -->
        <div class="flex items-center justify-center gap-2 text-sm text-gray-700 mb-6 pb-4 border-b border-gray-200">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-[#2C702C]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <span class="font-medium">Your transaction is protected by 256-bit SSL encryption</span>
        </div>

        <!-- Info Box -->
        <div class="bg-gray-50 rounded-lg p-5 mb-6 text-sm text-gray-600 leading-relaxed space-y-2">
          <p>Your donation is completely secure and protected. We use bank-level encryption to ensure your personal and payment information remains safe. Every contribution goes directly to the organization you've chosen to support.</p>
        </div>

        <!-- Donation Amount Section -->
        <div class="mb-6">
          <label class="block text-base font-bold text-gray-900 mb-3">
            Donation Amount
          </label>
          
          <!-- Amount Input -->
<div class="relative mb-4">
  <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-700 font-semibold text-lg">E£</span>
  <input
    type="number"
    v-model="donationAmount"
    placeholder="Enter amount"
    class="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-lg ..."
  />
</div>


          <!-- Quick Amount Buttons -->
          <div class="grid grid-cols-4 gap-3">
            <button 
              v-for="amount in quickAmounts" 
              :key="amount"
              @click="selectAmount(amount)"
              :class="[
                'py-2.5 px-3 rounded-lg border-2 font-semibold text-sm transition-all',
                donationAmount === amount 
                  ? 'bg-gray-900 text-white border-gray-900' 
                  : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
              ]"
            >
              {{ amount }} EGP
            </button>
          </div>
        </div>

        <!-- Complete Donation Button -->
        <button 
          @click="completeDonation" 
          class="btn w-full bg-[#2C702C] hover:bg-[#265C26] text-white border-0 rounded-lg py-3.5 text-base font-semibold mb-3 flex items-center justify-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
          Complete Secure Donation
        </button>
      </div>
    </div>
    
    <!-- Modal backdrop - clicking outside closes modal -->
    <div class="modal-backdrop" @click="closeModal"></div>
  </div>
</template>

<script>
export default {
  name: 'DonationModal',
  props: {
    isOpen: {
      type: Boolean,
      required: true
    },
    fundName: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      donationAmount: null,
      quickAmounts: [25, 50, 100, 250]
    }
  },
  methods: {
    closeModal() {
      this.$emit('close');
    },
    selectAmount(amount) {
      this.donationAmount = amount;
    },
    completeDonation() {
      if (this.donationAmount && this.donationAmount > 0) {
        // Handle donation logic here
        console.log(`Donating ${this.donationAmount} EGP to ${this.fundName}`);
        // Emit event to parent component
        this.$emit('donate', {
          amount: this.donationAmount,
          fund: this.fundName
        });
        this.closeModal();
      } else {
        alert('Please enter a valid donation amount');
      }
    }
  },
  watch: {
    isOpen(newVal) {
      // Prevent body scroll when modal is open
      if (newVal) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    }
  },
  beforeUnmount() {
    // Cleanup: restore body scroll
    document.body.style.overflow = '';
  }
}
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