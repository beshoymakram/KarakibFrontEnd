<template>
  <div class="bg-tabs rounded-lg shadow-sm p-4 mb-6" :dir="$i18n.locale === 'ar' ? 'rtl' : 'ltr'">
    <div class="flex flex-wrap items-center gap-4">
      <div class="relative">
        <button @click="openCreateModal()"
          class="relative inline-flex items-center gap-x-1.5 mx-3 rounded-md cursor-pointer bg-[#2C702C] px-3 py-2 text-sm font-semibold text-white shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2C702C]">
          {{ $t('common.createNewProduct') }}
        </button>
      </div>

      <div class="relative">
        <select v-model="filters.category_id"
          class="px-4 py-2 pr-8 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2C702C] focus:border-transparent appearance-none bg-tabs">
          <option value="">{{ $t('common.allTypes') }}</option>
          <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}</option>
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

  <div class="bg-tabs rounded-lg shadow-sm overflow-hidden">
    <div class="overflow-x-auto">
      <table class="w-full table-auto">
        <thead class="bg-tabs border-b border-gray-200">
          <tr>
            <th class="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-start">{{
              $t('common.name') }}</th>
            <th class="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-start">{{
              $t('common.category') }}</th>
            <th class="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-start">{{
              $t('common.price') }}</th>
            <th class="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-start">{{
              $t('common.stock') }}</th>
            <th class="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-start">{{
              $t('common.image') }}</th>
            <th class="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-start">{{
              $t('common.action') }}</th>
          </tr>
        </thead>
        <tbody class="bg-tabs divide-y divide-gray-200">
          <tr v-if="filteredProducts.length === 0">
            <td colspan="6" class="px-4 py-4 text-center text-gray-500">
              {{ $t('common.noResultsMatchSearch') }}
            </td>
          </tr>

          <tr v-for="product in filteredProducts" :key="product.id" class="transition-colors">
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-primary">
              {{ product.name }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-primary">
              {{ product.category?.name }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-primary">
              {{ product.price }} {{ $t('common.currency') }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-primary">
              {{ product.stock }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-[#2C702C]">
              <img class="w-10 h-10 rounded-full" :src="product.image_url" :alt="product.name">
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm space-x-2">
              <button @click="openEditModal(product)"
                class="px-3 py-1 border border-gray-300 rounded-md text-primary hover:bg-gray-100 transition-colors">
                {{ $t('common.edit') }}
              </button>
              <button @click="openDeleteModal(product)"
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
              {{ $t('common.areYouSureDeleteProduct') }}
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
              {{ $t('common.createProduct') }}
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
              <div>
                <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  {{ $t('common.name') }}
                </label>
                <input type="text" id="name" v-model="createForm.name"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#2C702C] focus:border-[#2C702C] block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  :placeholder="$t('common.enterUserName')" required />
              </div>
              <div>
                <label for="type" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{
                  $t('common.category') }}</label>
                <select id="type" v-model="createForm.category_id"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#2C702C] focus:border-[#2C702C] block w-full p-2.5"
                  required>
                  <option value="" disabled selected>{{ $t('common.selectCategory') }}</option>
                  <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}
                  </option>
                </select>
              </div>

              <div class="col-span-2">
                <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  {{ $t('common.description') }}
                </label>
                <textarea type="text" id="description" v-model="createForm.description"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#2C702C] focus:border-[#2C702C] block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  :placeholder="$t('common.enterDescription')" required></textarea>
              </div>

              <div>
                <label for="price" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  {{ $t('common.price') }}
                </label>
                <input type="number" id="price" v-model="createForm.price"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#2C702C] focus:border-[#2C702C] block w-full p-2.5"
                  :placeholder="$t('common.enterPrice')" required />
              </div>

              <div>
                <label for="stock" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  {{ $t('common.stock') }}
                </label>
                <input type="number" id="stock" v-model="createForm.stock"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#2C702C] focus:border-[#2C702C] block w-full p-2.5"
                  :placeholder="$t('common.enterStock')" required />
              </div>

              <!-- Image -->
              <div class="col-span-2">
                <label for="image" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  {{ $t('common.image') }}
                </label>
                <input type="file" id="image" @change="handleImageUpload" accept="image/*"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#2C702C] focus:border-[#2C702C] block w-full p-2.5"
                  required />
              </div>

              <div>
                <label for="has_sizes" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  {{ $t('common.has_sizes?') }}
                </label>
                <div class="flex">

                  <input type="checkbox" id="has_sizes" v-model="createForm.has_sizes" :true-value="1" :false-value="0"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#2C702C] focus:border-[#2C702C] block p-2.5" /><small
                    class="px-2">{{ $t('common.yes') }}</small>
                </div>
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
                {{ $t('common.createProduct') }}
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
              {{ $t('common.editProduct') }}
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
                <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Name
                </label>
                <input type="text" id="name" v-model="editForm.name"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#2C702C] focus:border-[#2C702C] block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder="Enter user name" required />
              </div>
              <div>
                <label for="type" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
                <select id="type" v-model="editForm.category_id"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#2C702C] focus:border-[#2C702C] block w-full p-2.5"
                  required>
                  <option value="" disabled selected>Select category</option>
                  <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}
                  </option>
                </select>
              </div>

              <div class="col-span-2">
                <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Description
                </label>
                <textarea type="text" id="description" v-model="editForm.description"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#2C702C] focus:border-[#2C702C] block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder="Enter description" required></textarea>
              </div>

              <div>
                <label for="price" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Price
                </label>
                <input type="number" id="price" v-model="editForm.price"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#2C702C] focus:border-[#2C702C] block w-full p-2.5"
                  placeholder="Enter price" required />
              </div>

              <div>
                <label for="stock" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Stock
                </label>
                <input type="number" id="stock" v-model="editForm.stock"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#2C702C] focus:border-[#2C702C] block w-full p-2.5"
                  placeholder="Enter stock" required />
              </div>


              <div class="col-span-2">
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

              <div>
                <label for="has_sizes" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  {{ $t('common.has_sizes?') }}
                </label>
                <div class="flex">

                  <input type="checkbox" id="has_sizes" v-model="editForm.has_sizes" :true-value="1" :ffalse-value="0"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#2C702C] focus:border-[#2C702C] block p-2.5" /><small
                    class="px-2">{{ $t('common.yes') }}</small>
                </div>
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
import productsCategoriesService from '@/services/productsCategoriesService';
import productsService from '@/services/productsService';
import { nextTick } from 'vue';

export default {
  name: 'Products',

  data() {
    return {
      searchQuery: '',
      selectedProduct: '',
      showDeleteModal: false,
      showEditModal: false,
      showCreateModal: false,
      imageFile: null,
      filters: {
        category_id: '',
      },
      createForm: {
        id: null,
        name: '',
        category_id: '',
        description: '',
        price: '',
        stock: '',
        has_sizes: false,
        image: '',
      },
      editForm: {
        id: null,
        name: '',
        category_id: '',
        description: '',
        price: '',
        stock: '',
        has_sizes: false,
        image: '',
      },
      products: [],
      categories: []
    }
  },

  computed: {
    filteredProducts() {
      let filtered = this.products;

      if (this.filters.category_id) {
        filtered = filtered.filter(item =>
          item.category_id === this.filters.category_id
        );
      }

      if (this.searchQuery) {
        filtered = filtered.filter(product =>
          product.name.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }

      return filtered;
    },


  },

  methods: {
    handleImageUpload(event) {
      this.imageFile = event.target.files[0];
    },
    openDeleteModal(product) {
      this.selectedProduct = product.id;
      this.showDeleteModal = true;
    },

    openEditModal(product) {
      this.editForm = {
        id: product.id,
        name: product.name,
        category_id: product.category_id,
        description: product.description,
        price: product.price,
        stock: product.stock,
        has_sizes: product.has_sizes,
        image: product.image_url,
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
        formData.append('category_id', this.createForm.category_id);
        formData.append('description', this.createForm.description);
        formData.append('price', this.createForm.price);
        formData.append('stock', this.createForm.stock);
        formData.append('has_sizes', this.createForm.has_sizes);

        if (this.imageFile) {
          formData.append('image', this.imageFile);
        }
        const response = await productsService.createProduct(formData);
        nextTick(() => {
          this.$toast.success(response.data.message);
        });
        this.showCreateModal = false;
        this.fetchProducts();
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
        formData.append('category_id', this.editForm.category_id);
        formData.append('description', this.editForm.description);
        formData.append('price', this.editForm.price);
        formData.append('stock', this.editForm.stock);
        formData.append('has_sizes', this.editForm.has_sizes);

        if (this.imageFile) {
          formData.append('image', this.imageFile);
        }
        const response = await productsService.postUpdateProduct(this.editForm.id, formData);
        nextTick(() => {
          this.$toast.success(response.data.message);
        });
        this.showEditModal = false;
        this.fetchProducts();
        this.imageFile = null;
        this.editForm.name = '';
      } catch (error) {
        this.$toast.error(error.response.data.message);
      }
    },


    async fetchProducts() {
      try {
        const response = await productsService.getProducts();
        this.products = response.data.data || response.data;
      } catch (error) {
        this.$toast.error(error.response.data.message);
      }
    },

    async fetchCategories() {
      try {
        const response = await productsCategoriesService.getCategories();
        this.categories = response.data.data || response.data;
      } catch (error) {
        this.$toast.error(error.response.data.message);
      }
    },

    async confirmDelete() {
      try {
        const response = await productsService.deleteProduct(this.selectedProduct);
        nextTick(() => {
          this.$toast.success(response.data.message);
        });
        this.selectedProduct = '';
        this.fetchProducts();
        this.showDeleteModal = false;
      } catch (error) {
        this.$toast.error(error.response.data.message);
      }
    },

    editProduct(product) {
      console.log('Edit product:', product);
    },

    deleteProduct(product) {
      if (confirm(`Are you sure you want to delete ${product.name}?`)) {
        console.log('Delete product:', product);
      }
    }
  },
  mounted() {
    this.fetchProducts();
    this.fetchCategories();
  },
  watch: {
    'createForm.has_sizes'(val) {
      this.createForm.has_sizes = val ? 1 : 0;
    },
    'editForm.has_sizes'(val) {
      this.editForm.has_sizes = val ? 1 : 0;
    }
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
