<template>
  <div class="bg-myprofile rounded-lg shadow-sm p-4 mb-6" :dir="$i18n.locale === 'ar' ? 'rtl' : 'ltr'">
    <div class="flex flex-wrap items-center gap-4">
      <div class="relative">
        <select v-model="filters.type"
          class="px-4 py-2 pr-8 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2C702C] focus:border-transparent appearance-none bg-myprofile">
          <option value="">{{ $t('common.allTypes') }}</option>
          <option value="earn">{{ $t('common.earnedPoints') }}</option>
          <option value="convert">{{ $t('common.convertedPoints') }}</option>
          <option value="donate">{{ $t('common.donatedPoints') }}</option>
        </select>
        <span class="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">▼</span>
      </div>

      <div class="relative">
        <button @click="openCreateModal()"
          class="relative inline-flex items-center gap-x-1.5 mx-3 rounded-md cursor-pointer bg-[#2C702C] px-3 py-2 text-sm font-semibold text-white shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2C702C]">
          {{ $t('common.Convert points to balance') }}
        </button>
        <button @click="openDonateModal()"
          class="relative inline-flex items-center gap-x-1.5 mx-3 rounded-md cursor-pointer bg-[#2C702C] px-3 py-2 text-sm font-semibold text-white shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2C702C]">
          {{ $t('common.donatePoints') }}
        </button>
      </div>

      <div class="flex-1 max-w-md ml-auto">
        <div class="relative">
          <input v-model="searchQuery" type="text" :placeholder="$t('common.searchByNameOrEmail')"
            class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2C702C] focus:border-transparent" />
          <svg :class="['absolute', 'top-1/2', '-translate-y-1/2', 'w-5', 'h-5', 'text-gray-400', $i18n.locale === 'ar' ? 'right-3' : 'left-3']" fill="none" stroke="currentColor"
            viewBox="0 0 24 24">
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
            <th class="px-6 py-3 text-left text-xs font-medium text-section uppercase tracking-wider">{{ $t('common.points') }}</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-section uppercase tracking-wider">{{ $t('common.type') }}</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-section uppercase tracking-wider">{{ $t('common.description') }}</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-section uppercase tracking-wider">{{ $t('common.date') }}</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-section uppercase tracking-wider">{{ $t('common.action') }}</th>
          </tr>
        </thead>
        <tbody class="bg-tabs divide-y divide-gray-200">
          <tr v-if="filteredPoints.length === 0">
            <td colspan="5" class="px-4 py-4 text-center text-section">
              No results match your search
            </td>
          </tr>

          <tr v-for="point in filteredPoints" :key="point.id" class="hover:bg-gray-50 transition-colors">
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#2C702C]">
              {{ point.points }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#2C702C]">
              {{ point.type }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#2C702C]">
              {{ point.created_at }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#2C702C]">
              {{ point.description }}
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
    <div v-if="showCreateModal"
      class="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-black/30"
      @click="showCreateModal = false">
      <div class="relative p-4 w-full max-w-2xl" @click.stop>
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <!-- Header -->
          <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 class="text-xl font-semibold text-[#2C702C] dark:text-white">
              {{ $t('common.Convert points to balance') }}
            </h3>
            <button type="button" @click="showCreateModal = false"
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
          <form @submit.prevent="confirmConvert" class="p-4 md:p-5">
            <div class="grid gap-4 mb-4 grid-cols-2">
              <!-- Name -->
              <div class="col-span-2">
                <h2 class="text-center font-bold text-[#2C702C]">Aviable Points</h2>
                <h1 class="text-center">{{ auth.user.points }}</h1>
              </div>
              <div class="col-span-2">
                <label for="points" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Points to convert
                </label>
                <input type="number" id="points" v-model="createForm.points"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#2C702C] focus:border-[#2C702C] block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder="Enter points" required />
              </div>
              <div class="col-span-2">
                <label for="points" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Balance after conversion (1 EGP = 19 points)
                </label>
                <input type="number" id="balance" :value="createForm.points / 19"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#2C702C] focus:border-[#2C702C] block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder="Converted balance" disabled />
              </div>
            </div>

            <!-- Footer Buttons -->
            <div class="flex justify-end space-x-3">
              <button @click="showCreateModal = false" type="button"
                class="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-[#2C702C] focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                {{ $t('common.Cancel') }}
              </button>
              <button type="submit"
                class="text-white bg-[#2C702C] hover:bg-[#1a4d1a] focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                {{ $t('common.Save Changes') }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <div v-if="showDonateModal"
      class="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-black/30"
      @click="showDonateModal = false">
      <div class="relative p-4 w-full max-w-2xl" @click.stop>
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <!-- Header -->
          <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 class="text-xl font-semibold text-[#2C702C] dark:text-white">
              {{ $t('common.donatePoints') }}
            </h3>
            <button type="button" @click="showDonateModal = false"
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
          <form @submit.prevent="confirmDonate" class="p-4 md:p-5">
            <div class="grid gap-4 mb-4 grid-cols-2">
              <!-- Name -->
              <div class="col-span-2">
                <h2 class="text-center font-bold text-[#2C702C]">Aviable Points</h2>
                <h1 class="text-center">{{ auth.user.points }}</h1>
              </div>
              <div class="col-span-2">
                <label for="points" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Points to donate
                </label>
                <input type="number" id="points" v-model="createForm.points"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#2C702C] focus:border-[#2C702C] block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder="Enter points" required />
              </div>
            </div>

            <!-- Footer Buttons -->
            <div class="flex justify-end space-x-3">
              <button @click="showDonateModal = false" type="button"
                class="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-[#2C702C] focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                {{ $t('common.Cancel') }}
              </button>
              <button type="submit"
                class="text-white bg-[#2C702C] hover:bg-[#1a4d1a] focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
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
import userPointsService from '@/services/userPointsService';
import { useAuthStore } from '@/stores/auth';
import { nextTick } from 'vue';

export default {
  name: 'MyPoints',

  data() {
    return {
      searchQuery: '',
      selectedType: '',
      showCreateModal: false,
      showDonateModal: false,
      createForm: {
        id: null,
        points: '',
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

      points: []
    }
  },

  computed: {
    filteredPoints() {
      let filtered = this.points;

      if (this.filters.type) {
        filtered = filtered.filter(item =>
          item.type === this.filters.type
        );
      }

      if (this.searchQuery) {
        filtered = filtered.filter(point =>
          point.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          point.street_point.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          point.phone.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          point.city.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }

      return filtered;
    },


  },

  methods: {
    openCreateModal() {
      this.showCreateModal = true;
    },

    openDonateModal() {
      this.showDonateModal = true;
    },

    async confirmConvert() {
      try {
        const response = await userPointsService.convertPoints(this.createForm);
        nextTick(() => {
          this.$toast.success(response.data.message);
        });
        this.showCreateModal = false;
        this.createForm.points = '';
        useAuthStore().fetchUser();
        this.fetchPointsHistory();
      } catch (error) {
        this.$toast.error(error.response.data.message);
      }
    },

    async confirmDonate() {
      try {
        const response = await userPointsService.donatePoints(this.createForm);
        nextTick(() => {
          this.$toast.success(response.data.message);
        });
        this.showDonateModal = false;
        this.createForm.points = '';
        useAuthStore().fetchUser();
        this.fetchPointsHistory();
      } catch (error) {
        this.$toast.error(error.response.data.message);
      }
    },

    async fetchPointsHistory() {
      try {
        const user = await userPointsService.getPoints();
        this.points = user.data.points || user.data;
      } catch (error) {
        this.$toast.error(error?.response?.data.message || 'Failed to fetch points history.');
      }
    },
  },
  mounted() {
    this.fetchPointsHistory();
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
  background-color: rgb(41, 41, 41)!important;
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
