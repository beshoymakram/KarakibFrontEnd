<template>
  <div class="bg-white rounded-lg shadow-sm p-4 mb-6" :dir="$i18n.locale === 'ar' ? 'rtl' : 'ltr'">
    <div class="flex flex-wrap items-center gap-4">
      <div class="relative">
        <button @click="openCreateModal()"
          class="relative inline-flex items-center gap-x-1.5 mx-3 rounded-md cursor-pointer bg-[#2C702C] px-3 py-2 text-sm font-semibold text-white shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2C702C]">
          {{ $t('common.createNewProduct') }}
        </button>
      </div>

      <div class="relative">
        <select v-model="filters.waste_type_id"
          class="px-4 py-2 pr-8 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2C702C] focus:border-transparent appearance-none bg-white">
          <option value="">{{ $t('common.allTypes') }}</option>
          <option v-for="type in types" :key="type.id" :value="type.id">{{ type.name }}</option>
        </select>
        <span class="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">▼</span>
      </div>

      <div class="relative">
        <select v-model="filters.unit"
          class="px-4 py-2 pr-8 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2C702C] focus:border-transparent appearance-none bg-white">
          <option value="">All Units</option>
          <option value="kg">KG</option>
          <option value="piece">By Piece</option>
        </select>
        <span class="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">▼</span>
      </div>

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

  <div class="bg-white rounded-lg shadow-sm overflow-hidden">
    <div class="overflow-x-auto">
      <table class="w-full table-auto">
        <thead class="bg-gray-50 border-b border-gray-200">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-start">Name
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-start">Type
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-start">Points
              per unit
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-start">Image
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-start">Action
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-if="filteredItems.length === 0">
            <td colspan="5" class="px-4 py-4 text-center text-gray-500">
              No results match your search
            </td>
          </tr>

          <tr v-for="item in filteredItems" :key="item.id" class="hover:bg-gray-50 transition-colors">
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#2C702C]">
              {{ item.name }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#2C702C]">
              {{ item.waste_type?.name }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#2C702C]">
              {{ item.points_per_unit }}/{{ item.unit }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-[#2C702C]">
              <img class="w-10 h-10 rounded-full" :src="item.image_url" :alt="item.name">
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm space-x-2">
              <button @click="openEditModal(item)"
                class="px-3 py-1 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition-colors">
                {{ $t('common.edit') }}
              </button>
              <button @click="openDeleteModal(item)"
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
              Are you sure you want to delete this item?
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
            <h3 class="text-xl font-semibold text-[#2C702C] dark:text-white">Create Item</h3>
            <button type="button" @click="showCreateModal = false"
              class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
              <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                viewBox="0 0 14 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
              </svg>
            </button>
          </div>

          <!-- Body -->
          <form @submit.prevent="confirmCreate" class="p-4 md:p-5 space-y-4">
            <!-- Name -->
            <div>
              <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
              <input type="text" id="name" v-model="createForm.name"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#2C702C] focus:border-[#2C702C] block w-full p-2.5"
                placeholder="Enter item name" required />
            </div>

            <!-- Type / Unit / Points per unit -->
            <div class="grid grid-cols-3 gap-4">
              <div>
                <label for="type" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Type</label>
                <select id="type" v-model="createForm.waste_type_id"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#2C702C] focus:border-[#2C702C] block w-full p-2.5"
                  required>
                  <option value="" disabled selected>Select type</option>
                  <option v-for="type in types" :key="type.id" :value="type.id">{{ type.name }}</option>
                </select>
              </div>

              <div>
                <label for="unit" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Unit</label>
                <select id="unit" v-model="createForm.unit"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#2C702C] focus:border-[#2C702C] block w-full p-2.5"
                  required>
                  <option value="" disabled selected>Select unit</option>
                  <option value="kg">KG</option>
                  <option value="piece">By Piece</option>
                </select>
              </div>

              <div>
                <label for="points_per_unit" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Points per unit
                </label>
                <input type="number" id="points_per_unit" v-model="createForm.points_per_unit"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#2C702C] focus:border-[#2C702C] block w-full p-2.5"
                  placeholder="Enter points" required />
              </div>
            </div>

            <div>
              <label for="image" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Image</label>
              <input type="file" id="image" @change="handleImageUpload" accept="image/*"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#2C702C] focus:border-[#2C702C] block w-full p-2.5"
                required />
            </div>

            <div class="flex justify-end space-x-3 pt-3">
              <button @click="showCreateModal = false" type="button"
                class="py-2.5 px-5 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-[#2C702C]">
                {{ $t('common.Cancel') }}
              </button>
              <button type="submit"
                class="text-white bg-[#2C702C] hover:bg-[#1a4d1a] focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5">
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
            <h3 class="text-xl font-semibold text-[#2C702C] dark:text-white">Edit Item</h3>
            <button type="button" @click="showEditModal = false"
              class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
              <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                viewBox="0 0 14 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
              </svg>
            </button>
          </div>

          <form @submit.prevent="confirmEdit" class="p-4 md:p-5 space-y-4">
            <!-- Name -->
            <div>
              <label for="edit-name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
              <input type="text" id="edit-name" v-model="editForm.name"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#2C702C] focus:border-[#2C702C] block w-full p-2.5"
                placeholder="Enter item name" required />
            </div>

            <!-- Type / Unit / Points per unit -->
            <div class="grid grid-cols-3 gap-4">
              <div>
                <label for="edit-type" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Type</label>
                <select id="edit-type" v-model="editForm.waste_type_id"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#2C702C] focus:border-[#2C702C] block w-full p-2.5">
                  <option value="" disabled>Select type</option>
                  <option v-for="type in types" :key="type.id" :value="type.id">{{ type.name }}</option>
                </select>
              </div>

              <div>
                <label for="edit-unit" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Unit</label>
                <select id="edit-unit" v-model="editForm.unit"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#2C702C] focus:border-[#2C702C] block w-full p-2.5">
                  <option value="" disabled>Select unit</option>
                  <option value="kg">KG</option>
                  <option value="piece">By Piece</option>
                </select>
              </div>

              <div>
                <label for="edit-points" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Points per unit
                </label>
                <input type="number" id="edit-points" v-model="editForm.points_per_unit"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#2C702C] focus:border-[#2C702C] block w-full p-2.5"
                  placeholder="Enter points" />
              </div>
            </div>

            <!-- Image (full width) -->
            <div>
              <label for="edit-image" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Change
                Image (optional)</label>
              <input type="file" id="edit-image" @change="handleImageUpload" accept="image/*"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#2C702C] focus:border-[#2C702C] block w-full p-2.5" />
            </div>

            <!-- Current Image Preview -->
            <div v-if="editForm.image">
              <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Current Image</label>
              <img :src="editForm.image" class="w-20 h-20 rounded-lg object-cover" alt="Current image" />
            </div>

            <!-- Footer -->
            <div class="flex justify-end space-x-3 pt-3">
              <button @click="showEditModal = false" type="button"
                class="py-2.5 px-5 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-[#2C702C]">
                {{ $t('common.Cancel') }}
              </button>
              <button type="submit"
                class="text-white bg-[#2C702C] hover:bg-[#1a4d1a] focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5">
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
import wasteItemsService from '@/services/wasteItemsService';
import wasteTypesService from '@/services/wasteTypesService';
import { nextTick } from 'vue';

export default {
  name: 'WasteItems',

  data() {
    return {
      searchQuery: '',
      selectedItem: '',
      showDeleteModal: false,
      showEditModal: false,
      showCreateModal: false,
      imageFile: null,
      filters: {
        waste_type_id: '',
        unit: '',
      },
      createForm: {
        id: null,
        waste_type_id: '',
        points_per_unit: '',
        unit: '',
        name: '',
        image: '',
      },
      editForm: {
        id: null,
        waste_type_id: '',
        points_per_unit: '',
        unit: '',
        name: '',
        image: '',
      },

      items: [],
      types: []
    }
  },

  computed: {
    filteredItems() {
      let filtered = this.items;

      if (this.filters.waste_type_id) {
        filtered = filtered.filter(item =>
          item.waste_type_id === this.filters.waste_type_id
        );
      }

      if (this.filters.unit) {
        filtered = filtered.filter(item =>
          item.unit === this.filters.unit
        );
      }

      if (this.searchQuery) {
        filtered = filtered.filter(item =>
          item.name.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }

      return filtered;
    },


  },

  methods: {
    handleImageUpload(event) {
      this.imageFile = event.target.files[0];
    },
    openDeleteModal(item) {
      this.selectedItem = item.id;
      this.showDeleteModal = true;
    },

    openEditModal(item) {
      this.editForm = {
        id: item.id,
        name: item.name,
        unit: item.unit,
        waste_type_id: item.waste_type_id,
        points_per_unit: item.points_per_unit,
        image: item.image_url,
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
        formData.append('waste_type_id', this.createForm.waste_type_id);
        formData.append('points_per_unit', this.createForm.points_per_unit);
        formData.append('unit', this.createForm.unit);

        if (this.imageFile) {
          formData.append('image', this.imageFile);
        }
        const response = await wasteItemsService.createItem(formData);
        nextTick(() => {
          this.$toast.success(response.data.message);
        });
        this.showCreateModal = false;
        this.fetchItems();
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
        formData.append('waste_type_id', this.editForm.waste_type_id);
        formData.append('points_per_unit', this.editForm.points_per_unit);
        formData.append('unit', this.editForm.unit);

        if (this.imageFile) {
          formData.append('image', this.imageFile);
        }
        const response = await wasteItemsService.postUpdateItem(this.editForm.id, formData);
        nextTick(() => {
          this.$toast.success(response.data.message);
        });
        this.showEditModal = false;
        this.fetchItems();
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

    async fetchItems() {
      try {
        const response = await wasteItemsService.getItems();
        this.items = response.data.data || response.data;
      } catch (error) {
        this.$toast.error(error.response.data.message);
      }
    },

    async confirmDelete() {
      try {
        const response = await wasteItemsService.deleteItem(this.selectedItem);
        nextTick(() => {
          this.$toast.success(response.data.message);
        });
        this.selectedItem = '';
        this.fetchItems();
        this.showDeleteModal = false;
      } catch (error) {
        this.$toast.error(error.response.data.message);
      }
    },

    editItem(item) {
      console.log('Edit item:', item);
    },

    deleteItem(item) {
      if (confirm(`Are you sure you want to delete ${item.name}?`)) {
        console.log('Delete item:', item);
      }
    }
  },
  mounted() {
    this.fetchTypes();
    this.fetchItems();
  }
}
</script>

<style scoped>
select {
  background-image: none;
}
</style>
