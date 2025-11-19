<template>
  <div class="bg-myprofile rounded-lg shadow-sm p-4 mb-6" :dir="$i18n.locale === 'ar' ? 'rtl' : 'ltr'">
    <div class="flex flex-wrap items-center gap-4">
      <div class="relative">
        <select v-model="filters.type"
          class="px-4 py-1.5 md:py-2 pr-8 text-sm md:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2C702C] focus:border-transparent appearance-none bg-myprofile ">
          <option value="" class="text-sm md:text-base ">{{ $t('common.allTypes') }}</option>
          <option value="convert" class="text-sm md:text-base">{{ $t('common.convertedPoints') }}</option>
          <option value="withdraw" class="text-sm md:text-base">{{ $t('common.withdrawnBalance') }}</option>
          <option value="refund" class="text-sm md:text-base">{{ $t('common.refundedBalance') }}</option>
        </select>
        <span class="absolute right-3 top-[52%] -translate-y-1/2 pointer-events-none text-xs">▼</span>
      </div>

      <div class="relative ">
        <button @click="openWithdrawModal()"
          class="relative inline-flex items-center gap-x-1.5 md:mx-3 rounded-md cursor-pointer bg-[#2C702C] p-2 md:px-3 py-2 text-xs md:text-sm font-semibold text-white shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2C702C]">
          {{ $t('common.withdrawBalance') }}
        </button>
      </div>


      <div class="flex-1 max-w-md ml-auto">
        <div class="relative">
          <input v-model="searchQuery" type="text" :placeholder="$t('common.searchByNameOrEmail')"
            class="w-full px-8 md:px-10 py-1.5 md:py-2 border text-sm md:text-base border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2C702C] focus:border-transparent" />
          <svg
            :class="['absolute', 'top-1/2', '-translate-y-1/2', 'w-5', 'h-5', 'text-gray-400', $i18n.locale === 'ar' ? 'right-3' : 'left-3']"
            fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>
    </div>
  </div>

  <div class="bg-tabs rounded-lg shadow-sm overflow-hidden">
    <div class="overflow-x-auto">
      <table class="w-full table-auto">
        <thead class="bg-tabs border-b border-gray-200">
          <tr>
            <th class="px-6 py-3 text-center text-xs font-medium text-section uppercase tracking-wider">{{
              $t('common.amount') }}</th>
            <th class="px-6 py-3 text-center text-xs font-medium text-section uppercase tracking-wider">{{
              $t('common.type') }}</th>
            <th class="px-6 py-3 text-center text-xs font-medium text-section uppercase tracking-wider">{{
              $t('common.description') }}</th>
            <th class="px-6 py-3 text-center text-xs font-medium text-section uppercase tracking-wider">{{
              $t('common.date') }}</th>
            <th class="px-6 py-3 text-center text-xs font-medium text-section uppercase tracking-wider">{{
              $t('common.status') }}</th>
            <th class="px-6 py-3 text-center text-xs font-medium text-section uppercase tracking-wider">{{
              $t('common.action') }}</th>
          </tr>
        </thead>
        <tbody class="bg-tabs divide-y divide-gray-200">
          <tr v-if="filteredTransactions.length === 0">
            <td colspan="6" class="px-4 py-4 text-center text-section">
              No results match your search
            </td>
          </tr>

          <tr v-for="transaction in filteredTransactions" :key="transaction.id"
            class="hover:bg-gray-50 transition-colors text-center">
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#2C702C]">
              {{ transaction.amount }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#2C702C]">
              {{ transaction.type }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#2C702C]">
              {{ transaction.description }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#2C702C]">
              {{ transaction.created_at }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-center">
              <span class="px-2 py-1 rounded-full text-xs font-medium capitalize" :class="{
                'text-green-800 bg-green-100': transaction.status === 'completed',
                'text-red-800 bg-red-100': transaction.status === 'cancelled',
                'text-warning bg-yellow-100': transaction.status === 'pending'
              }">
                {{ $t(`common.${transaction.status}`) }}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm space-x-2">
              <a v-if="transaction.proof_url" :href="transaction.proof_url" target="_blank"
                class="px-3 py-1 border border-gray-300 rounded-md text-primary hover:bg-gray-100 transition-colors">
                {{ $t('common.showProof') }}
              </a>
              <span v-else>-</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

  </div>

  <Teleport to="body">
    <div v-if="showDonateModal"
      class="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-black/30"
      @click="showDonateModal = false">
      <div class="relative p-4 w-full max-w-2xl" @click.stop>
        <div class="relative bg-white rounded-lg shadow">
          <!-- Header -->
          <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t ">
            <h3 class="text-xl font-semibold text-[#2C702C] ">
              {{ $t('common.withdrawBalance') }}
            </h3>
            <button type="button" @click="showDonateModal = false"
              class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center ">
              <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                viewBox="0 0 14 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
              </svg>
              <span class="sr-only">Close modal</span>
            </button>
          </div>

          <!-- Body -->
          <form @submit.prevent="confirmWithdraw" class="p-4 md:p-5">
            <div class="grid gap-4 mb-4 grid-cols-2">
              <!-- Name -->
              <div class="col-span-2">
                <h2 class="text-center font-bold text-[#2C702C]">Aviable Balance</h2>
                <h1 class="text-center">{{ auth.user.balance }}</h1>
              </div>
              <div class="col-span-2">
                <label for="amount" class="block mb-2 text-sm font-medium text-gray-900 ">
                  Amount to withdraw
                </label>
                <input type="number" id="amount" v-model="createForm.amount"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#2C702C] focus:border-[#2C702C] block w-full p-2.5 "
                  placeholder="Enter amount" required />
              </div>
              <div class="col-span-2">
                <label for="wallet_number" class="block mb-2 text-sm font-medium text-gray-900 ">
                  Wallet number to recieve money
                </label>
                <input type="text" id="wallet_number" v-model="createForm.wallet_number"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#2C702C] focus:border-[#2C702C] block w-full p-2.5 "
                  placeholder="Enter wallet number" required />
              </div>
            </div>

            <!-- Footer Buttons -->
            <div class="flex justify-end space-x-3">
              <button @click="showDonateModal = false" type="button"
                class="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-[#2C702C] focus:z-10 focus:ring-4 focus:ring-gray-100">
                {{ $t('common.Cancel') }}
              </button>
              <button type="submit"
                class="text-white bg-[#2C702C] hover:bg-[#1a4d1a] focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                {{ $t('common.Save Changes') }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </Teleport>

</template>

<script>
import userBalanceService from '@/services/userBalanceService';
import { useAuthStore } from '@/stores/auth';
import { nextTick } from 'vue';

export default {
  name: 'MyBalance',

  data() {
    return {
      searchQuery: '',
      selectedType: '',
      showCreateModal: false,
      showDonateModal: false,
      createForm: {
        id: null,
        amount: '',
        wallet_number: ''
      },
      details: {
        order_number: null,
        name: '',
        address: '',
        total: '',
        payout_method: '',
        status: '',
      },
      filters: {
        type: '',
      },

      transactions: []
    }
  },

  computed: {
    filteredTransactions() {
      let filtered = this.transactions;

      if (this.filters.type) {
        filtered = filtered.filter(item =>
          item.type === this.filters.type
        );
      }

      if (this.searchQuery) {
        filtered = filtered.filter(amount =>
          amount.amount.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          amount.description.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          amount.type.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          amount.created_at.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }

      return filtered;
    },


  },

  methods: {
    openWithdrawModal() {
      this.showDonateModal = true;
    },

    async confirmWithdraw() {
      try {
        const response = await userBalanceService.withdrawBalance(this.createForm);
        nextTick(() => {
          this.$toast.success(response.data.message);
        });
        this.showDonateModal = false;
        this.createForm.amount = '';
        this.createForm.wallet_number = '';
        useAuthStore().fetchUser();
        this.fetchBalanceHistory();
      } catch (error) {
        this.$toast.error(error.response.data.message);
      }
    },

    async fetchBalanceHistory() {
      try {
        const user = await userBalanceService.getBalance();
        this.transactions = user.data.history || user.data;
      } catch (error) {
        this.$toast.error(error?.response?.data.message || 'Failed to fetch balance history.');
      }
    },
  },
  mounted() {
    this.fetchBalanceHistory();
  }
}
</script>

<style scoped>
select {
  background-image: none;
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
  background-color: #ffffff;
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
