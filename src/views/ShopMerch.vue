<template>
  <!-- head shop section -->
  <div class="relative px-8 pb-6">
    <!-- Gradient overlay at the TOP only -->
    <!-- Custom layered gradient overlay -->
    <div class="absolute inset-0 bg-gradient-to-b from-[#E9EBF8]/[0.9] via-[#E9EBF8]/[0.8] to-transparent" style="
        background: linear-gradient(
          to bottom,
          rgba(233, 235, 248, 0.8) 0%,
          rgba(233, 235, 248, 0.75) 50%,
          rgba(233, 235, 248, 0.7) 95%,
          rgba(233, 235, 248, 0) 100%
        );
      "></div>

    <!-- Background image -->
    <img src="/images/Shop Page Background.png" alt="Background"
      class="absolute inset-0 w-2xl h-sm object-cover -z-10 mx-auto" />

    <!-- content -->
    <div
      class="relative flex flex-col lg:flex-row items-center justify-between text-center lg:text-left gap-8 px-10 py-16 pb-24 z-2">
      <!-- Logo -->
      <img src="/logos/K.png" alt="Karakib Logo" class="w-48 lg:w-60 drop-shadow-lg flex-shrink-0" />

      <!-- Text -->
      <div class="text-[#2C702C] max-w-2xl flex-grow lg:max-w-6xl">
        <p class="text-xl lg:text-2xl font-bold leading-relaxed">
          Support Karakib’s mission by buying eco-friendly merchandise. <br />
          Every purchase funds our recycling and community projects.
        </p>
      </div>
    </div>

    <!-- links -->
  </div>
  <div class="px-16 relative z-20 flex flex-wrap gap-4 -mt-1">
    <a @click="selectedCategory = ''"
      class="rounded-md cursor-pointer bg-white text-[#112B11] px-4 py-3 font-semibold text-xl shadow-sm hover:bg-green-100">
      View all
    </a>
    <a v-for="category in categories" :key="category.id" @click="selectedCategory = category.id"
      class="rounded-md cursor-pointer text-[#112B11] px-4 py-3 font-semibold text-xl shadow-sm hover:bg-green-100">
      {{ category.name }}
    </a>
  </div>
  <!-- all merch sec -->

  <div>
    <h5 v-if="filteredProducts.length === 0" class="px-4 py-4 mx-auto text-gray-500 font-bold text-center">
      No products in this category
    </h5>
  </div>
  <div
    class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 justify-items-center justify-center py-14 px-3 lg:px-6">
   <div
  v-for="(product, index) in filteredProducts"
  :key="index"
  class="card bg-base-100 w-84 sm:w-72 md:w-80 shadow-sm hover:shadow-lg transition-transform duration-300"
>
  <router-link :to="{ name: 'product-desc', params: { id: product.id } }">
    <figure>
      <img :src="product.image_url" :alt="product.name" class="w-full size-75 bg-[#E0EBE0] object-fill" />
    </figure>
  </router-link>

  <div class="px-4 pt-2 pb-2">
    <div class="flex justify-between items-center w-full">
      <h2 class="text-[#2C702C] font-semibold text-xl">{{ product.name }}</h2>
      <p class="text-[#2C702C] font-semibold text-lg">{{ product.price }} EGP</p>
    </div>

    <p class="text-gray-600 text-sm">{{ product.description }}</p>

    <div class="flex items-center mt-1 justify-end">
      <button
        @click.stop="addToCart(product.id)"
        class="btn rounded-md bg-[#2C702C] text-white hover:bg-[#265C26] px-4 py-2 text-sm font-semibold"
      >
        Add to Cart
      </button>
    </div>
  </div>
</div>

  </div>
</template>

<script>
import productsCategoriesService from '@/services/productsCategoriesService';
import productsService from '@/services/productsService';
import { useCartStore } from '@/stores/cart';

export default {
  name: "shopPage",
  data() {
    return {
      selectedCategory: '',
      categories: [],
      products: []
    };
  },
  computed: {
    cartStore() {
      return useCartStore();
    },
    filteredProducts() {
      let filtered = this.products;

      if (this.selectedCategory) {
        filtered = filtered.filter(product =>
          product.category_id == this.selectedCategory)
      }

      return filtered;
    }
  },
  methods: {
    async addToCart(productId) {
      const success = await this.cartStore.addToCart(productId, 1);

      if (success) {
        this.$toast.success('Added to cart!');
      } else {
        this.$toast.error('Failed to add to cart');
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

    async fetchProducts() {
      try {
        const response = await productsService.getProducts();
        this.products = response.data.data || response.data;
      } catch (error) {
        this.$toast.error(error.response.data.message);
      }
    },
  },
  mounted() {
    this.fetchCategories();
    this.fetchProducts();
  }
};
</script>

<style scoped></style>
