<template>
  <!-- head shop section -->
  <div class="relative px-4 sm:px-6 md:px-8 pb-2 sm:pb-12  l  ">
    <!-- Custom layered gradient overlay -->
  <div
    class="absolute inset-0"
    :style="{
      background:
        theme === 'forest'
          ? 'linear-gradient(to bottom, rgba(17,17,17,0.9) 0%, rgba(17,17,17,0.8) 50%, rgba(17,17,17,0.7) 95%, rgba(17,17,17,0) 100%)'
          : 'linear-gradient(to bottom, rgba(233,235,248,0.8) 0%, rgba(233,235,248,0.75) 50%, rgba(233,235,248,0.7) 95%, rgba(233,235,248,0) 100%)',
    }"
  ></div>

    <!-- Background image -->
    <img
      src="/images/Shop Page Background.png"
      alt="Background"
      class="absolute inset-0 w-xs sm:w-sm md:w-md lg:w-lg object-cover -z-10 mx-auto"
    />

    <!-- content -->
    <div
      class="relative flex flex-col sm:flex-row items-center justify-center text-center lg:text-left gap-6 md:gap-8 px-4 sm:px-6 md:px-10 py-8 md:py-12 lg:py-16 z-2"
    >
      <!-- Logo -->
      <img
        src="/logos/K.png"
        alt="Karakib Logo"
        class="w-28 sm:w-32 md:w-36 lg:w-40 xl:w-44 drop-shadow-lg shrink-0"
      />

      <!-- Text -->

      <p
        class="max-w-6xl text-base sm:text-lg md:text-2xl lg:text-3xl text-primary font-semibold leading-relaxed  lg:max-w-fit"
      >
        {{ $t("common.supportKarakibMission") }}
      </p>
    </div>
  </div>

  <!-- links -->
  <div
    class="px-4 sm:px-6 md:px-12 lg:px-16 relative z-20 flex flex-wrap gap-3 md:gap-4 -mt-5 mb-2 md:mb-4"
  >
    <a
      @click="selectedCategory = ''"
      class="rounded-md cursor-pointer text-[#112B11] px-2 sm:px-3 py-1 md:py-2 font-semibold text-md md:text-lg shadow-sm transition-colors duration-300"
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
      class="rounded-md cursor-pointer text-[#112B11] px-2 sm:px-3 py-1 md:py-2 font-semibold text-md md:text-lg shadow-sm transition-colors duration-300"
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
      class="px-4 text-base sm:text-lg md:text-xl lg:text-2xl text-gray-500 font-bold text-center"
    >
      {{ $t("common.noProductsInCategory") }}
    </h5>
  </div>

  <div
    class="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 md:gap-6 justify-items-center py-8 md:py-12 lg:py-16 px-4 sm:px-6 md:px-8 lg:px-12"
  >
    <div
      v-for="(product, index) in filteredProducts"
      :key="index"
      class="card bg-primary w-full max-w-xs shadow-sm hover:shadow-lg transition-transform duration-300"
    >
      <!-- ROUTER LINK - navigate to product description -->
      <router-link :to="{ name: 'product-desc', params: { id: product.id } }" class="block rounded-t-xl">
        <figure>
          <img
            :src="product.image_url"
            :alt="product.name"
            class="w-full h-56 sm:h-62 md:h-74 bg-[#E0EBE0] object-contain  hover:opacity-90 rounded-t-xl"
          />
        </figure>

        <div class="px-3 pt-3 pb-2">
          <div class="flex justify-between flex-col  md:flex-row md:items-center w-full md:mb-1">
            <h2 class="text-primary font-semibold sm:text-base md:text-lg lg:text-xl">
              {{ product.name }}
            </h2>
            <p class="text-primary font-semibold text-sm sm:text-sm md:text-base  lg:text-lg">
              {{ product.price }} {{ $t("common.currency") }}
            </p>
          </div>

          <p class="hidden md:block text-gray-500 text-xs sm:text-sm">{{ product.description }}</p>
        </div>
      </router-link>

      <!-- ADD TO CART / QUANTITY CONTROLS -->
      <div class="flex items-center mt-2 justify-end px-3 pb-3">
        <!-- Show quantity controls if item is in cart -->
        <div v-if="getCartItem(product.id)" class="flex items-center gap-2">
          <button
            @click.stop="decrementCartItem(product.id)"
            class="w-5 h-5 sm:w-8 sm:h-8 flex items-center justify-center bg-gray-200 hover:bg-gray-300 rounded-full transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="3"
              stroke="currentColor"
              class="w-4 h-4 sm:w-5 sm:h-5 text-primary"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14" />
            </svg>
          </button>

          <span class="w-4 sm:w-8 text-center font-bold text-primary">
            {{ getCartItem(product.id).quantity }}
          </span>

          <button
            @click.stop="incrementCartItem(product.id)"
            class="w-5 h-5 sm:w-8 sm:h-8 flex items-center justify-center bg-[#2C702C] hover:bg-[#265C26] text-white rounded-full transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              class="w-4 h-4 sm:w-5 sm:h-5"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </button>

          <div class="flex items-center gap-1 ml-2 text-primary text-xs font-semibold">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2.5"
              stroke="currentColor"
              class="w-3 h-3 sm:w-4 sm:h-4"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
            </svg>
            <span>{{ $t("common.inCart") }}</span>
          </div>
        </div>

        <!-- Show add to cart button if not in cart -->
        <button
          v-else-if="product.stock > 0"
          @click.stop="addToCart(product.id)"
          class="btn rounded-md bg-[#2C702C] text-white hover:bg-[#265C26] px-2 md:px-4  md:py-2 text-xs sm:text-sm font-semibold"
        >
          {{ $t("common.addToCart") }}
        </button>

        <!-- Out of stock button -->
        <button
          v-else
          class="btn rounded-md bg-gray-500 text-white cursor-not-allowed px-2 md:px-4  md:py-2 text-xs sm:text-sm font-semibold"
          disabled
        >
          {{ $t("common.outOfStock") }}
        </button>
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
      theme: document.documentElement.getAttribute("data-theme") || "light",

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
    getCartItem(productId) {
      return this.cartStore.products?.find((item) => item.cartable_id === productId);
    },

    async incrementCartItem(productId) {
      const cartItem = this.getCartItem(productId);
      if (cartItem) {
        await this.cartStore.updateQuantity(cartItem.id, cartItem.quantity + 1);
      }
    },

    async decrementCartItem(productId) {
      const cartItem = this.getCartItem(productId);
      if (cartItem) {
        if (cartItem.quantity > 1) {
          await this.cartStore.updateQuantity(cartItem.id, cartItem.quantity - 1);
        } else {
          await this.cartStore.removeItem(cartItem.id);
          this.$toast.success(this.$t("common.itemRemovedFromCart"));
        }
      }
    },
    async addToCart(productId) {
      const success = await this.cartStore.addToCart(productId, 1, "product");

      if (success) {
        this.$toast.success(this.$t("common.addedToCart"));
      } else {
        this.$toast.error(this.$t("common.failedToAddToCart"));
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
        const observer = new MutationObserver(() => {
      this.theme = document.documentElement.getAttribute("data-theme");
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
  },
};
</script>

<style scoped>
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

</style>
