<template>
  <div class="bg-tabs rounded-lg shadow-sm p-4 mb-6" :dir="$i18n.locale === 'ar' ? 'rtl' : 'ltr'">
    <div class="flex flex-wrap items-center gap-4">
      <div class="relative">
        <button @click="openCreateModal()"
           class="relative inline-flex items-center gap-x-1.5 mx-3 rounded-md cursor-pointer bg-[#2C702C] p-2 md:px-3 py-2 text-xs md:text-sm font-semibold text-white shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2C702C]">
           {{ $t('common.createNewType') }}
        </button>
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

  <div class="bg-white rounded-lg shadow-sm overflow-hidden">
    <div class="overflow-x-auto">
      <table class="w-full table-auto">
        <thead class="bg-tabs border-b border-gray-200">
          <tr>
            <th class="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-start">Name
            </th>
            <th class="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-start">Image
            </th>
            <th class="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-start">Action
            </th>
          </tr>
        </thead>
        <tbody class="bg-tabs divide-y divide-gray-200">
          <tr v-if="filteredTypes.length === 0">
            <td colspan="3" class="px-4 py-4 text-center text-primary">
              No results match your search
            </td>
          </tr>

          <tr v-for="type in filteredTypes" :key="type.id" class="transition-colors">
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-primary">
              {{ type.name }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-[#2C702C]">
              <img class="w-10 h-10 rounded-full" :src="type.image_url" :alt="type.name">
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm space-x-2">
              <button @click="openEditModal(type)"
                class="px-3 py-1 border border-gray-300 rounded-md text-primary hover:bg-gray-100 transition-colors">
                {{ $t('common.edit') }}
              </button>
              <button @click="openDeleteModal(type)"
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
              Are you sure you want to delete this type?
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
              Create type
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
                  Name
                </label>
                <input type="text" id="name" v-model="createForm.name"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#2C702C] focus:border-[#2C702C] block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder="Enter user name" required />
              </div>

              <!-- Image -->
              <div class="col-span-2">
                <label for="image" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Image
                </label>
                <input type="file" id="image" @change="handleImageUpload" accept="image/*"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#2C702C] focus:border-[#2C702C] block w-full p-2.5"
                  required />
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
              Edit User
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
                <label for="edit-name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Name
                </label>
                <input type="text" id="edit-name" v-model="editForm.name"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#2C702C] focus:border-[#2C702C] block w-full p-2.5"
                  placeholder="Enter type name" required />
              </div>

              <div>
                <label for="edit-image" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Change Image (optional)
                </label>
                <input type="file" id="edit-image" @change="handleImageUpload" accept="image/*"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#2C702C] focus:border-[#2C702C] block w-full p-2.5" />
              </div>

              <div v-if="editForm.image">
                <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Current Image
                </label>
                <img :src="editForm.image" class="w-20 h-20 rounded-lg object-cover mb-2" alt="Current image" />
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
import wasteTypesService from '@/services/wasteTypesService';
import { nextTick } from 'vue';

export default {
  name: 'WasteTypes',

  data() {
    return {
      searchQuery: '',
      selectedType: '',
      showDeleteModal: false,
      showEditModal: false,
      showCreateModal: false,
      imageFile: null,
      createForm: {
        id: null,
        name: '',
        image: '',
      },
      editForm: {
        id: null,
        name: '',
        image: '',
      },

      types: []
    }
  },

  computed: {
    filteredTypes() {
      let filtered = this.types;

      if (this.searchQuery) {
        filtered = filtered.filter(type =>
          type.name.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }

      return filtered;
    },


  },

  methods: {
    handleImageUpload(event) {
      this.imageFile = event.target.files[0];
    },
    openDeleteModal(type) {
      this.selectedType = type.id;
      this.showDeleteModal = true;
    },

    openEditModal(type) {
      this.editForm = {
        id: type.id,
        name: type.name,
        image: type.image_url,
      };
      this.showEditModal = true;
    },

    openCreateModal() {
      this.showCreateModal = true;
    },

    async confirmCreate() {
      try {
        const formData = new FormData();
        formData.append('name', this.createForm.name);

        if (this.imageFile) {
          formData.append('image', this.imageFile);
        }
        const response = await wasteTypesService.createType(formData);
        nextTick(() => {
          this.$toast.success(response.data.message);
        });
        this.showCreateModal = false;
        this.fetchTypes();
        this.imageFile = null;
        this.createForm.name = '';
      } catch (error) {
        this.$toast.error(error.response.data.message);
      }
    },

    async confirmEdit() {
      try {
        const formData = new FormData();
        formData.append('_method', 'PUT');
        formData.append('name', this.editForm.name);

        if (this.imageFile) {
          formData.append('image', this.imageFile);
        }
        const response = await wasteTypesService.postUpdateType(this.editForm.id, formData);
        nextTick(() => {
          this.$toast.success(response.data.message);
        });
        this.showEditModal = false;
        this.fetchTypes();
        this.imageFile = null;
        this.editForm.name = '';
      } catch (error) {
        this.$toast.error(error.response.data.message);
      }
    },


    async fetchTypes() {
      try {
        const response = await wasteTypesService.getTypes();
        this.types = response.data.data || response.data;
      } catch (error) {
        this.$toast.error(error.response.data.message);
      }
    },

    async confirmDelete() {
      try {
        const response = await wasteTypesService.deleteType(this.selectedType);
        nextTick(() => {
          this.$toast.success(response.data.message);
        });
        this.selectedType = '';
        this.fetchTypes();
        this.showDeleteModal = false;
      } catch (error) {
        this.$toast.error(error.response.data.message);
      }
    },

    editType(type) {
      console.log('Edit type:', type);
    },

    deleteType(type) {
      if (confirm(`Are you sure you want to delete ${type.name}?`)) {
        console.log('Delete type:', type);
      }
    }
  },
  mounted() {
    this.fetchTypes();
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
