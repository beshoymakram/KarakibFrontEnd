<template>
  <div class="profile-layout py-5 bg-myprofile " :dir="$i18n.locale === 'ar' ? 'rtl' : 'ltr'">

    <div
      class="cards flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 mx-4 sm:mx-10 md:mx-20 pb-5 pt-4 sm:mt-6 md:mt-8 lg:mt-10">

      <div class="card bg-base-100  w-[80vw] sm:w-70 md:w-80 shadow-sm">
        <div class="card-body flex flex-col justify-evenly">
          <h3 class="  text-base md:text-lg font-semibold">{{ $t('common.myPoints') }}</h3>
          <div class="numbers flex items-center">
            <p class="text-2xl md:text-3xl font-bold text-[#2C702C]">{{ auth.user.points }}</p>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
              class="size-5  md:size-6 text-[#2C702C]">
              <path fill-rule="evenodd"
                d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                clip-rule="evenodd" />
            </svg>
          </div>
        </div>
      </div>

      <div class="card bg-base-100 w-[80vw] sm:w-70 md:w-80  shadow-sm">
        <div class="card-body flex flex-col justify-evenly">
          <h3 class="text-base md:text-lg font-semibold">{{ $t('common.myBalance') }}</h3>
          <div class="numbers flex items-center">
            <p class="text-2xl md:text-3xl font-bold text-[#2C702C]">{{ auth.user.balance + ' ' + $t('common.currency')
            }}</p>
            <svg class="size-5  md:size-6 text-[#2C702C]" viewBox="0 0 24 24" fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M11.25 7.84748C10.3141 8.10339 9.75 8.82154 9.75 9.5C9.75 10.1785 10.3141 10.8966 11.25 11.1525V7.84748Z"
                fill="#2C702C" />
              <path
                d="M12.75 12.8475V16.1525C13.6859 15.8966 14.25 15.1785 14.25 14.5C14.25 13.8215 13.6859 13.1034 12.75 12.8475Z"
                fill="#2C702C" />
              <path fill-rule="evenodd" clip-rule="evenodd"
                d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM12 5.25C12.4142 5.25 12.75 5.58579 12.75 6V6.31673C14.3804 6.60867 15.75 7.83361 15.75 9.5C15.75 9.91421 15.4142 10.25 15 10.25C14.5858 10.25 14.25 9.91421 14.25 9.5C14.25 8.82154 13.6859 8.10339 12.75 7.84748V11.3167C14.3804 11.6087 15.75 12.8336 15.75 14.5C15.75 16.1664 14.3804 17.3913 12.75 17.6833V18C12.75 18.4142 12.4142 18.75 12 18.75C11.5858 18.75 11.25 18.4142 11.25 18V17.6833C9.61957 17.3913 8.25 16.1664 8.25 14.5C8.25 14.0858 8.58579 13.75 9 13.75C9.41421 13.75 9.75 14.0858 9.75 14.5C9.75 15.1785 10.3141 15.8966 11.25 16.1525V12.6833C9.61957 12.3913 8.25 11.1664 8.25 9.5C8.25 7.83361 9.61957 6.60867 11.25 6.31673V6C11.25 5.58579 11.5858 5.25 12 5.25Z"
                fill="#2C702C" />
            </svg>
          </div>
        </div>
      </div>

      <div class="card bg-base-100  w-[80vw] sm:w-70 md:w-80 shadow-sm">
        <div class="card-body flex flex-col justify-evenly">
          <h3 class=" text-base md:text-lg font-semibold">{{ $t('common.myOrders') }}</h3>
          <div class="numbers flex items-center">
            <p class="text-2xl md:text-3xl font-bold text-[#2C702C]">{{ auth.user.orders?.length || 0 }}</p>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
              class="size-5  md:size-6 text-[#2C702C]">
              <path
                d="M7.5 3.375c0-1.036.84-1.875 1.875-1.875h.375a3.75 3.75 0 0 1 3.75 3.75v1.875C13.5 8.161 14.34 9 15.375 9h1.875A3.75 3.75 0 0 1 21 12.75v3.375C21 17.16 20.16 18 19.125 18h-9.75A1.875 1.875 0 0 1 7.5 16.125V3.375Z" />
              <path
                d="M15 5.25a5.23 5.23 0 0 0-1.279-3.434 9.768 9.768 0 0 1 6.963 6.963A5.23 5.23 0 0 0 17.25 7.5h-1.875A.375.375 0 0 1 15 7.125V5.25ZM4.875 6H6v10.125A3.375 3.375 0 0 0 9.375 19.5H16.5v1.125c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 0 1 3 20.625V7.875C3 6.839 3.84 6 4.875 6Z" />
            </svg>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-tabs rounded-lg shadow-sm mb-6 mx-4  sm:mx-10 md:mx-20">
      <nav
        :class="['flex', 'flex-wrap', 'p-2', 'border-b', $i18n.locale === 'ar' ? 'space-x-reverse space-x-1' : 'space-x-1']">
        <router-link v-for="tab in tabs" :key="tab.id" @click="activeTab = tab.id" :to="tab.id"
          class="px-2 sm:px-4 py-2 sm:py-3 mb-1 mx-1 cursor-pointer   text-xs sm:text-sm font-medium rounded-lg transition-all duration-200"
          :class="activeTab === tab.id
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
import { useAuthStore } from '@/stores/auth';

export default {
  name: "ProfileLayout",
  data() {
    return {
      activeTab: '',
      tabs: [
        { id: 'personal-info', labelKey: 'common.personalInfo' },
        { id: 'my-addresses', labelKey: 'common.myAddresses' },
        { id: 'my-requests', labelKey: 'common.myRequests' },
        { id: 'my-orders', labelKey: 'common.myOrders' },
        { id: 'my-points', labelKey: 'common.myPoints' },
        { id: 'my-balance', labelKey: 'common.myBalance' },
      ],
    }
  },
  mounted() {
    useAuthStore().fetchUser();
  },
};
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
