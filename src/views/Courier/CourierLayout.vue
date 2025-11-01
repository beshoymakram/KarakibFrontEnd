<template>
  <div class="admin-layout py-5 bg-[#BFD6BF]" :dir="$i18n.locale === 'ar' ? 'rtl' : 'ltr'">
    <div class="cards flex flex-wrap justify-center gap-8 mx-4 pb-5">
      <div class="card bg-base-100 md:w-75 xs:w-50 shadow-sm">
        <div class="card-body">
          <h3 class="text-lg font-semibold">{{ $t('common.assignedRequests') }}</h3>
          <p class="text-3xl font-bold text-[#2C702C]">12</p>
          <div class="numbers flex items-center gap-2 text-gray-500">
            <p class="text-xl font-bold">3 {{ $t('common.pending') }}</p>
          </div>
        </div>
      </div>
      <div class="card bg-base-100 md:w-75 xs:w-50 shadow-sm">
        <div class="card-body">
          <h3 class="text-lg font-semibold">{{ $t('common.completed') }}</h3>
          <p class="text-3xl font-bold text-[#2C702C]">8</p>
          <div class="numbers flex items-center gap-2 text-gray-500">
            <p class="text-xl font-bold">2 {{ $t('common.today') || 'today' }}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-white rounded-t-lg shadow-sm mb-6 mx-4 md:mx-20 sm:mx-10">
      <nav
        :class="['flex', 'flex-wrap', 'p-2', 'border-b-1', $i18n.locale === 'ar' ? 'space-x-reverse space-x-1' : 'space-x-1']">
        <router-link to="/courier/assigned-requests"
          class="px-4 py-3 cursor-pointer text-sm font-medium rounded-lg transition-all duration-200"
          :class="$route.name === 'CourierAssignedRequests' ? 'bg-[#E0EBE0] text-[#2C702C]' : 'text-gray-600 hover:bg-gray-100'">
          {{ $t('common.assignedRequests') }}
        </router-link>
        <router-link to="/courier/assigned-orders"
          class="px-4 py-3 cursor-pointer text-sm font-medium rounded-lg transition-all duration-200"
          :class="$route.name === 'CourierAssignedOrders' ? 'bg-[#E0EBE0] text-[#2C702C]' : 'text-gray-600 hover:bg-gray-100'">
          {{ $t('common.assignedOrders') }}
        </router-link>
      </nav>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CourierLayout',
}
</script>

<style scoped>
.router-link-exact-active {
  background-color: #e0ebe0;
}
</style>
