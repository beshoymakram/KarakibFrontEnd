<template>
  <div class="p-10">
    <div v-if="product" class="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6">
      <img
        :src="product.image_url"
        :alt="product.name"
        class="w-full h-80 object-contain mb-4 bg-[#E0EBE0]"
      />
      <h2 class="text-3xl font-bold text-[#2C702C] mb-2">{{ product.name }}</h2>
      <p class="text-gray-600 mb-4">{{ product.description }}</p>
      <p class="text-[#2C702C] font-semibold text-xl mb-6">{{ product.price }} EGP</p>

      <button
        @click="addToCart(product.id)"
        class="btn bg-[#2C702C] text-white hover:bg-[#265C26] px-6 py-3 rounded-md"
      >
        Add to Cart
      </button>
    </div>

    <p v-else class="text-center text-gray-500 mt-20">Loading product details...</p>
  </div>
</template>

<script>
import productsService from '@/services/productsService';
import { useCartStore } from '@/stores/cart';

export default {
  name: 'ProductDesc',
  props: ['id'],
  data() {
    return {
      product: null,
    };
  },
  computed: {
    cartStore() {
      return useCartStore();
    },
  },
  methods: {
    async fetchProduct() {
      try {
        const response = await productsService.getProduct(this.id);
        this.product = response.data.data || response.data;
      } catch (error) {
        console.error('Error fetching product:', error);
        this.$toast?.error(error.response?.data?.message || 'Failed to load product');
      }
    },
    async addToCart(productId) {
      const success = await this.cartStore.addToCart(productId, 1);
      success
        ? this.$toast.success('Added to cart!')
        : this.$toast.error('Failed to add to cart');
    },
  },
  mounted() {
    this.fetchProduct();
  },
};
</script>
