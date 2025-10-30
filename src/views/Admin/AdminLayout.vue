<template>
  <div class="admin-layout py-5 bg-[#BFD6BF]" :dir="$i18n.locale === 'ar' ? 'rtl' : 'ltr'">
    <div class="cards flex flex-wrap justify-center gap-8 mx-4 pb-5">
      <div class="card bg-base-100 md:w-75 xs:w-50 shadow-sm">
        <div class="card-body">
          <h3 class="text-lg font-semibold">{{ $t('common.totalUsers') }}</h3>
          <p class="text-3xl font-bold text-[#2C702C]">{{ users.total }}</p>
          <div class="numbers flex">
            <p class="text-xl font-bold text-gray-500">{{ users.new }} {{ $t('common.joinedLast24') }}</p>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
              class="size-6 text-[#2C702C]">
              <path fill-rule="evenodd"
                d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                clip-rule="evenodd" />
            </svg>
          </div>
        </div>
      </div>
      <div class="card bg-base-100 md:w-75 xs:w-50 shadow-sm">
        <div class="card-body">
          <h3 class="text-lg font-semibold">{{ $t('common.totalOrders') }}</h3>
          <p class="text-3xl font-bold text-[#2C702C]">{{ orders.total }}</p>
          <div class="numbers flex">
            <p class="text-xl font-bold text-gray-500">{{ orders.new }} {{ $t('common.new') }}</p>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
              class="size-6 text-[#2C702C]">
              <path
                d="M7.5 3.375c0-1.036.84-1.875 1.875-1.875h.375a3.75 3.75 0 0 1 3.75 3.75v1.875C13.5 8.161 14.34 9 15.375 9h1.875A3.75 3.75 0 0 1 21 12.75v3.375C21 17.16 20.16 18 19.125 18h-9.75A1.875 1.875 0 0 1 7.5 16.125V3.375Z" />
              <path
                d="M15 5.25a5.23 5.23 0 0 0-1.279-3.434 9.768 9.768 0 0 1 6.963 6.963A5.23 5.23 0 0 0 17.25 7.5h-1.875A.375.375 0 0 1 15 7.125V5.25ZM4.875 6H6v10.125A3.375 3.375 0 0 0 9.375 19.5H16.5v1.125c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 0 1 3 20.625V7.875C3 6.839 3.84 6 4.875 6Z" />
            </svg>
          </div>
        </div>
      </div>
      <div class="card bg-base-100 md:w-75 xs:w-50 shadow-sm">
        <div class="card-body">
          <h3 class="text-lg font-semibold">{{ $t('common.collectRequests') }}</h3>
          <p class="text-3xl font-bold text-[#2C702C]">{{ requests.total }}</p>
          <div class="numbers flex">
            <p class="text-xl font-bold text-gray-500">{{ requests.pending }} {{ $t('common.pending') }}</p>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
              class="size-6 text-[#2C702C]">
              <path fill-rule="evenodd"
                d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                clip-rule="evenodd" />
            </svg>
          </div>
        </div>
      </div>
      <div class="card bg-base-100 md:w-75 xs:w-50 shadow-sm">
        <div class="card-body">
          <h3 class="text-lg font-semibold">{{ $t('common.donatedPoints') }}</h3>
          <p class="text-3xl font-bold text-[#2C702C]">{{ Math.abs(donatedPoints) }}</p>
          <div class="numbers flex">
            <p class="text-xl font-bold text-gray-500">{{ $t('common.equivalentTo') }} {{ Math.abs(donatedPoints /
              19).toFixed() }} {{ $t('common.currency') }}
            </p>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
              class="size-6 text-[#2C702C]">
              <path fill-rule="evenodd"
                d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                clip-rule="evenodd" />
            </svg>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-white rounded-t-lg shadow-sm mb-6 mx-4 md:mx-20 sm:mx-10">
      <nav
        :class="['flex', 'flex-wrap', 'p-2', 'border-b-1', $i18n.locale === 'ar' ? 'space-x-reverse space-x-1' : 'space-x-1']">
        <router-link v-for="tab in tabs" :key="tab.id" @click="activeTab = tab.id" :to="tab.id"
          class="px-4 py-3 cursor-pointer text-sm font-medium rounded-lg transition-all duration-200" :class="activeTab === tab.id
            ? 'bg-[#E0EBE0] text-[#2C702C]'
            : 'text-gray-600 hover:bg-gray-100'">
          {{ $t(tab.labelKey) }}
        </router-link>
      </nav>
      <router-view></router-view>
    </div>

  </div>
</template>

<script>
import adminNumbersService from '@/services/adminNumbersService';

export default {
  name: "AdminLayout",
  data() {
    return {
      activeTab: '',
      usersCount: '',
      ordersCount: '',
      users: '',
      orders: '',
      requests: '',
      donatedPoints: '',
      tabs: [
        { id: 'users', labelKey: 'common.user' },
        { id: 'waste-types', labelKey: 'common.wasteTypes' },
        { id: 'waste-items', labelKey: 'common.wasteItems' },
        { id: 'products-categories', labelKey: 'common.productsCategories' },
        { id: 'products', labelKey: 'common.products' },
        { id: 'requests', labelKey: 'common.allRequests' },
        { id: 'orders', labelKey: 'common.orders' },
        { id: 'donations', labelKey: 'common.donations' },
      ],
    }
  },
  methods: {

    async getNumbers() {
      try {
        const response = await adminNumbersService.getNumbers();
        this.users = response.data.users;
        this.orders = response.data.orders;
        this.requests = response.data.requests;
        this.donatedPoints = response.data.donated_points;
      } catch (error) {
        this.$toast.error(error.response.data.message);
      }
    },
  },
  mounted() {
    this.getNumbers();
  }
};
</script>

<style scoped>
.router-link-exact-active {
  background-color: #e0ebe0;
}
</style>
