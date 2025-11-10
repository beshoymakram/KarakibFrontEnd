<template>
  <div class="bg-tabs rounded-lg shadow-sm p-4 mb-6" :dir="$i18n.locale === 'ar' ? 'rtl' : 'ltr'">
    <div class="flex flex-wrap items-center gap-4">
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

  <div class="bg-tabs rounded-lg shadow-sm overflow-hidden">
    <div class="overflow-x-auto">
      <table class="w-full table-auto">
        <thead class="bg-tabs border-b border-gray-200">
          <tr>
            <th class="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-start">{{
              $t('common.firstName') }}</th>
            <th class="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-start">{{
              $t('common.lastName') }}</th>
            <th class="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-start">{{
              $t('common.email') }}</th>
            <th class="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-start">{{
              $t('common.orderedDate') }}</th>
            <th class="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-start">{{
              $t('common.action') }}</th>
          </tr>
        </thead>
        <tbody class="bg-tabs divide-y divide-gray-200">
          <tr v-if="filteredInquiries.length === 0">
            <td colspan="5" class="px-4 py-4 text-center text-gray-500">
              {{ $t('common.noResultsMatchSearch') }}
            </td>
          </tr>

          <tr v-for="inquiry in filteredInquiries" :key="inquiry.id" class="transition-colors">
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-primary">
              {{ inquiry.first_name }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-primary">
              {{ inquiry.last_name }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-primary">
              {{ inquiry.email }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-primary">
              {{ inquiry.created_at }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm space-x-2">
              <button @click="openDetailsModal(inquiry)"
                class="px-3 py-1 border border-gray-300 rounded-md text-primary hover:bg-gray-100 transition-colors">
                {{ $t('common.details') }}
              </button>
              <button @click="openEditModal(inquiry)"
                class="px-3 py-1 border border-gray-300 rounded-md text-primary hover:bg-gray-100 transition-colors">
                {{ $t('common.edit') }}
              </button>
              <button @click="openDeleteModal(inquiry)"
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
              {{ $t('common.areYouSureDeleteInquiry') }}
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


    <div v-if="showDetailsModal" class="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/30"
      @click="showDetailsModal = false">
      <div class="relative p-4 w-full max-w-2xl" @click.stop>
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <!-- Header -->
          <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 class="text-xl font-semibold text-[#2C702C] dark:text-white">
              {{ $t('common.inquiryDetails') }} | {{ details.first_name + ' ' + details.last_name }}
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
                <h4 class="text-sm font-medium text-gray-500 dark:text-gray-300">{{ $t('common.firstName') }}</h4>
                <p class="mt-1 text-base font-semibold text-[#2C702C] dark:text-white break-words">
                  {{ details.first_name }}
                </p>
              </div>
              <div>
                <h4 class="text-sm font-medium text-gray-500 dark:text-gray-300">{{ $t('common.lastName') }}</h4>
                <p class="mt-1 text-base font-semibold text-[#2C702C] dark:text-white break-words">
                  {{ details.last_name }}
                </p>
              </div>
              <div>
                <h4 class="text-sm font-medium text-gray-500 dark:text-gray-300">{{ $t('common.email') }}</h4>
                <p class="mt-1 text-base font-semibold text-[#2C702C] dark:text-white break-words">
                  {{ details.email }}
                </p>
              </div>
              <div>
                <h4 class="text-sm font-medium text-gray-500 dark:text-gray-300">{{ $t('common.subject') }}</h4>
                <p class="mt-1 text-base font-semibold text-[#2C702C] dark:text-white break-words">
                  {{ details.subject }}
                </p>
              </div>
              <div>
                <h4 class="text-sm font-medium text-gray-500 dark:text-gray-300">{{ $t('common.message') }}</h4>
                <p class="mt-1 text-base font-semibold text-[#2C702C] dark:text-white break-words">
                  {{ details.message }}
                </p>
              </div>
              <div>
                <h4 class="text-sm font-medium text-gray-500 dark:text-gray-300">{{ $t('common.createdAt') }}</h4>
                <p class="mt-1 text-base font-semibold text-[#2C702C] dark:text-white">
                  {{ details.created_at }}
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

    <div v-if="showEditModal"
      class="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-black/30"
      @click="showEditModal = false">
      <div class="relative p-4 w-full max-w-2xl" @click.stop>
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <!-- Header -->
          <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 class="text-xl font-semibold text-[#2C702C] dark:text-white">
              {{ $t('common.editInquiry') }}
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
              <div>
                <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  {{ $t('common.firstName') }}
                </label>
                <input type="text" id="first_name" v-model="editForm.first_name"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#2C702C] focus:border-[#2C702C] block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  :placeholder="$t('common.firstName')" required />
              </div>
              <div>
                <label for="last_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  {{ $t('common.lastName') }}
                </label>
                <input type="text" id="last_name" v-model="editForm.last_name"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#2C702C] focus:border-[#2C702C] block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  :placeholder="$t('common.lastName')" required />
              </div>
              <div>
                <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  {{ $t('common.email') }}
                </label>
                <input type="text" id="email" v-model="editForm.email"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#2C702C] focus:border-[#2C702C] block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  :placeholder="$t('common.email')" required />
              </div>
              <div>
                <label for="subject" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  {{ $t('common.subject') }}
                </label>
                <input type="text" id="subject" v-model="editForm.subject"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#2C702C] focus:border-[#2C702C] block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  :placeholder="$t('common.subject')" required />
              </div>
              <div class="col-span-2">
                <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  {{ $t('common.message') }}
                </label>
                <textarea type="text" id="message" v-model="editForm.message"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#2C702C] focus:border-[#2C702C] block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  :placeholder="$t('common.message')" required></textarea>
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
import inquiriesService from '@/services/inquiriesService';
import { nextTick } from 'vue';

export default {
  name: 'Inquiries',

  data() {
    return {
      searchQuery: '',
      showDeleteModal: false,
      showEditModal: false,
      showDetailsModal: false,
      editForm: {
        id: null,
        first_name: '',
        last_name: '',
        email: '',
        subject: '',
        message: '',
        created_at: '',
      },
      details: {
        first_name: '',
        last_name: '',
        email: '',
        subject: '',
        message: '',
        created_at: '',
      },
      inquiries: [],
    }
  },

  computed: {
    filteredInquiries() {
      let filtered = this.inquiries;
      if (this.searchQuery) {
        filtered = filtered.filter(inquiry =>
          inquiry.first_name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          inquiry.last_name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          inquiry.email.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          inquiry.subject.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          inquiry.message.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          inquiry.created_at.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }

      return filtered;
    },


  },

  methods: {
    openDeleteModal(inquiry) {
      this.selectedInquiry = inquiry.id;
      this.showDeleteModal = true;
    },

    openEditModal(inquiry) {
      this.editForm = {
        id: inquiry.id,
        first_name: inquiry.first_name,
        last_name: inquiry.last_name,
        email: inquiry.email,
        subject: inquiry.subject,
        message: inquiry.message,
        created_at: inquiry.created_at,
      };
      this.showEditModal = true;
    },
    openDetailsModal(inquiry) {
      this.details = {
        first_name: inquiry.first_name,
        last_name: inquiry.last_name,
        email: inquiry.email,
        subject: inquiry.subject,
        message: inquiry.message,
        created_at: inquiry.created_at,
      };
      this.showDetailsModal = true;
    },

    async fetchInquiries() {
      try {
        const user = await inquiriesService.getInquiries();
        this.inquiries = user.data.orders || user.data;
      } catch (error) {
        this.$toast.error(error?.response?.data.message || 'Failed to fetch orders.');
      }
    },

    async confirmDelete() {
      try {
        const response = await inquiriesService.deleteInquiry(this.selectedInquiry);
        nextTick(() => {
          this.$toast.success(response.data.message);
        });
        this.selectedInquiry = '';
        this.fetchInquiries();
        this.showDeleteModal = false;
      } catch (error) {
        this.$toast.error(error.response.data.message);
      }
    },

    async confirmEdit() {
      try {
        const response = await inquiriesService.updateInquiry(this.editForm.id, this.editForm);
        nextTick(() => {
          this.$toast.success(response.data.message);
        });
        this.showEditModal = false;
        this.fetchInquiries();
      } catch (error) {
        this.$toast.error(error.response.data.message);
      }
    },
  },
  mounted() {
    this.fetchInquiries();
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
