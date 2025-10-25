<template>
  <!-- head shop section -->
  <div class="relative px-4 sm:px-6 md:px-8 pb-0 md:pb-2">
    <!-- Custom layered gradient overlay -->
    <div
      class="absolute inset-0 bg-gradient-to-b from-[#E9EBF8]/[0.9] via-[#E9EBF8]/[0.8] to-transparent"
      style="
        background: linear-gradient(
          to bottom,
          rgba(233, 235, 248, 0.8) 0%,
          rgba(233, 235, 248, 0.75) 50%,
          rgba(233, 235, 248, 0.7) 95%,
          rgba(233, 235, 248, 0) 100%
        );
      "
    ></div>

    <!-- Background image -->
    <img
      src="/images/Shop Page Background.png"
      alt="Background"
      class="absolute inset-0 w-lg object-cover -z-10 mx-auto"
    />

    <!-- content -->
    <div
      class="relative flex flex-col lg:flex-row items-center justify-around text-center lg:text-left gap-6 md:gap-8 px-4 sm:px-6 md:px-10 py-12 md:py-16 lg:py-20 z-2"
    >
      <!-- Logo -->
      <img
        src="/logos/K.png"
        alt="Karakib Logo"
        class="w-32 sm:w-36 md:w-40 lg:w-48 drop-shadow-lg flex-shrink-0"
      />

      <!-- Text -->

      <p
        class="max-w-2xl text-lg sm:text-xl md:text-2xl lg:text-3xl text-[#2C702C] font-semibold leading-relaxed text-center lg:max-w-fit"
      >
        {{ $t("common.supportKarakibMission") }}
      </p>
    </div>
  </div>

  <!-- links -->
  <div
    class="px-4 sm:px-6 md:px-12 lg:px-16 relative z-20 flex flex-wrap gap-3 md:gap-4 -mt-1 mb-6 md:mb-8"
  >
    <a
      @click="selectedCategory = ''"
      class="rounded-md cursor-pointer text-[#112B11] px-3 sm:px-4 py-2 md:py-3 font-semibold text-xl shadow-sm transition-colors duration-300"
      :class="{
        'bg-[#2C702C] text-white': selectedCategory === '',
        'bg-white text-[#112B11] hover:bg-green-100': selectedCategory !== '',
      }"
    >
      {{ $t("common.viewAll") }} </a
    ><a
      v-for="category in categories"
      :key="category.id"
      @click="selectedCategory = category.id"
      class="rounded-md cursor-pointer text-[#112B11] px-3 sm:px-4 py-2 md:py-3 font-semibold text-xl shadow-sm transition-colors duration-300"
      :class="{
        'bg-[#2C702C] text-white': selectedCategory === category.id,
        'bg-white text-[#112B11] hover:bg-green-100': selectedCategory !== category.id,
      }"
    >
      {{ category.name }}
    </a>
  </div>

  <!-- all merch sec -->

  <div>
    <h5
      v-if="filteredProducts.length === 0"
      class="px-4 text-base sm:text-lg md:text-xl text-gray-500 font-bold text-center"
    >
      {{ $t("common.noProductsInCategory") }}
    </h5>
  </div>
  <div
    class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 justify-items-center py-8 md:py-12 lg:py-16 px-4 sm:px-6 md:px-8 lg:px-12"
  >
    <div
      v-for="(product, index) in filteredProducts"
      :key="index"
      class="card bg-base-100 w-full max-w-xs shadow-sm hover:shadow-lg transition-transform duration-300 rounded-xl"
    >
      <router-link :to="{ name: 'product-desc', params: { id: product.id } }">
        <figure>
          <img
            :src="product.image_url"
            :alt="product.name"
            class="h-64 sm:h-72 md:h-80 bg-[#E0EBE0] object-cover rounded-t-xl"
          />
        </figure>
      </router-link>

      <div class="px-4 pt-3 pb-3">
        <div class="flex justify-between items-center w-full mb-2">
          <h2 class="text-[#2C702C] font-semibold text-base sm:text-lg md:text-xl">
            {{ product.name }}
          </h2>
          <p
            class="text-[#2C702C] font-semibold text-sm sm:text-base md:text-lg whitespace-nowrap ml-2"
          >
            {{ product.price }} {{ $t("common.currency") }}
          </p>
        </div>

        <p class="text-gray-600 text-xs sm:text-sm mb-3">{{ product.description }}</p>

        <div class="flex items-center justify-end">
          <button
            v-if="product.stock > 0"
            @click.stop="addToCart(product.id)"
            class="btn rounded-md bg-[#2C702C] text-white hover:bg-[#265C26] px-3 md:px-4 py-2 text-xs sm:text-sm font-semibold"
          >
            {{ $t("common.addToCart") }}
          </button>
          <button
            v-if="product.stock < 1"
            class="btn rounded-md bg-gray-500 text-white hover:bg-[#265C26] px-3 md:px-4 py-2 text-xs sm:text-sm font-semibold"
            disabled
          >
            {{ $t("common.outOfStock") }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import productsCategoriesService from "@/services/productsCategoriesService";
import productsService from "@/services/productsService";
import { useCartStore } from "@/stores/cart";
import { useLoadingStore } from "@/stores/loading";
export default {
  name: "shopPage",
  data() {
    return {
      selectedCategory: "",
      categories: [],
      products: [],
      loadingStore: useLoadingStore(),
    };
  },
  computed: {
    cartStore() {
      return useCartStore();
    },
    filteredProducts() {
      let filtered = this.products;

      if (this.selectedCategory) {
        filtered = filtered.filter((product) => product.category_id == this.selectedCategory);
      }

      return filtered;
    },
  },
  methods: {
    async addToCart(productId) {
      const success = await this.cartStore.addToCart(productId, 1, "product");

      if (success) {
        this.$toast.success("Added to cart!");
      } else {
        this.$toast.error("Failed to add to cart");
      }
    },

    async fetchCategories() {
      try {
        this.loadingStore.show();
        const response = await productsCategoriesService.getCategories();
        this.categories = response.data.data || response.data;
      } catch (error) {
        this.$toast.error(error.response.data.message);
      } finally {
        this.loadingStore.hide();
      }
    },

    async fetchProducts() {
      try {
        this.loadingStore.show();
        const response = await productsService.getProducts();
        this.products = response.data.data || response.data;
      } catch (error) {
        this.$toast.error(error.response.data.message);
      } finally {
        this.loadingStore.hide();
      }
    },
  },
  mounted() {
    this.fetchCategories();
    this.fetchProducts();
  },
};
</script>

<style scoped></style>
