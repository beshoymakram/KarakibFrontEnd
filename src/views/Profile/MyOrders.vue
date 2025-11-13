<template>
  <div class="bg-myprofile rounded-lg shadow-sm p-4 mb-6" :dir="$i18n.locale === 'ar' ? 'rtl' : 'ltr'">
    <div class="flex flex-wrap items-center gap-4">
      <div class="flex-1 max-w-md ml-auto">
        <div class="relative">
          <input v-model="searchQuery" type="text" :placeholder="$t('common.searchByNameOrEmail')"
            class="w-full px-8 md:px-10 py-1.5 md:py-2 border text-sm md:text-base border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2C702C] focus:border-transparent" />
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

  <div class="bg-myprofile rounded-lg shadow-sm overflow-hidden">
    <div class="overflow-x-auto">
      <table class="w-full table-auto">
        <thead class="bg-myprofile border-b border-gray-200">
          <tr>
            <th class="px-6 py-3 text-center text-xs font-medium text-section uppercase tracking-wider">{{
              $t('common.orderNumber') }}</th>
            <th class="px-6 py-3 text-center text-xs font-medium text-section uppercase tracking-wider">{{
              $t('common.orderedDate') }}</th>
            <th class="px-6 py-3 text-center text-xs font-medium text-section uppercase tracking-wider">{{
              $t('common.total') }}</th>
            <th class="px-6 py-3 text-center text-xs font-medium text-section uppercase tracking-wider">{{
              $t('common.paymentMethod') }}</th>
            <th class="px-6 py-3 text-center text-xs font-medium text-section uppercase tracking-wider">{{
              $t('common.status') }}</th>
            <th class="px-6 py-3 text-center text-xs font-medium text-section uppercase tracking-wider">{{
              $t('common.action') }}</th>
          </tr>
        </thead>
        <tbody class=" divide-y divide-gray-200">
          <tr v-if="filteredOrders.length === 0">
            <td colspan="6" class="px-4 py-4 text-center text-gray-500">
              {{ $t('common.noResultsMatchSearch') }}
            </td>
          </tr>

          <tr v-for="order in filteredOrders" :key="order.id" class="transition-colors">
            <td class="px-6 py-4 whitespace-nowrap text-sm text-center font-medium text-primary">
              {{ order.order_number }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-center font-medium text-primary">
              {{ order.created_at }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-center font-medium text-primary">
              {{ order.total }} {{ $t('common.currency') }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-center font-medium text-primary">
              {{ order.payment_method }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-center">
              <span class="px-2 py-1 rounded-full text-xs font-medium capitalize" :class="{
                'text-green-800 bg-green-100': order.status === 'paid' || order.status === 'completed',
                'text-red-800 bg-red-100': order.status === 'cancelled',
                'text-warning bg-yellow-100': order.status === 'pending' || order.status === 'assigned'
              }">
                {{ $t(`common.${order.status}`) }}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm space-x-2 mx-auto items-center justify-center flex">
              <button @click="openDetailsModal(order)"
                class="px-3 py-1 border border-gray-300 rounded-md text-primary hover:bg-gray-200 transition-colors">
                Details
              </button>
              <button v-if="order.status !== 'cancelled' && order.status !== 'completed'"
                @click="openCancelModal(order)"
                class="px-3 py-1 border border-red-300 rounded-md text-red-600 hover:bg-red-50 transition-colors cursor-pointer">
                {{ $t('common.Cancel') }}
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>


  <Teleport to="body">
    <div v-if="showCancelModal"
      class="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-black/30"
      @click="showCancelModal = false">
      <div class="relative p-4 w-full max-w-md" @click.stop>
        <div class="relative bg-white rounded-lg shadow">
          <button type="button" @click="showCancelModal = false"
            class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center ">
            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
            </svg>
            <span class="sr-only">Close modal</span>
          </button>
          <div class="p-4 md:p-5 text-center">
            <svg class="mx-auto mb-4 text-gray-400 w-12 h-12" aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
            <h3 class="mb-5 text-lg font-normal text-section">
              {{ $t('common.areYouSureCancelOrder') }}
            </h3>
            <button @click="confirmCancel" type="button"
              class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center">
              {{ $t("common.YesSure") }}
            </button>
            <button @click="showCancelModal = false" type="button"
              class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:z-10 focus:ring-4 focus:ring-gray-100 ">
              {{ $t('common.No, Cancel') }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <div v-if="showDetailsModal" class="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/30"
      @click="showDetailsModal = false">
      <div class="relative p-4 w-full max-w-2xl" @click.stop>
        <div class="relative bg-white rounded-lg shadow">
          <!-- Header -->
          <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 class="text-xl font-semibold text-[#2C702C] ">
              {{ $t('common.orderDetails') }} | {{ details.order_number }}
            </h3>
            <button type="button" @click="showDetailsModal = false"
              class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center ">
              <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                viewBox="0 0 14 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
              </svg>
              <span class="sr-only">Close modal</span>
            </button>
          </div>

          <!-- Details Content -->
          <div class="p-4 md:p-5">
            <div class="grid gap-4 mb-4 sm:grid-cols-2">
              <div>
                <h4 class="text-sm font-medium text-gray-500">{{ $t('common.fullName') }}</h4>
                <p class="mt-1 text-base font-semibold text-[#2C702C]  wrap-break-word">
                  {{ details.name }}
                </p>
              </div>

              <div>
                <h4 class="text-sm font-medium text-gray-500">{{ $t('common.phone') }}</h4>
                <p class="mt-1 text-base font-semibold text-[#2C702C]  wrap-break-word">
                  <a :href="'tel:+' + details.address?.phone">{{
                    details.address?.phone }}</a>
                </p>
              </div>

              <div class="sm:col-span-2">
                <h4 class="text-sm font-medium text-gray-500">{{ $t('common.streetAddress') }}</h4>
                <p class="mt-1 text-base font-semibold text-[#2C702C]  wrap-break-word">
                  {{ details.address?.street_address }}
                </p>
              </div>

              <div>
                <h4 class="text-sm font-medium text-gray-500">{{ $t('common.city') }}</h4>
                <p class="mt-1 text-base font-semibold text-[#2C702C]  wrap-break-word">
                  {{ details.address?.city }}
                </p>
              </div>

              <div>
                <h4 class="text-sm font-medium text-gray-500">{{ $t('common.orderStatus') }}</h4>
                <p class="mt-1 text-sm font-semibold px-2 py-1 rounded-full inline-block" :class="{
                  'bg-green-100 text-green-800': details.status === 'completed',
                  'bg-yellow-100 text-yellow-800': details.status === 'pending',
                  'bg-red-100 text-red-800': details.status === 'cancelled'
                }">
                  {{ $t(`common.${details.status}`) }}
                </p>
              </div>

              <div>
                <h4 class="text-sm font-medium text-gray-500">{{ $t('common.createdAt') }}</h4>
                <p class="mt-1 text-base font-semibold text-[#2C702C] ">
                  {{ details.created_at }}
                </p>
              </div>

              <div>
                <h4 class="text-sm font-medium text-gray-500">{{ $t('common.total') }}</h4>
                <p class="mt-1 text-base font-semibold text-[#2C702C] ">
                  {{ details.total }} {{ $t('common.currency') }}
                </p>
              </div>
            </div>

            <!-- Footer -->
            <div class="flex justify-end">
              <button @click="showDetailsModal = false" type="button"
                class="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-[#2C702C]">
                {{ $t('common.close') }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

  </Teleport>

</template>

<script>
import profileService from '@/services/profileService';
import { nextTick } from 'vue';

export default {
  name: 'MyOrders',

  data() {
    return {
      searchQuery: '',
      selectedType: '',
      showCancelModal: false,
      showDetailsModal: false,
      details: {
        order_number: null,
        name: '',
        address: '',
        total: '',
        payment_method: '',
        status: '',
      },

      orders: []
    }
  },

  computed: {
    filteredOrders() {
      let filtered = this.orders;

      if (this.searchQuery) {
        filtered = filtered.filter(order =>
          order.order_number.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          order.user.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          order.address.street_address.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          order.address.phone.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          order.address.city.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          order.status.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          order.payment_method.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          order.total.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          order.created_at.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }

      return filtered;
    },


  },

  methods: {
    openCancelModal(order) {
      this.selectedOrder = order.id;
      this.showCancelModal = true;
    },

    openDetailsModal(order) {
      this.details = {
        order_number: order.order_number,
        name: order.user?.name || 'N/A',
        address: order.address,
        total: order.total,
        payment_method: order.payment_method,
        status: order.status,
        created_at: order.created_at,
      };
      this.showDetailsModal = true;
    },

    async fetchOrders() {
      try {
        const user = await profileService.getOrders();
        this.orders = user.data.orders || user.data;
      } catch (error) {
        this.$toast.error(error?.response?.data.message || 'Failed to fetch addresses.');
      }
    },

    async confirmCancel() {
      try {
        const response = await profileService.cancelOrder(this.selectedOrder);
        nextTick(() => {
          this.$toast.success(response.data.message);
        });
        this.selectedOrder = '';
        this.fetchOrders();
        this.showCancelModal = false;
      } catch (error) {
        this.$toast.error(error.response.data.message);
      }
    },
  },
  mounted() {
    this.fetchOrders();
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
