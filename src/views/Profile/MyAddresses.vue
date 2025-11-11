<template>
    <div class="bg-item rounded-lg shadow-sm p-4 mb-6" :dir="$i18n.locale === 'ar' ? 'rtl' : 'ltr'">
      <div class="flex flex-wrap items-center gap-4">
        <div class="relative">
          <button @click="openCreateModal()"
            class="relative inline-flex items-center gap-x-1.5 mx-3 rounded-md cursor-pointer bg-[#2C702C] p-2 md:px-3 py-2 text-xs md:text-sm font-semibold text-white shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2C702C]">
            {{ $t('common.createNewAddress') }}
          </button>
        </div>

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

    <div class="bg-item shadow-sm overflow-hidden  rounded-lg">
      <div class="bg-item overflow-x-auto ">
        <table class=" bg-item w-full table-auto  mx-auto  ">
          <thead class=" border-b border-gray-200 ">
            <tr class="">
              <th class="px-6 md:px:8 py-3  text-xs text-center font-medium text-section uppercase tracking-wider">{{
                $t('common.name') }}</th>
              <th class="px-6 md:px:8 py-3 text-center text-xs font-medium text-section uppercase tracking-wider">{{
                $t('common.phone') }}</th>
              <th class="px-6 md:px:8 py-3 text-center text-xs font-medium text-section uppercase tracking-wider">{{
                $t('common.streetAddress') }}
              </th>
              <th class="px-6 md:px:8 py-3 text-center text-xs font-medium text-section uppercase tracking-wider">{{
                $t('common.city') }}</th>
              <th class="px-6 md:px:8 py-3 text-center text-xs font-medium text-section uppercase tracking-wider">{{
                $t('common.action') }}</th>
            </tr>
          </thead>
          <tbody class=" divide-y divide-gray-200 rounded-b-lg">
            <tr v-if="filteredAddresses.length === 0">
              <td colspan="5" class="px-4 py-4 text-center text-section">
                {{ $t('common.noResultsMatchSearch') }}
              </td>
            </tr>

            <tr v-for="address in filteredAddresses" :key="address.id" class="transition-colors ">
              <td class="px-6 py-4 whitespace-nowrap text-sm text-center font-medium text-primary">
                {{ address.name }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-center font-medium text-primary">
                {{ address.phone }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-center font-medium text-primary">
                {{ address.street_address }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-center font-medium text-primary">
                {{ address.city }}
              </td>
              <td class=" px-6 py-4 whitespace-nowrap text-sm space-x-2 mx-auto items-center justify-center flex">
                <button @click="openEditModal(address)"
                  class="px-3 py-1 border border-gray-300 rounded-md text-primary hover:bg-gray-100 transition-colors cursor-pointer">
                  {{ $t('common.edit') }}
                </button>
                <button @click="openDeleteModal(address)"
                  class="px-3 py-1 border border-red-300 rounded-md text-red-600 hover:bg-red-50 transition-colors cursor-pointer">
                  {{ $t('common.delete') }}
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>

  <Teleport to="body">
    <div v-if="showDeleteModal"
      class="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-black/30"
      @click="showDeleteModal = false">
      <div class="relative p-4 w-full max-w-md" @click.stop>
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <button type="button" @click="showDeleteModal = false"
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
              {{ $t('common.areYouSureDeleteAddress') }}
            </h3>
            <button @click="confirmDelete" type="button"
              class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center">
              {{ $t("common.YesSure") }}
            </button>
            <button @click="showDeleteModal = false" type="button"
              class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
              {{ $t('common.No, Cancel') }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <div v-if="showCreateModal"
      class="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-black/30"
      @click="showCreateModal = false">
      <div class="relative p-4 w-full max-w-2xl" @click.stop>
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <!-- Header -->
          <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 class="text-xl font-semibold text-[#2C702C] dark:text-white">
              {{ $t('common.createAddress') }}
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
          <form @submit.prevent="confirmCreate" class="p-4 md:p-5">
            <div class="grid gap-4 mb-4 grid-cols-2">
              <!-- Name -->
              <div class="col-span-2">
                <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  {{ $t('common.fullName') }}
                </label>
                <input type="text" id="name" v-model="createForm.name"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#2C702C] focus:border-[#2C702C] block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder="Enter user name" required />
              </div>
              <div class="col-span-2">
                <label for="phone" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  {{ $t('common.phone') }}
                </label>
                <input type="text" id="phone" v-model="createForm.phone"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#2C702C] focus:border-[#2C702C] block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder="Enter user phone" required />
              </div>
              <div class="col-span-2">
                <label for="street_address" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  {{ $t('common.streetAddress') }}
                </label>
                <input type="text" id="street_address" v-model="createForm.street_address"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#2C702C] focus:border-[#2C702C] block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder="Enter user street_address" required />
              </div>
              <div class="col-span-2">
                <label for="city" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  City
                </label>
                <input type="text" id="city" v-model="createForm.city"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#2C702C] focus:border-[#2C702C] block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder="Enter user city" required />
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

    <div v-if="showEditModal"
      class="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-black/30"
      @click="showEditModal = false">
      <div class="relative p-4 w-full max-w-2xl" @click.stop>
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <!-- Header -->
          <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 class="text-xl font-semibold text-[#2C702C] dark:text-white">
              {{ $t('common.editAddress') }}
            </h3>
            <button type="button" @click="showEditModal = false"
              class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
              <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                viewBox="0 0 14 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
              </svg>
              <span class="sr-only">Close modal</span>
            </button>
          </div>

          <form @submit.prevent="confirmEdit" class="p-4 md:p-5">
            <div class="grid gap-4 mb-4">
              <!-- Name -->
              <div class="col-span-2">
                <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  {{ $t('common.fullName') }}
                </label>
                <input type="text" id="name" v-model="editForm.name"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#2C702C] focus:border-[#2C702C] block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder="Enter user name" required />
              </div>
              <div class="col-span-2">
                <label for="phone" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  {{ $t('common.phone') }}
                </label>
                <input type="text" id="phone" v-model="editForm.phone"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#2C702C] focus:border-[#2C702C] block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder="Enter user phone" required />
              </div>
              <div class="col-span-2">
                <label for="street_address" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  {{ $t('common.streetAddress') }}
                </label>
                <input type="text" id="street_address" v-model="editForm.street_address"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#2C702C] focus:border-[#2C702C] block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder="Enter user street_address" required />
              </div>
              <div class="col-span-2">
                <label for="city" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  City
                </label>
                <input type="text" id="city" v-model="editForm.city"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#2C702C] focus:border-[#2C702C] block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder="Enter user city" required />
              </div>
            </div>

            <!-- Footer Buttons -->
            <div class="flex justify-end space-x-3">
              <button @click="showEditModal = false" type="button"
                class="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-[#2C702C]">
                {{ $t('common.Cancel') }}
              </button>
              <button type="submit"
                class="text-white bg-[#2C702C] hover:bg-[#1a4d1a] focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
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
import profileService from '@/services/profileService';
import { nextTick } from 'vue';

export default {
  name: 'MyAddresses',

  data() {
    return {
      searchQuery: '',
      selectedType: '',
      showDeleteModal: false,
      showEditModal: false,
      showCreateModal: false,
      createForm: {
        id: null,
        name: '',
        phone: '',
        street_address: '',
        city: '',
      },
      editForm: {
        id: null,
        name: '',
        phone: '',
        street_address: '',
        city: '',
      },

      addresses: []
    }
  },

  computed: {
    filteredAddresses() {
      let filtered = this.addresses;

      if (this.searchQuery) {
        filtered = filtered.filter(address =>
          address.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          address.street_address.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          address.phone.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          address.city.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }

      return filtered;
    },


  },

  methods: {
    openDeleteModal(address) {
      this.selectedAddress = address.id;
      this.showDeleteModal = true;
    },

    openEditModal(address) {
      this.editForm = {
        id: address.id,
        name: address.name,
        city: address.city,
        phone: address.phone,
        street_address: address.street_address,
      };
      this.showEditModal = true;
    },

    openCreateModal() {
      this.showCreateModal = true;
    },

    async confirmCreate() {
      try {
        const response = await profileService.createAddress(this.createForm);
        nextTick(() => {
          this.$toast.success(response.data.message);
        });
        this.showCreateModal = false;
        this.createForm.name = '';
        this.createForm.phone = '';
        this.createForm.street_address = '';
        this.createForm.city = '';
        this.fetchAddresses();
      } catch (error) {
        this.$toast.error(error.response.data.message);
      }
    },

    async confirmEdit() {
      try {
        const response = await profileService.updateAddress(this.editForm.id, this.editForm);
        nextTick(() => {
          this.$toast.success(response.data.message);
        });
        this.showEditModal = false;
        this.editForm.name = '';
        this.editForm.phone = '';
        this.editForm.street_address = '';
        this.editForm.city = '';
        this.fetchAddresses();
      } catch (error) {
        this.$toast.error(error.response.data.message);
      }
    },


    async fetchAddresses() {
      try {
        const user = await profileService.getAddresses();
        this.addresses = user.data.addresses || user.data;
      } catch (error) {
        this.$toast.error(error?.response?.data.message || 'Failed to fetch addresses.');
      }
    },

    async confirmDelete() {
      try {
        const response = await profileService.deleteAddress(this.selectedAddress);
        nextTick(() => {
          this.$toast.success(response.data.message);
        });
        this.selectedAddress = '';
        this.fetchAddresses();
        this.showDeleteModal = false;
      } catch (error) {
        this.$toast.error(error.response.data.message);
      }
    },
  },
  mounted() {
    this.fetchAddresses();
  }
}
</script>

<style scoped>
select {
  background-image: none;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  line-clamp: 2;
  /* Standard property for future compatibility */
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
  color: #1d491d !important;
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

.bg-prod {
  background-color: #BFD6BF;
}

[data-theme="forest"] .bg-prod {
  background-color: #4b4a4a;
}

.bg-item {
  background-color: #FFFFFF;
}

[data-theme="forest"] .bg-item {
  background-color: #393636;
}
</style>
