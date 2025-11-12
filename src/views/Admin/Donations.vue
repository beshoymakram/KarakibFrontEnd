<template>
  <div class="bg-tabs rounded-lg shadow-sm p-4 mb-6" :dir="$i18n.locale === 'ar' ? 'rtl' : 'ltr'">
    <div class="flex flex-wrap items-center gap-4">
      <div class="relative">
        <select v-model="filters.status"
          class="px-4 py-2 pr-8 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2C702C] focus:border-transparent appearance-none bg-tabs">
          <option value="">{{ $t('common.allStatuses') }}</option>
          <option value="pending">{{ $t('common.pending') }}</option>
          <option value="completed">{{ $t('common.completed') }}</option>
          <option value="cancelled">{{ $t('common.cancelled') }}</option>
        </select>
        <span class="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">▼</span>
      </div>

      <div class="flex-1 max-w-md ml-auto">
        <div class="relative">
          <input v-model="searchQuery" type="text" :placeholder="$t('common.searchByNameOrEmail')"
            class="w-full px-8 md:px-10 py-1.5 md:py-2  text-sm md:text-base  border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2C702C] focus:border-transparent" />
          <svg
            :class="['absolute', 'top-1/2', '-translate-y-1/2', 'w-4', 'h-4','md:w-5', 'md:h-5', 'text-gray-400', $i18n.locale === 'ar' ? 'right-3' : 'left-3']"
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
            <th class="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-start">{{
              $t('common.donationNumber') }}</th>
            <th class="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-start">{{
              $t('common.orderedDate') }}</th>
            <th class="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-start">{{
              $t('common.amount') }}</th>
            <th class="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-start">{{
              $t('common.fundName') }}</th>
            <th class="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-start">{{
              $t('common.status') }}</th>
            <th class="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-start">{{
              $t('common.action') }}</th>
          </tr>
        </thead>
        <tbody class="bg-tabs divide-y divide-gray-200">
          <tr v-if="filteredDonations.length === 0">
            <td colspan="5" class="px-4 py-4 text-center text-gray-500">
              {{ $t('common.noResultsMatchSearch') }}
            </td>
          </tr>

          <tr v-for="donation in filteredDonations" :key="donation.id" class="transition-colors">
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-primary">
              {{ donation.donation_number }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-primary">
              {{ donation.created_at }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-primary">
              {{ donation.amount }} {{ $t('common.currency') }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-primary">
              {{ donation.fund_name }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm">
              <span class="px-2 py-1 rounded-full text-xs font-medium capitalize" :class="{
                'text-green-800 bg-green-100': donation.status === 'completed',
                'text-red-800 bg-red-100': donation.status === 'cancelled',
                'text-warning bg-yellow-100': donation.status === 'pending'
              }">
                {{ donation.status }}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm space-x-2">
              -
            </td>
          </tr>
        </tbody>
      </table>
    </div>

  </div>

  <Teleport to="body">

  </Teleport>

</template>

<script>
import donationsService from '@/services/donationsService';

export default {
  name: 'AdminDonations',

  data() {
    return {
      searchQuery: '',
      selectedType: '',
      filters: {
        status: '',
      },
      donations: []
    }
  },

  computed: {
    filteredDonations() {
      let filtered = this.donations;

      if (this.filters.status) {
        filtered = filtered.filter(item =>
          item.status === this.filters.status
        );
      }

      if (this.searchQuery) {
        filtered = filtered.filter(donation =>
          donation.donation_number.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          donation.fund_name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          donation.amount.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          donation.created_at.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }

      return filtered;
    },


  },

  methods: {
    async fetchDonations() {
      try {
        const user = await donationsService.getDonations();
        this.donations = user.data.donations || user.data;
      } catch (error) {
        this.$toast.error(error?.response?.data.message || 'Failed to fetch addresses.');
      }
    },
  },
  mounted() {
    this.fetchDonations();
  }
}
</script>

<style scoped>
select {
  background-image: none;
}

.text-primary {
  color: #2c702c !important;
}

[data-theme="forest"] .text-primary {
  color: #16af3f !important;
}

.bg-primary {
  background-color: #BFD6BF !important;
}

[data-theme="forest"] .bg-primary {
  background-color: rgb(57, 57, 57) !important;
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
