<template>
  <div class="admin-layout py-5 bg-myprofile" :dir="$i18n.locale === 'ar' ? 'rtl' : 'ltr'">
    <div class="cards flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 mx-4 sm:mx-10 md:mx-20 pb-5 pt-4 sm:mt-6 md:mt-8 lg:mt-10">
      <div class="card bg-base-100 w-[80vw] sm:w-[70vw] md:w-[60vw] lg:w-90 shadow-sm">
        <div class="card-body flex flex-col justify-evenly">
          <h3 class="text-base md:text-lg font-semibold">{{ $t('common.assignedRequests') }}</h3>
          <p class="text-2xl md:text-3xl font-bold text-[#2C702C]">{{ requests.total }}</p>
          <div class="numbers flex items-center gap-2 text-gray-500">
            <p class="text-base md:text-lg font-semibold">{{ requests.pending }} {{ $t('common.pending') }}</p>
          </div>
        </div>
      </div>
      <div class="card bg-base-100 w-[80vw] sm:w-[70vw] md:md:w-[60vw] lg:w-90 shadow-sm">
        <div class="card-body flex flex-col justify-evenly">
          <h3 class="text-base md:text-lg font-semibold">{{ $t('common.assignedOrders') }}</h3>
          <p class="text-2xl md:text-3xl font-bold text-[#2C702C]">{{ orders.total }}</p>
          <div class="numbers flex items-center gap-2 text-gray-500">
            <p class="text-base md:text-lg font-semibold">{{ orders.new }} {{ $t('common.today') || 'today' }}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-tabs rounded-lg shadow-sm mb-6 mx-4  sm:mx-10 md:mx-20">
      <nav
        :class="['flex', 'flex-wrap', 'p-2', 'border-b', $i18n.locale === 'ar' ? 'space-x-reverse space-x-1' : 'space-x-1']">
        <router-link v-for="tab in tabs" :key="tab.id" @click="activeTab = tab.id" :to="tab.id"
          class="px-2 sm:px-4 py-2 sm:py-3 mb-1 mx-1 cursor-pointer   text-xs sm:text-sm font-medium rounded-lg transition-all duration-200" :class="activeTab === tab.id
            ? 'bg-[#E0EBE0] text-[#2C702C]'
            : 'text-primary hover:bg-gray-100'">
          {{ $t(tab.labelKey) }}
        </router-link>
      </nav>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import couriersService from '@/services/couriersService';

export default {
  name: 'CourierLayout',
  data() {
    return {
      activeTab: '',
      usersCount: '',
      ordersCount: '',
      orders: '',
      requests: '',
      tabs: [
        { id: 'assigned-requests', labelKey: 'common.assignedRequests' },
        { id: 'assigned-orders', labelKey: 'common.assignedOrders' },
      ],
    }
  },
  methods: {

    async getNumbers() {
      try {
        const response = await couriersService.getNumbers();
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
}
</script>

<style scoped>
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
