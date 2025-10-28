<template>
  <div class="payment-form max-w-md mx-auto p-6 bg-white rounded-lg shadow" :dir="$i18n.locale === 'ar' ? 'rtl' : 'ltr'">
    <h2 class="text-2xl font-bold mb-6 text-[#2C702C]">{{ $t('common.paymentMethod') }}</h2>

    <form @submit.prevent="">
      <div class="mb-4">
        <label class="block text-sm font-medium mb-2">Card Number</label>
        <input v-model="form.card_number" type="text" maxlength="16" placeholder="4242424242424242"
          class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#2C702C]" required />
        <p class="text-xs text-gray-500 mt-1">Test: 4242424242424242 (Success) | 4000000000000002 (Decline)</p>
      </div>

      <div class="grid grid-cols-3 gap-4 mb-4">
        <div class="col-span-1">
          <label class="block text-sm font-medium mb-2">Month</label>
          <input v-model="form.expiry_month" type="text" maxlength="2" placeholder="12"
            class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#2C702C]" required />
        </div>
        <div class="col-span-1">
          <label class="block text-sm font-medium mb-2">Year</label>
          <input v-model="form.expiry_year" type="text" maxlength="4" placeholder="2025"
            class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#2C702C]" required />
        </div>
        <div class="col-span-1">
          <label class="block text-sm font-medium mb-2">CVV</label>
          <input v-model="form.cvv" type="text" maxlength="3" placeholder="123"
            class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#2C702C]" required />
        </div>
      </div>

      <div class="mb-6">
        <label class="block text-sm font-medium mb-2">Amount</label>
        <input v-model="form.amount" type="number" step="0.01" placeholder="100.00"
          class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#2C702C]" required />
      </div>

      <button type="submit" :disabled="loading" @click="confirmCheckout"
        class="w-full bg-[#2C702C] text-white py-3 rounded-lg hover:bg-[#1a4d1a] disabled:bg-gray-400">
        {{ loading ? 'Processing...' : `Pay $${form.amount || 0}` }}
      </button>
    </form>

    <!-- Success Message -->
    <div v-if="paymentSuccess" class="mt-4 p-4 bg-green-100 border border-green-400 rounded-lg">
      <p class="text-green-800 font-semibold">✓ Payment Successful!</p>
      <p class="text-sm text-green-700">Transaction ID: {{ transactionId }}</p>
    </div>

    <!-- Error Message -->
    <div v-if="paymentError" class="mt-4 p-4 bg-red-100 border border-red-400 rounded-lg">
      <p class="text-red-800">✗ {{ paymentError }}</p>
    </div>
  </div>
</template>

<script>
import apiClient from '@/config/api';
import checkoutService from '@/services/checkoutService';

export default {
  name: 'TestPayment',

  data() {
    return {
      form: {
        card_number: '',
        expiry_month: '',
        expiry_year: '',
        cvv: '',
        amount: 100
      },
      createForm: {
        id: null,
        user_address_id: 1,
        payment_method: 'card',
      },
      loading: false,
      paymentSuccess: false,
      paymentError: null,
      transactionId: null
    }
  },

  methods: {
    async processPayment() {
      this.loading = true;
      this.paymentSuccess = false;
      this.paymentError = null;

      try {
        const response = await apiClient.post('/payment/process', this.form);

        this.paymentSuccess = true;
        this.transactionId = response.data.transaction.transaction_id;
        this.$toast.success(this.$t('common.paymentProcessedSuccessfully'));

        // Reset form
        setTimeout(() => {
          this.resetForm();
        }, 3000);

      } catch (error) {
        this.paymentError = error.response?.data?.message || 'Payment failed';
        this.$toast.error(this.paymentError);
      } finally {
        this.loading = false;
      }
    },

    resetForm() {
      this.form = {
        card_number: '',
        expiry_month: '',
        expiry_year: '',
        cvv: '',
        amount: 100
      };
      this.paymentSuccess = false;
      this.transactionId = null;
    },

    async confirmCheckout() {
      try {
        const formData = new FormData();
        formData.append('user_address_id', this.createForm.user_address_id);
        formData.append('payment_method', this.createForm.payment_method);
        const response = await checkoutService.checkout(formData);


        if (response.data.url) {
          window.location.href = response.data.url; // redirect to Stripe
        }

        nextTick(() => {
          this.$toast.success(response.data.message);
        });
      } catch (error) {
        this.$toast.error(error.response.data.message);
      }
    },
  }
}
</script>
