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

      <div class="relative">
        <select v-model="filters.payout_method"
          class="px-4 py-2 pr-8 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2C702C] focus:border-transparent appearance-none bg-tabs">
          <option value="">{{ $t('common.allPayoutMethods') }}</option>
          <option value="earn">{{ $t('common.earnedPoints') }}</option>
          <option value="donate">{{ $t('common.donatedPoints') }}</option>
        </select>
        <span class="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">▼</span>
      </div>
      <div class="flex-1 max-w-md ml-auto">
        <div class="relative">
          <input v-model="searchQuery" type="text" :placeholder="$t('common.searchByNameOrEmail')"
            class="w-full px-8 md:px-10 py-1.5 md:py-2  text-sm md:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2C702C] focus:border-transparent" />
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
              $t('common.orderNumber') }}</th>
            <th class="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-start">{{
              $t('common.orderedDate') }}</th>
            <th class="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-start">{{
              $t('common.total') }}
            </th>
            <th class="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-start">{{
              $t('common.payoutMethod') }}</th>
            <th class="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-start">{{
              $t('common.courier') }}</th>
            <th class="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-start">{{
              $t('common.status') }}</th>
            <th class="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-start">{{
              $t('common.action') }}</th>
          </tr>
        </thead>
        <tbody class="bg-tabs divide-y divide-gray-200">
          <tr v-if="filteredRequests.length === 0">
            <td colspan="7" class="px-4 py-4 text-center text-gray-500">
              No results match your search
            </td>
          </tr>

          <tr v-for="request in filteredRequests" :key="request.id" class="transition-colors">
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-primary">
              {{ request.request_number }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-primary">
              {{ request.created_at }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-primary">
              {{ request.total }} {{ $t('common.points') }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-primary">
              {{ request.payout_method == 'earn' ? $t('common.earnedPoints') : $t('common.donatedPoints') }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-primary">
              {{ request.courier?.name }}
              <button v-if="request.courier" @click="unassign(request)" class="text-orange-700 cursor-pointer block">
                {{ $t('common.unassign') }}
              </button>
              <button v-if="!request.courier && request.status !== 'cancelled'" @click="openAssignModal(request)"
                class="px-3 py-1 border border-green-300 rounded-md text-primary hover:bg-green-50 transition-colors cursor-pointer">
                {{ $t('common.assignCourier') }}
              </button>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm">
              <span class="px-2 py-1 rounded-full text-xs font-medium capitalize" :class="{
                'text-green-800 bg-green-100': request.status === 'completed',
                'text-red-800 bg-red-100': request.status === 'cancelled',
                'text-warning bg-yellow-100': request.status === 'pending' || request.status === 'assigned'
              }">
                {{ $t(`common.${request.status}`) }}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm space-x-2">
              <button v-if="request.status !== 'cancelled' && request.status !== 'completed'"
                @click="openCompleteModal(request)"
                class="px-3 py-1 border border-green-300 rounded-md text-primary hover:bg-green-50 transition-colors cursor-pointer">
                {{ $t('common.complete') }}
              </button>
              <button @click="openDetailsModal(request)"
                class="px-3 py-1 border border-gray-300 rounded-md text-primary hover:bg-green-100 transition-colors">
                {{ $t('common.details') }}
              </button>
              <button v-if="request.status !== 'cancelled' && request.status !== 'completed'"
                @click="openCancelModal(request)"
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
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <button type="button" @click="showCancelModal = false"
            class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
            </svg>
            <span class="sr-only">Close modal</span>
          </button>
          <div class="p-4 md:p-5 text-center">
            <svg class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
            <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              {{ $t('common.areYouSureCancelRequest') }}
            </h3>
            <button @click="confirmCancel" type="button"
              class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center">
              {{ $t("common.YesSure") }}
            </button>
            <button @click="showCancelModal = false" type="button"
              class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
              {{ $t('common.No, Cancel') }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <div v-if="showAssignModal"
      class="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-black/30"
      @click="showAssignModal = false">
      <div class="relative p-4 w-full max-w-2xl" @click.stop>
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <!-- Header -->
          <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 class="text-xl font-semibold text-[#2C702C] dark:text-white">
              {{ $t('common.assignCourier') }}
            </h3>
            <button type="button" @click="showAssignModal = false"
              class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
              <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                viewBox="0 0 14 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
              </svg>
              <span class="sr-only">Close modal</span>
            </button>
          </div>

          <!-- Body -->
          <form @submit.prevent="confirmAssign" class="p-4 md:p-5">
            <div class="grid gap-4 mb-4 grid-cols-2">

              <div class="col-span-2">
                <label for="type" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{
                  $t('common.courier') }}</label>
                <select id="type" v-model="assignForm.courier_id"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#2C702C] focus:border-[#2C702C] block w-full p-2.5"
                  required>
                  <option value="" disabled selected>{{ $t('common.selectCourier') }}</option>
                  <option v-for="courier in couriers" :key="courier.id" :value="courier.id">{{ courier.name }}
                  </option>
                </select>
              </div>

            </div>

            <!-- Footer Buttons -->
            <div class="flex justify-end space-x-3">
              <button @click="showAssignModal = false" type="button"
                class="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-[#2C702C] focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                {{ $t('common.Cancel') }}
              </button>
              <button type="submit"
                class="text-white bg-[#2C702C] hover:bg-[#1a4d1a] focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                {{ $t('common.assign') }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <div v-if="showCompleteModal"
      class="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-black/30"
      @click="showCompleteModal = false">
      <div class="relative p-4 w-full max-w-md" @click.stop>
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <button type="button" @click="showCompleteModal = false"
            class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
            </svg>
            <span class="sr-only">Close modal</span>
          </button>
          <div class="p-4 md:p-5 text-center">
            <svg class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
            <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              {{ $t('common.pointsWillBeAdded') }}<br />
              {{ $t('common.areYouSureCompleteRequest') }}
            </h3>
            <button @click="confirmComplete" type="button"
              class="text-white bg-[#2C702C] hover:bg-[#1a4d1a] focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
              {{ $t("common.YesSure") }}
            </button>
            <button @click="showCompleteModal = false" type="button"
              class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
              {{ $t('common.No, Cancel') }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <div v-if="showDetailsModal" class="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/30"
      @click="showDetailsModal = false">
      <div class="relative p-4 w-full max-w-2xl" @click.stop>
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <!-- Header -->
          <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 class="text-xl font-semibold text-[#2C702C] dark:text-white">
              {{ $t('common.requestDetails') }} | {{ details.request_number }}
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
                  <a :href="'tel:+' + details.address?.phone">{{
                    details.address?.phone }}</a>
                </p>
              </div>

              <div class="sm:col-span-2">
                <h4 class="text-sm font-medium text-gray-500 dark:text-gray-300">{{ $t('common.streetAddress') }}</h4>
                <p class="mt-1 text-base font-semibold text-[#2C702C] dark:text-white break-words">
                  {{ details.address?.street_address }}
                </p>
              </div>

              <div>
                <h4 class="text-sm font-medium text-gray-500 dark:text-gray-300">City</h4>
                <p class="mt-1 text-base font-semibold text-[#2C702C] dark:text-white break-words">
                  {{ details.address?.city }}
                </p>
              </div>

              <div>
                <h4 class="text-sm font-medium text-gray-500 dark:text-gray-300">Request Status</h4>
                <p class="mt-1 text-sm font-semibold px-2 py-1 rounded-full inline-block" :class="{
                  'bg-green-100 text-green-800': details.status === 'completed',
                  'bg-yellow-100 text-yellow-800': details.status === 'pending',
                  'bg-red-100 text-red-800': details.status === 'cancelled'
                }">
                  {{ $t(`common.${details.status}`) }}
                </p>
              </div>

              <div>
                <h4 class="text-sm font-medium text-gray-500 dark:text-gray-300">Created At</h4>
                <p class="mt-1 text-base font-semibold text-[#2C702C] dark:text-white">
                  {{ details.created_at }}
                </p>
              </div>

              <div>
                <h4 class="text-sm font-medium text-gray-500 dark:text-gray-300">Total</h4>
                <p class="mt-1 text-base font-semibold text-[#2C702C] dark:text-white">
                  {{ details.total }} {{ $t('common.currency') }}
                </p>
              </div>
            </div>
            <hr class="pb-3">
            <div class="grid gap-4 mb-4 sm:grid-cols-2">
              <div v-for="item, index in details.items" :key="item.id"
                class="hover:bg-gray-50 transition-colors col-span-1">
                <h4 class="text-sm font-medium text-gray-500 dark:text-gray-300">Item {{ index + 1 }}</h4>
                <p class="mt-1 font-semibold text-[#2C702C] dark:text-white  text-xs">
                  {{ item.item?.name }}<br />
                  {{ $t('common.quantity') }} = {{ item.quantity }}<br />
                  {{ $t('common.totalPoints') }}= {{ item.subtotal }} {{ $t('common.points') }}
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
import requestsService from '@/services/requestsService';
import usersService from '@/services/usersService';
import { nextTick } from 'vue';

export default {
  name: 'AdminRequests',

  data() {
    return {
      searchQuery: '',
      showCancelModal: false,
      showCompleteModal: false,
      showDetailsModal: false,
      showAssignModal: false,
      details: {
        order_number: null,
        name: '',
        address: '',
        total: '',
        payout_method: '',
        status: '',
        items: [],
      },
      assignForm: {
        courier_id: ''
      },
      filters: {
        payout_method: '',
        status: '',
      },
      requests: []
    }
  },

  computed: {
    filteredRequests() {
      let filtered = this.requests;

      if (this.filters.payout_method) {
        filtered = filtered.filter(item =>
          item.payout_method === this.filters.payout_method
        );
      }

      if (this.filters.status) {
        filtered = filtered.filter(item =>
          item.status === this.filters.status
        );
      }

      if (this.searchQuery) {
        filtered = filtered.filter(request =>
          request.request_number.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          request.user.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          request.address.street_address.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          request.address.phone.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          request.address.city.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          request.status.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          request.payout_method.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          request.total.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          request.created_at.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }

      return filtered;
    },


  },

  methods: {
    openCancelModal(request) {
      this.selectedRequest = request.id;
      this.showCancelModal = true;
    },

    openCompleteModal(request) {
      this.selectedRequest = request.id;
      this.showCompleteModal = true;
    },

    openAssignModal(order) {
      this.selectedRequest = order.id;
      this.showAssignModal = true;
    },

    openDetailsModal(request) {
      this.details = {
        request_number: request.request_number,
        name: request.user?.name || 'N/A',
        address: request.address,
        total: request.total,
        payout_method: request.payout_method,
        status: request.status,
        created_at: request.created_at,
        items: request.items || [],
      };
      this.showDetailsModal = true;
    },

    async fetchRequests() {
      try {
        const user = await requestsService.getRequests();
        this.requests = user.data.requests || user.data;
      } catch (error) {
        this.$toast.error(error?.response?.data.message || 'Failed to fetch requests.');
      }
    },

    async fetchCouriers() {
      try {
        const response = await usersService.getCouriers();
        this.couriers = response.data.data || response.data;
      } catch (error) {
        console.error("Error fetching couriers:", error);
      }
    },

    async confirmCancel() {
      try {
        const response = await requestsService.cancelRequest(this.selectedRequest);
        nextTick(() => {
          this.$toast.success(response.data.message);
        });
        this.selectedRequest = '';
        this.fetchRequests();
        this.showCancelModal = false;
      } catch (error) {
        this.$toast.error(error.response.data.message);
      }
    },

    async confirmComplete() {
      try {
        const response = await requestsService.completeRequest(this.selectedRequest);
        nextTick(() => {
          this.$toast.success(response.data.message);
        });
        this.selectedRequest = '';
        this.fetchRequests();
        this.showCompleteModal = false;
      } catch (error) {
        this.$toast.error(error.response.data.message);
      }
    },

    async confirmAssign() {
      if (!this.assignForm.courier_id) {
        this.$toast.error(this.$('assignCourier'));
        return;
      }
      try {
        const response = await requestsService.assignRequest(this.selectedRequest, this.assignForm.courier_id);
        nextTick(() => {
          this.$toast.success(response.data.message);
        });
        this.selectedRequest = '';
        this.assignForm.courier_id = '';
        this.fetchRequests();
        this.showAssignModal = false;
      } catch (error) {
        this.$toast.error(error);
        this.$toast.error(error.response.data.message);
      }
    },

    async unassign(order) {
      try {
        const response = await requestsService.unassign(order.id);
        nextTick(() => {
          this.$toast.success(response.data.message);
        });
        this.fetchRequests();
      } catch (error) {
        this.$toast.error(error.response.data.message);
      }
    },
  },
  mounted() {
    this.fetchRequests();
    this.fetchCouriers();
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
