<template>
  <div class="profile-layout py-5 bg-[#BFD6BF]">
    <div class="bg-white rounded-t-lg shadow-sm mb-6 mx-4 md:mx-20 sm:mx-10">
      <nav class="flex flex-wrap space-x-1 p-2 border-b-1">
        <router-link v-for="tab in tabs" :key="tab.id" @click="activeTab = tab.id" :to="tab.id"
          class="px-4 py-3 cursor-pointer text-sm font-medium rounded-lg transition-all duration-200" :class="activeTab === tab.id
            ? 'bg-[#E0EBE0] text-[#2C702C]'
            : 'text-gray-600 hover:bg-gray-100'">
          {{ tab.label }}
        </router-link>
      </nav>
      <router-view></router-view>
    </div>

  </div>
</template>

<script>
export default {
  name: "ProfileLayout",
  data() {
    return {
      activeTab: '',
      tabs: [
        { id: 'personal-info', label: 'Personal Info' },
        { id: 'my-addresses', label: 'My Addresses' },
        { id: 'my-requests', label: 'My Requests' },
        { id: 'my-orders', label: 'My Orders' },
        { id: 'my-points', label: 'My Points' },
      ],
    }
  },
};
</script>

<style scoped>
.router-link-exact-active {
  background-color: #e0ebe0;
}
</style>
