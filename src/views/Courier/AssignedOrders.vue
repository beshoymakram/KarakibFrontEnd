<template>
  <div class="bg-white rounded-lg shadow-sm p-4 mb-6" :dir="$i18n.locale === 'ar' ? 'rtl' : 'ltr'">
    <div class="flex flex-wrap items-center gap-4">
      <div class="relative">
        <select v-model="filters.status"
          class="px-4 py-2 pr-8 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2C702C] focus:border-transparent appearance-none bg-white">
          <option value="">{{ $t('common.allStatuses') }}</option>
          <option value="pending">{{ $t('common.pending') }}</option>
          <option value="completed">{{ $t('common.completed') }}</option>
          <option value="cancelled">{{ $t('common.cancelled') }}</option>
        </select>
        <span class="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">▼</span>
      </div>

      <div class="relative">
        <select v-model="filters.payment_method"
          class="px-4 py-2 pr-8 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2C702C] focus:border-transparent appearance-none bg-white">
          <option value="">{{ $t('common.allPayoutMethods') }}</option>
          <option value="earn">{{ $t('common.earnedPoints') }}</option>
          <option value="donate">{{ $t('common.donatedPoints') }}</option>
        </select>
        <span class="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">▼</span>
      </div>
      <div class="flex-1 max-w-md ml-auto">
        <div class="relative">
          <input v-model="searchQuery" type="text" :placeholder="$t('common.searchByNameOrEmail')"
            class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2C702C] focus:border-transparent" />
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
  <div class="bg-white rounded-lg shadow-sm overflow-hidden" :dir="$i18n.locale === 'ar' ? 'rtl' : 'ltr'">
    <div class="overflow-x-auto">
      <table class="w-full table-auto">
        <thead class="bg-gray-50 border-b border-gray-200">
          <tr>
            <th class="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-start">#</th>
            <th class="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-start">{{
              $t('common.requestNumber') }}</th>
            <th class="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-start">{{
              $t('common.createdAt') }}</th>
            <th class="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-start">{{
              $t('common.phone') }}</th>
            <th class="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-start">{{
              $t('common.status') }}</th>
            <th class="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-start">{{
              $t('common.action') }}</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-if="filteredOrders.length === 0">
            <td colspan="7" class="px-4 py-4 text-center text-gray-500">
              No results match your search
            </td>
          </tr>

          <tr v-for="order, index in filteredOrders" :key="order.id" class="hover:bg-gray-50 transition-colors">
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#2C702C]">{{ index + 1 }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#2C702C]">{{ order.order_number }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#2C702C]">{{ order.created_at }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#2C702C]"><a
                :href="'tel:+' + order.address?.phone">{{
                  order.address?.phone }}</a></td>
            <td class="px-6 py-4 whitespace-nowrap text-sm">
              <span class="px-2 py-1 rounded-full text-xs font-medium capitalize" :class="{
                'text-green-800 bg-green-100': order.status === 'completed',
                'text-red-800 bg-red-100': order.status === 'cancelled',
                'text-warning bg-yellow-100': order.status === 'pending' || order.status === 'assigned'
              }">
                {{ $t(`common.${order.status}`) }}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm space-x-2">
              <button @click="openScanner(order)"
                class="px-3 py-1 border border-green-300 rounded-md text-[#2C702C] hover:bg-green-50 transition-colors cursor-pointer">
                {{ $t('common.collect') }}
              </button>
              <button @click="openDetailsModal(order)"
                class="px-3 py-1 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition-colors">
                {{ $t('common.details') }}
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <Teleport to="body">
      <div v-if="scannerOpen"
        class="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-black/30"
        @click="closeScanner">
        <div class="relative p-4 w-full max-w-md" @click.stop>
          <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button type="button" @click="closeScanner"
              class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
              <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                viewBox="0 0 14 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
              </svg>
              <span class="sr-only">Close modal</span>
            </button>
            <div class="p-4 md:p-5 text-center">
              <h3 class="text-xl font-semibold text-[#2C702C] mb-2">{{ $t('common.scanQrToCollect') }}</h3>
              <p class="text-gray-500 mb-4">{{ infoText }}</p>
              <div class="aspect-video bg-black rounded-lg overflow-hidden flex items-center justify-center mb-4">
                <video ref="videoEl" class="w-full h-full object-cover" autoplay playsinline></video>
              </div>
              <div class="flex justify-center gap-3">
                <button @click="closeScanner" type="button"
                  class="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-[#2C702C]">
                  {{ $t('common.closeScanner') }}
                </button>
                <button @click="startCamera" type="button"
                  class="text-white bg-[#2C702C] hover:bg-[#1a4d1a] focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                  {{ $t('common.openCamera') }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="showDetailsModal"
        class="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/30"
        @click="showDetailsModal = false">
        <div class="relative p-4 w-full max-w-2xl" @click.stop>
          <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <!-- Header -->
            <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 class="text-xl font-semibold text-[#2C702C] dark:text-white">
                {{ $t('common.orderDetails') }} | {{ details.order_number }}
              </h3>
              <button type="button" @click="showDetailsModal = false"
                class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
                <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                  viewBox="0 0 14 14">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                </svg>
                <span class="sr-only">Close modal</span>
              </button>
            </div>

            <!-- Details Content -->
            <!-- Details Content -->
            <div class="p-4 md:p-5">
              <div class="grid gap-4 mb-4 sm:grid-cols-2">
                <div>
                  <h4 class="text-sm font-medium text-gray-500 dark:text-gray-300">{{ $t('common.fullName') }}</h4>
                  <p class="mt-1 text-base font-semibold text-[#2C702C] dark:text-white break-words">
                    {{ details.name }}
                  </p>
                </div>

                <div>
                  <h4 class="text-sm font-medium text-gray-500 dark:text-gray-300">{{ $t('common.phone') }}</h4>
                  <p class="mt-1 text-base font-semibold text-[#2C702C] dark:text-white break-words">
                    <a :href="'tel:+' + details.address?.phone">{{ details.address?.phone }}</a>
                  </p>
                </div>

                <div class="sm:col-span-2">
                  <h4 class="text-sm font-medium text-gray-500 dark:text-gray-300">{{ $t('common.streetAddress') }}</h4>
                  <p class="mt-1 text-base font-semibold text-[#2C702C] dark:text-white break-words">
                    {{ details.address?.street_address }}
                  </p>
                </div>

                <div>
                  <h4 class="text-sm font-medium text-gray-500 dark:text-gray-300">{{ $t('common.city') }}</h4>
                  <p class="mt-1 text-base font-semibold text-[#2C702C] dark:text-white break-words">
                    {{ details.address?.city }}
                  </p>
                </div>

                <div>
                  <h4 class="text-sm font-medium text-gray-500 dark:text-gray-300">{{ $t('common.orderStatus') }}</h4>
                  <p class="mt-1 text-sm font-semibold px-2 py-1 rounded-full inline-block" :class="{
                    'bg-green-100 text-green-800': details.status === 'completed',
                    'bg-yellow-100 text-yellow-800': details.status === 'pending',
                    'bg-red-100 text-red-800': details.status === 'cancelled'
                  }">
                    {{ $t(`common.${details.status}`) }}
                  </p>
                </div>

                <div>
                  <h4 class="text-sm font-medium text-gray-500 dark:text-gray-300">{{ $t('common.createdAt') }}</h4>
                  <p class="mt-1 text-base font-semibold text-[#2C702C] dark:text-white">
                    {{ details.created_at }}
                  </p>
                </div>
              </div>

              <!-- Waste Items Section -->
              <div class="mb-4">
                <h4 class="text-lg font-semibold text-[#2C702C] mb-3 border-b pb-2">{{ $t('common.wasteItemsToCollect')
                }}</h4>
                <div class="space-y-3 max-h-64 overflow-y-auto">
                  <div v-for="item in details.items" :key="item.id"
                    class="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <!-- Item Image -->
                    <img :src="item.product?.image_url" :alt="item.product?.name"
                      class="w-16 h-16 object-cover rounded-lg bg-white border border-gray-200" />

                    <!-- Item Details -->
                    <div class="flex-1">
                      <h5 class="font-semibold text-[#2C702C]">{{ item.product?.name }}</h5>
                      <p class="text-sm text-gray-600">
                        {{ $t('common.quantity') }}: <span class="font-semibold">{{ item.quantity }}</span>
                      </p>
                      <p class="text-sm text-green-600 font-medium">
                        {{ item.price }} {{ $t('common.currency') }}
                      </p>
                    </div>
                  </div>

                  <!-- Empty State -->
                  <div v-if="!details.items || details.items.length === 0" class="text-center py-8 text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                      stroke="currentColor" class="w-12 h-12 mx-auto mb-2 text-gray-300">
                      <path stroke-linecap="round" stroke-linejoin="round"
                        d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                    </svg>
                    <p>{{ $t('common.noWasteItems') }}</p>
                  </div>
                </div>
              </div>

              <!-- Total Points -->
              <div class="bg-green-50 rounded-lg p-4 mb-4">
                <div class="flex justify-between items-center">
                  <h4 class="text-sm font-medium text-gray-700">{{ $t('common.totalPoints') }}</h4>
                  <p class="text-2xl font-bold text-green-600">
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
  </div>
</template>

<script>
import ordersService from '@/services/ordersService';
import { nextTick } from 'vue';

export default {
  name: 'CourierAssignedOrders',
  data() {
    return {
      searchQuery: '',
      selectedOrder: '',
      showCompleteModal: false,
      orders: [],
      showDetailsModal: false,
      details: {
        order_number: null,
        name: '',
        address: '',
        total: '',
        payment_method: '',
        status: '',
      },
      filters: {
        payment_method: '',
        status: '',
      },
      scannerOpen: false,
      activeRequestId: null,
      stream: null,
      infoText: 'Point your camera at the QR code on the order receipt.'
    }
  },

  computed: {
    filteredOrders() {
      let filtered = this.orders;

      if (this.filters.payment_method) {
        filtered = filtered.filter(order =>
          order.payment_method === this.filters.payment_method
        );
      }

      if (this.filters.status) {
        filtered = filtered.filter(order =>
          order.status === this.filters.status
        );
      }

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
    openCompleteModal(order) {
      this.selectedOrder = order.id;
      this.showCompleteModal = true;
    },
    openScanner(req) {
      this.activeRequestId = req.id
      this.scannerOpen = true
      this.$nextTick(this.startCamera)
    },


    openDetailsModal(order) {
      this.details = {
        order_number: order.order_number,
        name: order.user?.name || 'N/A',
        address: order.address,
        total: order.total,
        payment_method: order.payment_method,
        status: order.status,
        items: order.items || [],
        created_at: order.created_at,
      };
      this.showDetailsModal = true;
    },
    async confirmComplete() {
      try {
        const response = await ordersService.completeOrder(this.selectedOrder);
        nextTick(() => {
          this.$toast.success(response.data.message);
        });
        this.selectedOrder = '';
        this.fetchMyOrders();
        this.showCompleteModal = false;
      } catch (error) {
        this.$toast.error(error.response.data.message);
      }
    },
    async startCamera() {
      try {
        if (this.stream) return
        const constraints = { video: { facingMode: 'environment' } }
        this.stream = await navigator.mediaDevices.getUserMedia(constraints)
        const video = this.$refs.videoEl
        if (video) {
          video.srcObject = this.stream
          await video.play()
        }
      } catch (error) {
        this.$toast?.error?.(error)
        this.$toast?.error?.('Camera access was denied')
      }
    },
    async closeScanner() {
      if (this.stream) {
        this.stream.getTracks().forEach(t => t.stop())
        this.stream = null
      }
      this.scannerOpen = false
      this.activeRequestId = null
    },

    async fetchMyOrders() {
      try {
        const user = await ordersService.getMyOrders();
        this.orders = user.data.orders || user.data;
      } catch (error) {
        this.$toast.error(error?.response?.data.message || 'Failed to fetch orders.');
      }
    },
  },
  mounted() {
    this.fetchMyOrders();
  }
}
</script>

<style scoped></style>
